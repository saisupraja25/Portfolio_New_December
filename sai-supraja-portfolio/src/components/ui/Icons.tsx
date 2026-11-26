type P = { size?: number };
const base = (size: number) => ({ width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true });

export const ArrowUpRight = ({ size = 16 }: P) => <svg {...base(size)}><path d="M7 17 17 7M8 7h9v9" /></svg>;
export const ArrowDown = ({ size = 16 }: P) => <svg {...base(size)}><path d="M12 4v16M6 14l6 6 6-6" /></svg>;
export const ArrowRight = ({ size = 16 }: P) => <svg {...base(size)}><path d="M4 12h16M14 6l6 6-6 6" /></svg>;
export const Plus = ({ size = 16 }: P) => <svg {...base(size)}><path d="M12 5v14M5 12h14" /></svg>;
