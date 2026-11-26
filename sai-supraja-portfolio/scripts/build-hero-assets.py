#!/usr/bin/env python3
"""
Turn a talking-intro video into a seamless looping hero clip for the portfolio.

    python3 scripts/build-hero-assets.py intro.mp4
    python3 scripts/build-hero-assets.py intro.mov --crop 800:1000:560:80 --seconds 10

Requires ffmpeg/ffprobe (with libx264, libvpx-vp9, libopus) and numpy.

What it does
  1. Finds the person (or uses --crop W:H:X:Y), crops head to toe, centred, at a 768:960 ratio, scales to 768 px wide.
  2. Whitens the background (colorlevels rimax/gimax/bimax=0.98) so it melts into the page with mix-blend-mode: multiply.
  3. Makes the loop seamless: takes the first --seconds, cross-fades the last --fade seconds of picture into the first
     --fade seconds (ffmpeg xfade) and does the same crossfade on the audio sample-accurately in numpy. Nothing is
     stretched or retimed, so lips stay in sync.
  4. Exports public/hero/hero.mp4 (H.264 CRF 24, AAC 96k, faststart) and public/hero/hero.webm (VP9 CRF 36, Opus 80k).
  5. Exports public/hero/hero-poster.webp, public/og.jpg (1200x630) and, with --portrait, public/portrait-bust.webp
     (480x600 head-to-shirt crop from the sharpest frame).
Then set PROFILE.heroVideo in src/lib/data.ts (the script prints the exact line).
"""
import argparse
import json
import os
import subprocess
import sys
import tempfile

import numpy as np

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT_W, OUT_H = 768, 960
SR = 48000


def run(cmd, **kw):
    r = subprocess.run(cmd, capture_output=True, **kw)
    if r.returncode != 0:
        sys.exit(f"command failed: {' '.join(cmd)}\n{r.stderr.decode(errors='ignore')[-2000:]}")
    return r


def probe(path):
    out = run(['ffprobe', '-v', 'error', '-show_streams', '-show_format', '-of', 'json', path]).stdout
    info = json.loads(out)
    v = next(s for s in info['streams'] if s['codec_type'] == 'video')
    a = next((s for s in info['streams'] if s['codec_type'] == 'audio'), None)
    num, den = (v.get('avg_frame_rate') or v['r_frame_rate']).split('/')
    return {
        'w': int(v['width']), 'h': int(v['height']),
        'fps': float(num) / float(den or 1),
        'duration': float(info['format']['duration']),
        'audio': a is not None,
    }


def grab_frames(path, w, h, times, scale=4):
    """Return small grayscale frames (numpy) at the given times."""
    sw, sh = w // scale, h // scale
    frames = []
    for t in times:
        raw = run(['ffmpeg', '-v', 'error', '-ss', f'{t:.3f}', '-i', path, '-frames:v', '1',
                   '-vf', f'scale={sw}:{sh},format=gray', '-f', 'rawvideo', '-']).stdout
        if len(raw) == sw * sh:
            frames.append(np.frombuffer(raw, np.uint8).reshape(sh, sw).astype(np.float32))
    return frames, scale


