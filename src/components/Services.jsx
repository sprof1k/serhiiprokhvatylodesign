import { useState, useEffect, useRef } from 'react';

export function ServicesSection({ items }) {
  const [active, setActive] = useState(0);
  const userHoveringRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      if (userHoveringRef.current) return;
      setActive((cur) => (cur == null ? 0 : (cur + 1) % items.length));
    }, 5000);
    return () => clearInterval(id);
  }, [items.length]);

  return (
    <section
      className="services-section"
      style={{ padding: '88px 32px 96px', borderBottom: '1px solid var(--line)', position: 'relative', minHeight: '70vh' }}
      onMouseLeave={() => { userHoveringRef.current = false; }}
    >
      <div className="services-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 48,
        alignItems: 'start',
        position: 'relative',
      }}>
        {/* left — heading + hover detail */}
        <div className="services-sticky" style={{ position: 'sticky', top: 80, minHeight: 480, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 44, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
              My <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em' }}>Expertise</span>
            </h2>
            <div className="mono-label" style={{ marginTop: 12 }}>[ 04 · What I do ]</div>
          </div>

          <div style={{
            border: '1px solid var(--line)',
            padding: '20px 22px',
            minHeight: 130,
            maxWidth: 460,
            opacity: active != null ? 1 : 0,
            transform: active != null ? 'translateY(0)' : 'translateY(12px)',
            transition: 'opacity .35s ease, transform .35s ease',
            background: 'var(--bg-card)',
            marginTop: 24,
          }}>
            {active != null && (
              <>
                <div className="mono-label" style={{ marginBottom: 10 }}>{items[active].n} · Detail</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.2, marginBottom: 8, fontWeight: 500, letterSpacing: '-0.01em' }}>
                  {items[active].t}
                </div>
                <div style={{ fontSize: 14, lineHeight: 1.55, color: 'var(--ink-2)' }}>
                  {items[active].d}
                </div>
              </>
            )}
          </div>
        </div>

        {/* right — list */}
        <div>
          {items.map((s, i) => (
            <div
              className="service-row"
              key={s.n}
              onMouseEnter={() => { userHoveringRef.current = true; setActive(i); }}
              style={{
                display: 'grid',
                gridTemplateColumns: '24px 1fr auto',
                gap: 18,
                alignItems: 'center',
                padding: '18px 0',
                cursor: 'default',
                opacity: active != null && active !== i ? 0.32 : 1,
                transition: 'opacity .3s ease',
              }}
            >
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 14,
                color: 'var(--ink)',
                opacity: active === i ? 1 : 0,
                transform: active === i ? 'translateX(0)' : 'translateX(-6px)',
                transition: 'opacity .25s, transform .25s',
              }}>→</span>
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: 36,
                lineHeight: 1.2,
                fontWeight: 400,
                color: active === i ? 'var(--ink)' : 'var(--muted)',
                transition: 'color .25s',
              }}>{s.t}</span>
              <span className="mono-label">{s.n}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
