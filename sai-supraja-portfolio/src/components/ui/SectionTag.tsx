import { sectionTag, type SectionId } from '@/lib/data';

export function SectionTag({ id, label }: { id: SectionId; label?: string }) {
  const t = sectionTag(id);
  return (
    <p className="tag rv">
      <b>{t.index}</b>
      <i aria-hidden="true" />
      {label ?? t.label}
    </p>
  );
}

/** Heading whose last word is set in Instrument Serif italic. */
export function Heading({ id, text, accent, as: Tag = 'h2' }: { id?: string; text: string; accent: string; as?: 'h1' | 'h2' }) {
  return (
    <Tag id={id} className="h2">
      <span className="rv-mask"><span>{text} <span className="it">{accent}</span></span></span>
    </Tag>
  );
}