def detect_crop(path, meta, seconds):
    """Union bounding box of 'not background' pixels over several frames, padded, at an 768:960 ratio."""
    times = np.linspace(0.3, max(0.4, min(seconds, meta['duration']) - 0.3), 8)
    frames, s = grab_frames(path, meta['w'], meta['h'], times)
    if not frames:
        sys.exit('could not read frames; pass --crop W:H:X:Y')
    mask = np.zeros_like(frames[0], dtype=bool)
    for f in frames:
        border = np.concatenate([f[:6].ravel(), f[-6:].ravel(), f[:, :6].ravel(), f[:, -6:].ravel()])
        bg = np.median(border)
        mask |= np.abs(f - bg) > 28
    ys, xs = np.nonzero(mask)
    if len(xs) < 50:
        sys.exit('no person found against the background; pass --crop W:H:X:Y')
    x0, x1 = np.percentile(xs, [0.5, 99.5]) * s
    y0, y1 = np.percentile(ys, [0.5, 99.5]) * s
    pad = 0.06 * (y1 - y0)
    y0, y1 = max(0, y0 - pad), min(meta['h'], y1 + pad * 0.6)
    ch = y1 - y0
    cw = ch * OUT_W / OUT_H
    cx = (x0 + x1) / 2
    if cw > meta['w']:
        cw = meta['w']
        ch = cw * OUT_H / OUT_W
    if ch > meta['h']:
        ch = meta['h']
        cw = ch * OUT_W / OUT_H
    x = int(np.clip(cx - cw / 2, 0, meta['w'] - cw))
    y = int(np.clip(y0, 0, meta['h'] - ch))
    cw, ch = int(cw) // 2 * 2, int(ch) // 2 * 2
    return cw, ch, x, y


def loop_audio(src, seconds, fade, tmp):
    """Sample-accurate equal-power crossfade of the tail into the head. Returns path to a wav, or None."""
    wav = os.path.join(tmp, 'a.f32')
    run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-t', f'{seconds}', '-vn', '-ac', '2', '-ar', str(SR),
         '-f', 'f32le', wav])
    a = np.fromfile(wav, dtype=np.float32).reshape(-1, 2)
    n = int(round(seconds * SR))
    if len(a) < n:
        a = np.concatenate([a, np.zeros((n - len(a), 2), np.float32)])
    a = a[:n]
    f = int(round(fade * SR))
    head, body = a[:f], a[f:]                      # body = [F, D)
    t = np.linspace(0, 1, f, dtype=np.float32)[:, None]
    fade_out, fade_in = np.cos(t * np.pi / 2), np.sin(t * np.pi / 2)
    out = np.concatenate([body[:-f], body[-f:] * fade_out + head * fade_in])  # length D - F
    out = np.clip(out, -1, 1).astype(np.float32)
    path = os.path.join(tmp, 'loop.wav')
    out.tofile(os.path.join(tmp, 'loop.f32'))
    run(['ffmpeg', '-v', 'error', '-y', '-f', 'f32le', '-ar', str(SR), '-ac', '2', '-i',
         os.path.join(tmp, 'loop.f32'), path])
    return path


