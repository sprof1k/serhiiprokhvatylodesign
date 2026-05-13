import { useEffect, useRef, useState } from 'react';

const ICONS = {
  pencil: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16.5 3.5l4 4L8 20H4v-4z" /><path d="M14 6l4 4" />
    </svg>
  ),
  ruler: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="9" width="20" height="6" transform="rotate(-12 12 12)" />
      <path d="M6 12v-2M9 13v-3M12 14v-4M15 15v-3M18 16v-2" />
    </svg>
  ),
  card: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="6" width="18" height="13" rx="2" /><path d="M3 11h18M7 16h4" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="7" y="2.5" width="10" height="19" rx="2" /><path d="M11 18h2" />
    </svg>
  ),
  desktop: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="4" width="19" height="13" rx="2" /><path d="M9 21h6M12 17v4" />
    </svg>
  ),
  heart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20s-7-4.5-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.5-7 10-7 10z" />
    </svg>
  ),
  chart: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 20h18" /><path d="M6 20V10M11 20V6M16 20v-7M21 20v-3" />
    </svg>
  ),
  analytics: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" />
    </svg>
  ),
  cursor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 3l6 17 2.5-7L20 10z" />
    </svg>
  ),
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l9 5-9 5-9-5z" /><path d="M3 13l9 5 9-5M3 17l9 5 9-5" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13 3L4 14h7l-1 7 9-11h-7z" />
    </svg>
  ),
  star: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3l2.6 6 6.4.6-4.9 4.4 1.5 6.4L12 17l-5.6 3.4 1.5-6.4L3 9.6 9.4 9z" />
    </svg>
  ),
};
const KEYS = Object.keys(ICONS);

let uid = 0;

export function FallingIcons({ scope, triggerRef, floorSelector }) {
  const [items, setItems] = useState([]);
  const intervalRef = useRef(null);
  const activeRef = useRef(false);

  useEffect(() => {
    const trigger = triggerRef && triggerRef.current;
    if (!trigger) return;

    const spawn = () => {
      if (!activeRef.current) return;
      const root = scope.current;
      if (!root) return;
      const tRect = trigger.getBoundingClientRect();
      const rRect = root.getBoundingClientRect();
      const floorEl = document.querySelector(floorSelector);
      const fRect = floorEl ? floorEl.getBoundingClientRect() : null;
      const startX = (tRect.left - rRect.left) + tRect.width * 0.5;
      const startY = (tRect.top - rRect.top) + tRect.height * 0.5;
      const floorY = fRect ? (fRect.top - rRect.top) : (rRect.height - 80);
      const id = ++uid;
      const icon = KEYS[Math.floor(Math.random() * KEYS.length)];
      const drift = (Math.random() - 0.5) * 160;
      const rot = (Math.random() - 0.5) * 540;
      const size = 22 + Math.random() * 14;
      const fall = Math.max(40, floorY - startY);
      const bounceX = drift + (Math.random() - 0.5) * 80;
      const bounceY = -Math.min(80, fall * 0.25);
      const fallDur = 0.7 + Math.random() * 0.4;
      const settleDur = 0.55 + Math.random() * 0.3;
      setItems((arr) => [...arr, { id, icon, startX, startY, drift, rot, size, fall, bounceX, bounceY, fallDur, settleDur, phase: 0 }]);
      setTimeout(() => {
        setItems((arr) => arr.map(it => it.id === id ? { ...it, phase: 1 } : it));
      }, fallDur * 1000);
      setTimeout(() => {
        setItems((arr) => arr.filter(it => it.id !== id));
      }, (fallDur + settleDur) * 1000 + 100);
    };

    const start = () => {
      activeRef.current = true;
      spawn();
      intervalRef.current = setInterval(spawn, 140);
    };
    const stop = () => {
      activeRef.current = false;
      clearInterval(intervalRef.current);
    };

    const isTouch = window.matchMedia && window.matchMedia('(hover: none)').matches;
    let burstTimer = null;
    let pauseTimer = null;
    const runBurst = () => {
      activeRef.current = true;
      let n = 0;
      burstTimer = setInterval(() => {
        spawn();
        n++;
        if (n >= 5) {
          clearInterval(burstTimer);
          burstTimer = null;
          activeRef.current = false;
          pauseTimer = setTimeout(runBurst, 3200);
        }
      }, 180);
    };
    if (isTouch) {
      pauseTimer = setTimeout(runBurst, 900);
    } else {
      trigger.addEventListener('mouseenter', start);
      trigger.addEventListener('mouseleave', stop);
    }
    return () => {
      if (!isTouch) {
        trigger.removeEventListener('mouseenter', start);
        trigger.removeEventListener('mouseleave', stop);
      }
      stop();
      if (burstTimer) clearInterval(burstTimer);
      if (pauseTimer) clearTimeout(pauseTimer);
    };
  }, [scope, triggerRef, floorSelector]);

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
      {items.map((it) => {
        const t0 = `translate3d(${it.startX}px, ${it.startY}px, 0) rotate(0deg)`;
        const tFall = `translate3d(${it.startX + it.drift}px, ${it.startY + it.fall}px, 0) rotate(${it.rot}deg)`;
        const tSettle = `translate3d(${it.startX + it.drift + it.bounceX}px, ${it.startY + it.fall + it.bounceY}px, 0) rotate(${it.rot * 1.4}deg) scale(0.6)`;
        return (
          <div
            key={it.id}
            style={{
              position: 'absolute', top: 0, left: 0,
              width: it.size, height: it.size,
              color: 'var(--ink)',
              opacity: it.phase === 0 ? 0.95 : 0,
              transform: it.phase === 0 ? tFall : tSettle,
              transition: it.phase === 0
                ? `transform ${it.fallDur}s cubic-bezier(.4,.1,.6,1), opacity ${it.fallDur}s linear`
                : `transform ${it.settleDur}s cubic-bezier(.2,.6,.4,1), opacity ${it.settleDur}s ease-out`,
              willChange: 'transform, opacity',
            }}
            ref={(el) => {
              if (el && !el.dataset.init) {
                el.dataset.init = '1';
                el.style.transform = t0;
                requestAnimationFrame(() => { el.style.transform = tFall; });
              }
            }}
          >
            {ICONS[it.icon]}
          </div>
        );
      })}
    </div>
  );
}
