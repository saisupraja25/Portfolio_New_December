'use client';

import { useState } from 'react';

export default function CopyEmail({ email }: { email: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const t = document.createElement('textarea');
      t.value = email;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 2200);
  };
  return (
    <div className="cx-mail rv">
      <a href={`mailto:${email}`}>{email}</a>
      <button type="button" className={`cx-copy${done ? ' done' : ''}`} onClick={copy} aria-label={`Copy email address ${email}`}>
        {done ? 'Copied ✓' : 'Copy'}
      </button>
      <span className="sr-only" aria-live="polite">{done ? 'Email address copied' : ''}</span>
    </div>
  );
}
