import { useState, useEffect } from 'react';

export function ThemeToggle() {
  const [mode, setMode] = useState(() => {
    try {
      const saved = localStorage.getItem('sp-theme-mode');
      if (saved === 'light' || saved === 'dark') return saved;
    } catch {}
    return document.documentElement.getAttribute('data-theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', mode);
    try { localStorage.setItem('sp-theme-mode', mode); } catch {}
  }, [mode]);

  const isLight = mode === 'light';

  return (
    <button
      className="theme-switch"
      role="switch"
      aria-checked={isLight}
      aria-label={`Switch to ${isLight ? 'dark' : 'light'} theme`}
      onClick={() => setMode(isLight ? 'dark' : 'light')}
    >
      <span className="theme-switch__track">
        <span className="theme-switch__icon theme-switch__icon--moon" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z" />
          </svg>
        </span>
        <span className="theme-switch__icon theme-switch__icon--sun" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
          </svg>
        </span>
        <span className="theme-switch__thumb" />
      </span>
    </button>
  );
}
