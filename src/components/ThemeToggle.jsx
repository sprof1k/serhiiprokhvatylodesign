import { useState, useEffect } from 'react';

const OPTIONS = [
  {
    id: 'system',
    label: 'System theme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="12" rx="2" />
        <path d="M8 20h8M12 16v4" />
      </svg>
    ),
  },
  {
    id: 'light',
    label: 'Light theme',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
      </svg>
    ),
  },
  {
    id: 'dark',
    label: 'Dark theme',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
        <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
      </svg>
    ),
  },
];

export function ThemeToggle() {
  const [mode, setMode] = useState(() => {
    try { return localStorage.getItem('sp-theme-mode') || 'system'; } catch { return 'system'; }
  });

  useEffect(() => {
    const apply = () => {
      const resolved = mode === 'system'
        ? (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
        : mode;
      document.documentElement.setAttribute('data-theme', resolved);
    };
    apply();
    try { localStorage.setItem('sp-theme-mode', mode); } catch {}

    if (mode === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: light)');
      const onChange = () => apply();
      mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange);
      return () => {
        mq.removeEventListener ? mq.removeEventListener('change', onChange) : mq.removeListener(onChange);
      };
    }
  }, [mode]);

  return (
    <div className="theme-switch" role="radiogroup" aria-label="Theme">
      <div className="theme-switch__group">
        {OPTIONS.map((o) => (
          <button
            key={o.id}
            className="theme-switch__btn"
            role="radio"
            aria-checked={mode === o.id}
            aria-pressed={mode === o.id}
            aria-label={o.label}
            onClick={() => setMode(o.id)}
          >
            {o.icon}
          </button>
        ))}
      </div>
    </div>
  );
}
