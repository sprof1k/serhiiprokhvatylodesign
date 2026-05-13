import { StrictMode, useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { CaseStudy } from './components/CaseStudy';
import './styles.css';

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

function CVButton() {
  return (
    <a className="cv-fab" href="#" aria-label="Get full CV">
      <span className="cv-fab__label">Get Full CV</span>
      <span className="cv-fab__arrow" aria-hidden="true">↗</span>
    </a>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className="site-grid" aria-hidden="true">
      <span /><span /><span /><span /><span />
    </div>
    <ThemeToggle />
    <CVButton />
    <div className="page"><CaseStudy /></div>
  </StrictMode>
);