def sharpest_time(path, meta, seconds):
    times = np.linspace(0.5, max(0.6, seconds - 0.5), 12)
    frames, _ = grab_frames(path, meta['w'], meta['h'], times, scale=2)
    def lap_var(f):
        return float(np.var(f[1:-1, 1:-1] * 4 - f[:-2, 1:-1] - f[2:, 1:-1] - f[1:-1, :-2] - f[1:-1, 2:]))
    scores = [lap_var(f) for f in frames]
    return float(times[int(np.argmax(scores))])


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('input')
    ap.add_argument('--crop', help='W:H:X:Y in source pixels (skips auto-detect)')
    ap.add_argument('--seconds', type=float, default=10.0, help='length of source to use (default 10)')
    ap.add_argument('--fade', type=float, default=0.5, help='loop crossfade in seconds (default 0.5)')
    ap.add_argument('--portrait', action='store_true', help='also export portrait-bust.webp from the sharpest frame')
    ap.add_argument('--out', default=os.path.join(ROOT, 'public'))
    args = ap.parse_args()

    meta = probe(args.input)
    D = round(min(args.seconds, meta['duration']), 3)
    F = args.fade
    if D <= 2 * F + 0.5:
        sys.exit('video is too short for a seamless loop')
    crop = tuple(map(int, args.crop.split(':'))) if args.crop else detect_crop(args.input, meta, D)
    cw, ch, cx, cy = crop
    print(f'source {meta["w"]}x{meta["h"]} @ {meta["fps"]:.2f} fps, {meta["duration"]:.2f}s; using {D}s, fade {F}s')
    print(f'crop={cw}:{ch}:{cx}:{cy}')

    hero_dir = os.path.join(args.out, 'hero')
    os.makedirs(hero_dir, exist_ok=True)
    vf = (f'crop={cw}:{ch}:{cx}:{cy},scale={OUT_W}:-2:flags=lanczos,'
          f'colorlevels=rimax=0.98:gimax=0.98:bimax=0.98,setsar=1,format=yuv420p')
    L = D - F

    with tempfile.TemporaryDirectory() as tmp:
        # picture: A = [F, D), B = [0, F); xfade A's tail into B => length D - F, ends on frame F, which is where it restarts
        loop_v = os.path.join(tmp, 'loop_v.mkv')
        fc = (f'[0:v]trim=start={F}:end={D},setpts=PTS-STARTPTS,{vf}[a];'
              f'[0:v]trim=start=0:end={F},setpts=PTS-STARTPTS,{vf}[b];'
              f'[a][b]xfade=transition=fade:duration={F}:offset={L - F:.3f}[v]')
        run(['ffmpeg', '-v', 'error', '-y', '-i', args.input, '-filter_complex', fc, '-map', '[v]',
             '-c:v', 'ffv1', '-r', f'{meta["fps"]:.3f}', loop_v])
        audio = loop_audio(args.input, D, F, tmp) if meta['audio'] else None

        a_in = ['-i', audio] if audio else []
        a_map = ['-map', '1:a'] if audio else ['-an']
        mp4 = os.path.join(hero_dir, 'hero.mp4')
        webm = os.path.join(hero_dir, 'hero.webm')
        run(['ffmpeg', '-v', 'error', '-y', '-i', loop_v, *a_in, '-map', '0:v', *a_map,
             '-c:v', 'libx264', '-crf', '24', '-preset', 'slow', '-pix_fmt', 'yuv420p',
             *(['-c:a', 'aac', '-b:a', '96k'] if audio else []), '-movflags', '+faststart', '-shortest', mp4])
        run(['ffmpeg', '-v', 'error', '-y', '-i', loop_v, *a_in, '-map', '0:v', *a_map,
             '-c:v', 'libvpx-vp9', '-crf', '36', '-b:v', '0', '-row-mt', '1', '-pix_fmt', 'yuv420p',
             *(['-c:a', 'libopus', '-b:a', '80k'] if audio else []), '-shortest', webm])

        poster = os.path.join(hero_dir, 'hero-poster.webp')
        run(['ffmpeg', '-v', 'error', '-y', '-i', mp4, '-frames:v', '1', '-c:v', 'libwebp', '-quality', '82', poster])

        # OG image: hero frame centred on the paper colour
        run(['ffmpeg', '-v', 'error', '-y', '-i', mp4, '-frames:v', '1', '-vf',
             'scale=-2:630,pad=1200:630:(ow-iw)/2:0:color=0xf4f2ee,format=yuvj420p', '-q:v', '3',
             os.path.join(args.out, 'og.jpg')])

        if args.portrait:
            t = sharpest_time(args.input, meta, D)
            bw = int(cw * 0.62) // 2 * 2
            bh = int(bw * 600 / 480) // 2 * 2
            bx = cx + (cw - bw) // 2
            run(['ffmpeg', '-v', 'error', '-y', '-ss', f'{t:.3f}', '-i', args.input, '-frames:v', '1', '-vf',
                 f'crop={bw}:{bh}:{bx}:{cy},scale=480:600:flags=lanczos', '-c:v', 'libwebp', '-quality', '86',
                 os.path.join(args.out, 'portrait-bust.webp')])

    out = probe(mp4)
    print(f'wrote {mp4} ({os.path.getsize(mp4) // 1024} kB, {out["duration"]:.2f}s) and {webm} '
          f'({os.path.getsize(webm) // 1024} kB)')
    print("\nNow set in src/lib/data.ts:\n  heroVideo: { mp4: '/hero/hero.mp4', webm: '/hero/hero.webm', "
          "poster: '/hero/hero-poster.webp' },")


if __name__ == '__main__':
    main()
