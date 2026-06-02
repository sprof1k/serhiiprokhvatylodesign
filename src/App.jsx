import { VariantA } from './components/VariantA';

function CVButton() {
  return (
    <a className="cv-fab" href="assets/Serhii-Prokhvatylo-CV.pdf" target="_blank" rel="noopener" aria-label="Get full CV">
      <span className="cv-fab__label">Get Full CV</span>
      <span className="cv-fab__arrow" aria-hidden="true">↗</span>
    </a>
  );
}

export default function App() {
  return (
    <>
      <div className="site-grid" aria-hidden="true">
        <span /><span /><span /><span /><span />
      </div>
      <CVButton />
      <div className="page"><VariantA /></div>
    </>
  );
}
