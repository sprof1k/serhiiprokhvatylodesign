import { useState, useEffect, useRef } from 'react';

const SCREENS = [
  { label: 'Home',           img: 'assets/screen-home.png' },
  { label: 'Authentication', img: 'assets/screen-authentication.png' },
  { label: 'Thinking',      img: 'assets/screen-thinking.png' },
  { label: 'Result',        img: 'assets/screen-result.png' },
  { label: 'References',    img: 'assets/screen-references.png' },
  { label: 'Calculator',    img: 'assets/screen-calculator.png' },
  { label: 'Setting Up',    img: 'assets/screen-setting-up.png' },
  { label: 'Notifications', img: 'assets/screen-notifications.png' },
  { label: 'New Device',    img: 'assets/screen-new-device.png' },
];

const PILL_LAYOUT = [
  { top: 6,  side: 'left',  offset: 14, depth: 1.0 },
  { top: 17, side: 'right', offset: 6,  depth: 0.6 },
  { top: 28, side: 'left',  offset: 4,  depth: 0.4 },
  { top: 39, side: 'right', offset: 18, depth: 1.0 },
  { top: 50, side: 'left',  offset: 10, depth: 0.8 },
  { top: 61, side: 'right', offset: 4,  depth: 0.5 },
  { top: 72, side: 'left',  offset: 20, depth: 1.1 },
  { top: 83, side: 'right', offset: 10, depth: 0.7 },
  { top: 92, side: 'left',  offset: 6,  depth: 0.9 },
];

