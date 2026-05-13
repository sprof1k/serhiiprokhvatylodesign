import { useState, useEffect, useRef } from 'react';

export function ScrollWords({ text, progress, fontFamily, fontSize, lineHeight, color, dim, className }) {
  const paragraphs = text.split(/\n\s*\n/);
  let total = 0;
  paragraphs.forEach(p => total += p.trim().split(/\s+/).length);

  const window = 1 / Math.max(total, 1);
  const overlap = window * 3;
  let idx = 0;

  return (
    <div className={className} style={{ fontFamily, fontSize, lineHeight, color }}>
      {paragraphs.map((p, pi) => (
        <p key={pi} style={{ margin: pi === 0 ? '0 0 0.6em' : '0' }}>
          {p.trim().split(/\s+/).map((w, wi) => {
            const start = idx * window;
            const end = start + overlap;
            idx++;
            let op;
            if (progress < start) op = dim;
            else if (progress > end) op = 1;
            else op = dim + (1 - dim) * ((progress - start) / (end - start));
            return (
              <span key={wi} style={{
                opacity: op,
                transition: 'opacity .08s linear',
                display: 'inline-block',
                marginRight: '0.28em',
              }}>{w}</span>
            );
          })}
        </p>
      ))}
    </div>
  );
}

export function ScrollReveal({ children: render }) {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const vh = globalThis.innerHeight;
      const total = rect.height - vh;
      const scrolled = -rect.top;
      const p = Math.max(0, Math.min(1, scrolled / total));
      setProgress(p);
    };
    onScroll();
    globalThis.addEventListener('scroll', onScroll, { passive: true });
    globalThis.addEventListener('resize', onScroll);
    return () => {
      globalThis.removeEventListener('scroll', onScroll);
      globalThis.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section ref={ref} style={{ position: 'relative', height: '340vh', borderBottom: '1px solid var(--line)' }}>
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        display: 'flex', flexDirection: 'column',
        padding: '88px 32px 56px',
      }}>
        {render(progress)}
      </div>
    </section>
  );
}
