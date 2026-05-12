import { useState, useEffect, useRef } from 'react';

export function ExperienceSection({ items }) {
  const wrapRef = useRef(null);
  const followRef = useRef(null);
  const [active, setActive] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const wrap = wrapRef.current;
    const follow = followRef.current;
    if (!wrap || !follow) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf;

    const move = (e) => {
      const r = wrap.getBoundingClientRect();
      tx = e.clientX - r.left;
      ty = e.clientY - r.top;
    };
    const tick = () => {
      cx += (tx - cx) * 0.18;
      cy += (ty - cy) * 0.18;
      follow.style.transform = `translate3d(${cx}px, ${cy}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };
    wrap.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);
    return () => { wrap.removeEventListener('mousemove', move); cancelAnimationFrame(raf); };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="experience-section"
      style={{ minHeight: '94vh', padding: '88px 32px', borderBottom: '1px solid var(--line)', position: 'relative', cursor: active != null ? 'none' : 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      onMouseLeave={() => { setActive(null); setVisible(false); }}
      onMouseEnter={() => setVisible(true)}
    >
      <div className="exp-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 48 }}>
        <div className="mono-label">[ 03 · Experience ]</div>
        <div>
          {items.map((e, i) => (
            <div
              key={i}
              className="exp-row"
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
              style={{
                display: 'grid',
                gridTemplateColumns: '180px 1fr 2fr',
                gap: 32,
                padding: '44px 0',
                borderTop: i === 0 ? '1px solid var(--line)' : 'none',
                borderBottom: '1px solid var(--line)',
                alignItems: 'baseline',
                transition: 'opacity .35s ease',
                opacity: active != null && active !== i ? 0.32 : 1,
              }}
            >
              <div className="mono-label">{e.period}</div>
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, lineHeight: 1.1, fontWeight: 500, letterSpacing: '-0.02em' }}>{e.company}</div>
                <div className="mono-label" style={{ marginTop: 8 }}>{e.role}</div>
              </div>
              <div style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.6, maxWidth: 560 }}>{e.desc}</div>
            </div>
          ))}

          <div style={{ marginTop: 32 }}>
            <a
              href="#"
              className="cv-button"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 12,
                fontFamily: 'var(--font-mono)',
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                padding: '14px 22px',
                border: '1px solid var(--ink)',
                color: 'var(--ink)',
                textDecoration: 'none',
                background: 'transparent',
                transition: 'background .25s, color .25s',
              }}
              onMouseOver={(ev) => { ev.currentTarget.style.background = 'var(--ink)'; ev.currentTarget.style.color = 'var(--bg)'; }}
              onMouseOut={(ev) => { ev.currentTarget.style.background = 'transparent'; ev.currentTarget.style.color = 'var(--ink)'; }}
            >
              Get full CV <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>

      {/* cursor-following logo */}
      <div
        ref={followRef}
        aria-hidden="true"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: 140, height: 140,
          pointerEvents: 'none',
          opacity: active != null && visible ? 1 : 0,
          transform: 'translate3d(0,0,0) translate(-50%, -50%)',
          transition: 'opacity .25s ease',
          zIndex: 30,
        }}
      >
        {items.map((e, i) => (
          <div
            key={i}
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: active === i ? 1 : 0,
              transform: active === i ? 'scale(1)' : 'scale(0.85)',
              transition: 'opacity .3s ease, transform .4s cubic-bezier(.2,.8,.2,1)',
            }}
          >
            <div style={{
              width: 140, height: 140,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 14px 40px rgba(0,0,0,0.25)',
              borderRadius: 28,
              overflow: 'hidden',
              animation: active === i ? 'logo-pulse 1.6s ease-in-out infinite' : 'none',
            }}>
              {e.logo ? (
                <img
                  src={e.logo}
                  alt={e.company}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              ) : (
                <div style={{
                  width: '100%', height: '100%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: e.accent,
                }}>
                  <span style={{
                    fontFamily: 'var(--font-display)', color: '#fff',
                    fontSize: 22, textAlign: 'center', lineHeight: 1.1,
                    fontWeight: 600, letterSpacing: '-0.02em',
                  }}>{e.company}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