export function FeaturedProject() {
  const sectionRef = useRef(null);
  const pillStripRef = useRef(null);
  const [active, setActive] = useState(0);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  // Auto-rotate every 3s on mobile
  useEffect(() => {
    const mql = window.matchMedia('(max-width: 720px)');
    let id = null;
    const start = () => {
      stop();
      id = setInterval(() => setActive(a => (a + 1) % SCREENS.length), 3000);
    };
    const stop = () => { if (id) { clearInterval(id); id = null; } };
    const sync = () => { mql.matches ? start() : stop(); };
    sync();
    mql.addEventListener ? mql.addEventListener('change', sync) : mql.addListener(sync);
    return () => {
      stop();
      mql.removeEventListener ? mql.removeEventListener('change', sync) : mql.removeListener(sync);
    };
  }, []);

  // Keep active pill in view on the mobile strip
  useEffect(() => {
    const strip = pillStripRef.current;
    if (!strip) return;
    const el = strip.querySelector(`[data-idx="${active}"]`);
    if (el && strip.offsetParent !== null) {
      const sLeft = strip.scrollLeft;
      const sRight = sLeft + strip.clientWidth;
      const eLeft = el.offsetLeft;
      const eRight = eLeft + el.offsetWidth;
      if (eLeft < sLeft + 12 || eRight > sRight - 12) {
        strip.scrollTo({ left: eLeft - 24, behavior: 'smooth' });
      }
    }
  }, [active]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;
    let raf, tx = 0, ty = 0, cx = 0, cy = 0;
    const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
    const t0 = performance.now();

    const move = (e) => {
      const r = root.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width  - 0.5) * 2;
      ty = ((e.clientY - r.top)  / r.height - 0.5) * 2;
    };
    const tick = () => {
      if (isTouch) {
        const t = (performance.now() - t0) / 1000;
        tx = Math.sin(t * 0.55);
        ty = Math.cos(t * 0.7);
      }
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      setMouse({ x: cx, y: cy });
      raf = requestAnimationFrame(tick);
    };
    if (!isTouch) root.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      if (!isTouch) root.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section ref={sectionRef} className="featured-section" style={{
      position: 'relative',
      padding: '88px 32px 96px',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden',
    }}>
      {/* top meta row */}
      <div className="featured-meta" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'baseline',
        marginBottom: 48,
        paddingBottom: 18,
        borderBottom: '1px solid var(--line)',
        color: 'var(--muted)',
      }}>
        <span className="mono-label" style={{ justifySelf: 'start' }}>/ Featured Project</span>
        <span className="mono-label" style={{ justifySelf: 'center' }}>01</span>
        <span className="mono-label" style={{ justifySelf: 'end' }}>2024 · Vera Health</span>
      </div>

      {/* big headline */}
      <h2 className="featured-headline" style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(40px, 7vw, 96px)',
        lineHeight: 1.02,
        letterSpacing: '-0.04em',
        fontWeight: 500,
        textAlign: 'center',
        margin: '0 auto',
        maxWidth: 1100,
        position: 'relative',
        zIndex: 1,
      }}>
        An AI clinical assistant<br />
        <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em' }}>doctors actually trust.</span>
      </h2>

      {/* phone + floating pills */}
      <div className="featured-stage" style={{
        position: 'relative',
        maxWidth: 1200,
        margin: '-28px auto 0',
        minHeight: 700,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {/* soft white glow */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          top: '50%', left: '50%',
          width: 520, height: 520,
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255,255,255,0.10) 0%, rgba(255,255,255,0.05) 35%, transparent 70%)',
          filter: 'blur(20px)',
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* iPhone mockup — CSS bezel (renders identically across all browsers/WebViews) */}
        <div className="featured-phone" style={{
          position: 'relative',
          width: 320,
          aspectRatio: '440 / 916',
          zIndex: 2,
          flexShrink: 0,
          transform: `translate3d(${mouse.x * 8}px, ${mouse.y * 5}px, 0)`,
          transition: 'transform .15s ease-out',
          filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.45))',
        }}>
          {/* titanium bezel frame */}
          <div style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '13.6% / 6.55%',
            background: 'linear-gradient(150deg, #4a4a4d 0%, #232325 26%, #1b1b1d 52%, #2d2d30 78%, #404043 100%)',
            padding: '2.5%',
            boxShadow: 'inset 0 0 0 1.5px rgba(255,255,255,0.10), inset 0 0 0 3px rgba(0,0,0,0.55)',
            zIndex: 1,
          }}>
            {/* screen */}
            <div className="featured-phone-screen" style={{
              position: 'relative',
              width: '100%',
              height: '100%',
              borderRadius: '11.4% / 5.45%',
              overflow: 'hidden',
              background: '#000',
            }}>
              {SCREENS.map((s, i) => (
                <img key={i} src={s.img} alt={s.label} loading="lazy" decoding="async" style={{
                  position: 'absolute', inset: 0,
                  width: '100%', height: '100%',
                  objectFit: 'cover',
                  opacity: active === i ? 1 : 0,
                  transition: 'opacity .45s ease',
                }} />
              ))}
              {/* dynamic island */}
              <div aria-hidden="true" style={{
                position: 'absolute',
                top: '1.7%',
                left: '50%',
                transform: 'translateX(-50%)',
                width: '30%',
                aspectRatio: '120 / 35',
                background: '#000',
                borderRadius: 999,
                zIndex: 5,
              }} />
            </div>
          </div>
        </div>

        {/* floating pills — desktop only (hidden on mobile via CSS) */}
        {PILL_LAYOUT.map((p, i) => {
          const screen = SCREENS[i];
          if (!screen) return null;
          const px = mouse.x * 10 * p.depth * (p.side === 'left' ? -1 : 1);
          const py = mouse.y * 6 * p.depth;
          const positionStyle = p.side === 'left' ? { left: `${p.offset}%` } : { right: `${p.offset}%` };
          return (
            <button
              key={i}
              className="featured-pill"
              onClick={() => setActive(i)}
              style={{
                position: 'absolute',
                top: `${p.top}%`,
                ...positionStyle,
                transform: `translate3d(${px}px, ${py}px, 0)`,
                transition: 'background .2s, color .2s, border-color .2s, box-shadow .2s',
                zIndex: 3,
                background: active === i ? 'var(--ink)' : 'var(--bg-card)',
                color: active === i ? 'var(--bg)' : 'var(--ink)',
                border: '1px solid var(--line)',
                borderRadius: 999,
                padding: '10px 18px',
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
                letterSpacing: '0.05em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontWeight: 500,
                boxShadow: active === i ? '0 8px 24px rgba(0,0,0,0.18)' : 'none',
              }}
            >
              {screen.label}
            </button>
          );
        })}
      </div>

      {/* mobile-only horizontal pill strip */}
      <div className="featured-pills-mobile" ref={pillStripRef}>
        {SCREENS.map((s, i) => (
          <button
            key={i}
            data-idx={i}
            data-active={active === i}
            className="featured-pill-m"
            onClick={() => setActive(i)}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* body copy */}
      <div className="featured-copy" style={{ maxWidth: 720, margin: '64px auto 0', textAlign: 'center' }}>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', margin: '0 0 14px' }}>
          Vera Health is an AI-powered clinical companion that helps physicians
          capture, review and act on patient context in seconds — not minutes.
          The product had to feel calm, accurate and quietly competent in
          high-stakes environments.
        </p>
        <p style={{ fontFamily: 'var(--font-sans)', fontSize: 16, lineHeight: 1.65, color: 'var(--ink-2)', margin: 0 }}>
          My role spanned product strategy, IA, interaction design and the
          visual system — from first sketches to live shifts in three hospitals.
        </p>
        <a href="vera-health.html" className="under" style={{ display: 'inline-block', marginTop: 28, fontFamily: 'var(--font-mono)', fontSize: 13 }}>
          Read the case study →
        </a>
      </div>
    </section>
  );
}
