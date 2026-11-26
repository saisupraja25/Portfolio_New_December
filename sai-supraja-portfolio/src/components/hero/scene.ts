/**
 * Hero 3D "market" scene (Three.js). Loaded lazily after first paint by HeroScene.tsx.
 * A slowly turning ring of live candlesticks, floating gold coins, a self-drawing trend line
 * and drifting particles. Pauses off-screen; renders one still frame for reduced motion.
 */
import {
  WebGLRenderer, Scene, PerspectiveCamera, Group, Color, Fog,
  BoxGeometry, CylinderGeometry, TubeGeometry, BufferGeometry, Float32BufferAttribute,
  MeshStandardMaterial, MeshBasicMaterial, PointsMaterial,
  InstancedMesh, Mesh, Points, Object3D, CatmullRomCurve3, Vector3,
  AmbientLight, DirectionalLight, PointLight, PMREMGenerator, SRGBColorSpace, ACESFilmicToneMapping,
} from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const EMERALD = new Color('#10b981');
const ROSE = new Color('#f43f5e');
const INDIGO = new Color('#6366f1');
const SKY = new Color('#0ea5e9');
const GOLD = new Color('#f5c451');

export function mountScene(canvas: HTMLCanvasElement, hero: HTMLElement) {
  const small = window.innerWidth < 760;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new WebGLRenderer({ canvas, antialias: !small, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, small ? 1.5 : 1.75));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  scene.fog = new Fog(new Color('#f6f4ef'), 11, 22);
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new PerspectiveCamera(36, 1, 0.1, 60);
  const camBase = new Vector3(0, 1.1, small ? 12.5 : 10);
  camera.position.copy(camBase);

  const world = new Group();
  world.position.set(0, -0.4, -2.2);
  scene.add(world);

  /* ---------- candlestick ring ---------- */
  // candles sit on an arc BEHIND the portrait so none come close to the camera
  const N = small ? 16 : 26;
  const R = small ? 4.4 : 6.2;
  const A0 = Math.PI * 1.06;
  const A1 = Math.PI * 1.94;
  const bodyGeo = new BoxGeometry(0.34, 1, 0.34);
  bodyGeo.translate(0, 0.5, 0);
  const wickGeo = new BoxGeometry(0.05, 1, 0.05);
  wickGeo.translate(0, 0.5, 0);
  const bodyMat = new MeshStandardMaterial({ roughness: 0.28, metalness: 0.15 });
  const wickMat = new MeshStandardMaterial({ roughness: 0.5, metalness: 0, color: '#94a3b8' });
  const bodies = new InstancedMesh(bodyGeo, bodyMat, N);
  const wicks = new InstancedMesh(wickGeo, wickMat, N);
  const ring = new Group();
  ring.add(bodies, wicks);
  world.add(ring);

  type Candle = { angle: number; open: number; close: number; target: number; next: number };
  let price = 1.6;
  const candles: Candle[] = Array.from({ length: N }, (_, i) => {
    const open = price;
    price = Math.max(0.6, Math.min(3, price + (Math.random() - 0.42) * 0.55));
    return { angle: A0 + (i / (N - 1)) * (A1 - A0), open, close: price, target: price, next: Math.random() * 1.5 };
  });

  const dummy = new Object3D();
  const tmpColor = new Color();
  const updateCandles = (dt: number) => {
    candles.forEach((c, i) => {
      c.next -= dt;
      if (c.next <= 0) {
        c.target = Math.max(0.5, Math.min(3.2, c.close + (Math.random() - 0.45) * 0.7));
        c.next = 0.8 + Math.random() * 1.8;
      }
      c.close += (c.target - c.close) * Math.min(1, dt * 3);
      const lo = Math.min(c.open, c.close);
      const hi = Math.max(c.open, c.close);
      const x = Math.cos(c.angle) * R;
      const z = Math.sin(c.angle) * R;
      dummy.position.set(x, lo, z);
      dummy.rotation.set(0, -c.angle, 0);
      dummy.scale.set(1, Math.max(0.06, hi - lo), 1);
      dummy.updateMatrix();
      bodies.setMatrixAt(i, dummy.matrix);
      dummy.position.set(x, lo - 0.25, z);
      dummy.scale.set(1, hi - lo + 0.5, 1);
      dummy.updateMatrix();
      wicks.setMatrixAt(i, dummy.matrix);
      tmpColor.copy(c.close >= c.open ? EMERALD : ROSE);
      bodies.setColorAt(i, tmpColor);
    });
    bodies.instanceMatrix.needsUpdate = true;
    wicks.instanceMatrix.needsUpdate = true;
    if (bodies.instanceColor) bodies.instanceColor.needsUpdate = true;
  };

  /* ---------- floating gold coins ---------- */
  const coinGeo = new CylinderGeometry(0.3, 0.3, 0.06, 56);
  const coinMat = new MeshStandardMaterial({ color: GOLD, metalness: 1, roughness: 0.24 });
  const coinSpots: [number, number, number][] = small
    ? [[-2.8, 3.6, -2], [2.9, 4, -2.4], [-3.4, 1.6, -3], [3.3, 1.9, -3.2]]
    : [[-4.8, 3.6, -1.8], [5, 4.1, -2.2], [-6, 1.7, -3], [6.2, 2, -3], [-2.8, 4.9, -3.4], [3, 5.1, -3.6]];
  const coins = coinSpots.map(([x, y, z], i) => {
    const m = new Mesh(coinGeo, coinMat);
    m.position.set(x, y, z);
    m.rotation.set(Math.PI / 2 - 0.4, 0, i);
    m.userData = { y, phase: i * 1.3, spin: 0.6 + (i % 3) * 0.25 };
    world.add(m);
    return m;
  });

  /* ---------- self-drawing trend line ---------- */
  const pts: Vector3[] = [];
  for (let i = 0; i <= 14; i++) {
    const t = i / 14;
    pts.push(new Vector3(-7 + t * 14, 0.6 + t * 3.6 + Math.sin(t * 9) * 0.45, -0.2 - Math.sin(t * Math.PI) * 2.2));
  }
  const curve = new CatmullRomCurve3(pts);
  const tubeGeo = new TubeGeometry(curve, 240, small ? 0.035 : 0.03, 8, false);
  const tubeMat = new MeshBasicMaterial({ color: INDIGO, transparent: true, opacity: 0.85 });
  const tube = new Mesh(tubeGeo, tubeMat);
  world.add(tube);
  const tubeCount = tubeGeo.index ? tubeGeo.index.count : 0;
  tubeGeo.setDrawRange(0, 0);
  const head = new Mesh(new CylinderGeometry(0.11, 0.11, 0.02, 24).rotateX(Math.PI / 2), new MeshBasicMaterial({ color: SKY }));
  world.add(head);

  /* ---------- particles ---------- */
  const P = small ? 120 : 260;
  const pos = new Float32Array(P * 3);
  const cols = new Float32Array(P * 3);
  const palette = [EMERALD, SKY, INDIGO, new Color('#a855f7')];
  for (let i = 0; i < P; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 16;
    pos[i * 3 + 1] = Math.random() * 7 - 0.5;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    const c = palette[i % palette.length];
    cols[i * 3] = c.r; cols[i * 3 + 1] = c.g; cols[i * 3 + 2] = c.b;
  }
  const pGeo = new BufferGeometry();
  pGeo.setAttribute('position', new Float32BufferAttribute(pos, 3));
  pGeo.setAttribute('color', new Float32BufferAttribute(cols, 3));
  const particles = new Points(pGeo, new PointsMaterial({ size: 0.05, vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false }));
  world.add(particles);

  /* ---------- lights ---------- */
  scene.add(new AmbientLight('#ffffff', 0.55));
  const key = new DirectionalLight('#ffffff', 1.4);
  key.position.set(4, 8, 6);
  scene.add(key);
  const glowL = new PointLight(EMERALD, 28, 14, 1.6);
  glowL.position.set(-5, 2.5, 3);
  const glowR = new PointLight(INDIGO, 30, 14, 1.6);
  glowR.position.set(5, 3, 3);
  scene.add(glowL, glowR);

  /* ---------- interaction ---------- */
  const look = { x: 0, y: 0, tx: 0, ty: 0 };
  const onMove = (e: PointerEvent) => {
    look.tx = e.clientX / window.innerWidth - 0.5;
    look.ty = e.clientY / window.innerHeight - 0.5;
  };
  if (!reduce && window.matchMedia('(pointer: fine)').matches) window.addEventListener('pointermove', onMove, { passive: true });

  let scrollP = 0;
  const onScroll = () => {
    scrollP = Math.min(1, Math.max(0, window.scrollY / (hero.offsetHeight || 1)));
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const resize = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (reduce) render(3);
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  let last = performance.now();
  let elapsed = 0;
  const drawDuration = 2.6;

  function render(t: number) {
    look.x += (look.tx - look.x) * 0.05;
    look.y += (look.ty - look.y) * 0.05;
    ring.rotation.y = Math.sin(t * 0.12) * 0.08;
    world.rotation.y = look.x * 0.35;
    world.rotation.x = look.y * 0.08;
    camera.position.set(camBase.x + look.x * 0.8, camBase.y - look.y * 0.4 + scrollP * 2.2, camBase.z + scrollP * 3);
    camera.lookAt(0, 1.3 - scrollP * 0.6, -1);

    coins.forEach((c) => {
      const u = c.userData as { y: number; phase: number; spin: number };
      c.position.y = u.y + Math.sin(t * 0.9 + u.phase) * 0.18;
      c.rotation.z = t * u.spin + u.phase;
    });

    const prog = Math.min(1, t / drawDuration);
    const eased = 1 - Math.pow(1 - prog, 3);
    tubeGeo.setDrawRange(0, Math.floor((tubeCount * eased) / 6) * 6);
    head.position.copy(curve.getPointAt(Math.max(0.001, eased)));
    tubeMat.opacity = 0.75 + Math.sin(t * 1.5) * 0.1;

    const arr = pGeo.attributes.position.array as Float32Array;
    for (let i = 0; i < P; i++) {
      arr[i * 3 + 1] += 0.004 + (i % 5) * 0.0008;
      if (arr[i * 3 + 1] > 6.5) arr[i * 3 + 1] = -0.5;
    }
    pGeo.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  let visible = true;
  const FRAME = 1000 / 30; // 30 fps is plenty for slow ambient motion and halves the GPU work
  const loop = (now: number) => {
    if (now - last < FRAME - 1) return;
    const dt = Math.min(0.06, (now - last) / 1000);
    last = now;
    if (!visible) return;
    elapsed += dt;
    updateCandles(dt);
    render(elapsed);
  };

  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    last = performance.now();
    if (!reduce) renderer.setAnimationLoop(visible ? loop : null);
  });
  io.observe(hero);

  updateCandles(0.016);
  resize();
  if (reduce) render(3);
  else renderer.setAnimationLoop(loop);
  canvas.classList.add('is-ready');

  return () => {
    renderer.setAnimationLoop(null);
    io.disconnect();
    ro.disconnect();
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('scroll', onScroll);
    renderer.dispose();
    pmrem.dispose();
  };
}
