import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { CaseStudy } from './components/CaseStudy';
import './styles.css';

function CVButton() {
  return (
    <a className="cv-fab" href="/assets/Serhii-Prokhvatylo-CV.pdf" target="_blank" rel="noopener" aria-label="Get full CV">
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
    <CVButton />
    <div className="page"><CaseStudy /></div>
  </StrictMode>
);
