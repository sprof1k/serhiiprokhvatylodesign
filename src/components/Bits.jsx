import { useState, useEffect, useRef, useImperativeHandle } from 'react';

export function Reveal({ children, delay = 0, root }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { setShown(true); io.unobserve(e.target); }
      });
    }, { root: root?.current || null, threshold: 0.12 });
    io.observe(el);
    return () => io.disconnect();
  }, [root]);

  return (
    <div ref={ref} style={{
      opacity: shown ? 1 : 0,
      transform: shown ? 'translateY(0)' : 'translateY(24px)',
      transition: `opacity .8s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .8s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
    }}>{children}</div>
  );
}

export function Placeholder({ label, color = 'oklch(0.90 0.02 80)', aspect = '4/3', mono = true, image, className }) {
  return (
    <div className={className} style={{ position: 'relative', width: '100%', aspectRatio: aspect, background: color, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-start', padding: 14 }}>
      {image ? (
        <img src={image} alt={label} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg, rgba(0,0,0,0.04) 0 1px, transparent 1px 14px)' }} />
          <div style={{ position: 'absolute', top: 14, left: 14, fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.55)' }}>{'// '}drop image</div>
          <div style={{ position: 'relative', fontFamily: mono ? 'var(--font-mono)' : 'var(--font-serif)', fontSize: mono ? 12 : 18, color: 'rgba(0,0,0,0.7)' }}>{label}</div>
        </>
      )}
    </div>
  );
}

export function ParallaxPortrait({ src, scope, side = 'right', innerRef }) {
  const ref = useRef(null);
  const imgRef = useRef(null);
  const [hover, setHover] = useState(false);
  useImperativeHandle(innerRef, () => ref.current, []);

  useEffect(() => {
    const root = (scope && scope.current) || document;
    const isTouch = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(hover: none)').matches;
    let rx = 0, ry = 0, tx = 0, ty = 0, raf;
    let t0 = performance.now();

    const move = (e) => {
      const w = window.innerWidth, h = window.innerHeight;
      tx = (e.clientX / w - 0.5) * 36;
      ty = (e.clientY / h - 0.5) * 24;
    };
    const tick = () => {
      if (isTouch) {
        const t = (performance.now() - t0) / 1000;
        tx = Math.sin(t * 0.6) * 18;
        ty = Math.sin(t * 0.9 + 1.2) * 12;
      }
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      if (ref.current) ref.current.style.transform = `translate3d(${rx}px, ${ry}px, 0) rotate(${rx * 0.08}deg)`;
      raf = requestAnimationFrame(tick);
    };
    if (!isTouch) root.addEventListener('mousemove', move);
    raf = requestAnimationFrame(tick);
    return () => {
      if (!isTouch) root.removeEventListener('mousemove', move);
      cancelAnimationFrame(raf);
    };
  }, [scope]);

  return (
    <div
      ref={ref}
      className="hero-portrait"
      style={{
        position: 'absolute',
        [side]: '4%', top: '14%',
        width: 253, height: 345,
        borderRadius: 4,
        overflow: 'hidden',
        border: '6px solid #fff',
        boxShadow: '0 24px 60px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)',
        willChange: 'transform',
        pointerEvents: 'auto',
        cursor: 'pointer',
        zIndex: 2,
        transition: 'box-shadow .35s ease',
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        ref={imgRef}
        src={src}
        alt="Serhii"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
          transition: 'transform .6s cubic-bezier(.2,.8,.2,1)',
        }}
      />
    </div>
  );
}
