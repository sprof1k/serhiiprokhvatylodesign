import { useState, useEffect } from 'react';
import { VariantA } from './components/VariantA';

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    document.documentElement.getAttribute('data-theme') || 'dark'
  );

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem('sp-theme', theme); } catch {}
  }, [theme]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('sp-theme');
      if (saved) setTheme(saved);
    } catch {}
  }, []);

  return (
    <button
      className="theme-toggle"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <span className="dot" />
      {theme === 'light' ? 'Light' : 'Dark'}
    </button>
  );
}

export default function App() {
  return (
    <>
      <div className="site-grid" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <ThemeToggle />
      <div className="page"><VariantA /></div>
    </>
  );
}
