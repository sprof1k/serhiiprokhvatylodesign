export function MinimalCase() {
  const C = window.__CASE__ || {};
  const images = C.images || [];
  const META = [
    { label: 'Client',   value: C.client,   sub: C.tags },
    { label: 'My Role',  value: C.role,     sub: C.roleSub },
    { label: 'Industry', value: C.industry, sub: C.industrySub },
    { label: 'Year',     value: C.year,     sub: C.timeline },
  ];

  return (
    <div className="case-study cs2">
      <header className="site-header cs-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
        <div className="nav-row cs-nav-row">
          <div className="nav-status">
            <a className="cs-back mono-label" href="./">
              <span aria-hidden="true">←</span> Back to work
            </a>
          </div>
          <div className="cs-brand">SP / DESIGN</div>
          <div className="nav-links cs-nav-meta">
            <span className="mono-label">Case {C.idx} / {C.total}</span>
          </div>
        </div>
      </header>

      <section className="cs2-hero">
        <div className="cs2-hero-top">
          <span className="mono-label">[ Case {C.idx} · {C.client} ]</span>
          <span className="mono-label">{C.tags}</span>
          <span className="mono-label">{C.year}</span>
        </div>
        <h1 className="cs2-headline">
          {C.head && C.head.map((seg, i) =>
            seg.br ? <br key={i} /> :
            seg.serif
              ? <span key={i} className="serif-it">{seg.text}</span>
              : <span key={i}>{seg.text}</span>
          )}
        </h1>
        <div className="cs2-hero-foot">
          <p className="cs2-hero-lede">{C.lede}</p>
          <div className="cs2-hero-actions">
            {C.liveHref ? (
              <a className="cs-cta" href={C.liveHref} target="_blank" rel="noopener">
                View live product <span aria-hidden="true">↗</span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {C.heroImage ? (
        <section className="cs-min-cover-wrap" aria-label={`${C.client} cover`}>
          <div className="cs-min-cover">
            <img src={C.heroImage} alt={`${C.client} — cover`} loading="eager" fetchPriority="high" decoding="async" />
          </div>
        </section>
      ) : null}

      <section className="cs2-meta-strip">
        {META.filter((m) => m.value).map((m) => (
          <div key={m.label} className="cs2-meta-cell">
            <div className="mono-label">{m.label}</div>
            <div className="cs2-meta-value">{m.value}</div>
            {m.sub ? <div className="mono-label cs2-meta-sub">{m.sub}</div> : null}
          </div>
        ))}
      </section>

      {images.length ? (
        <section className="cs-min-shots">
          {images.map((src, i) => (
            <img key={i} className="cs-min-shot" src={src} alt={`${C.client} — screen ${i + 1}`} loading="lazy" decoding="async" />
          ))}
        </section>
      ) : null}

      {C.next ? (
        <section className="cs2-next">
          <div className="cs2-next-head">
            <span className="mono-label">[ Next case ]</span>
            <span className="mono-label">{C.next.idx}</span>
          </div>
          <a className="cs2-next-card" href={C.next.href}>
            <div className="cs2-next-text">
              <div className="mono-label">{C.next.year} · {C.next.client}</div>
              <h2 className="cs2-next-title">
                {C.next.title}
                <span className="cs2-next-arrow" aria-hidden="true">↗</span>
              </h2>
            </div>
            <div className="cs2-next-image">
              <img src={C.next.image} alt={C.next.title} loading="lazy" decoding="async" />
            </div>
          </a>
        </section>
      ) : null}

      <section id="contact" className="footer-section">
        <div className="footer-top">
          <div className="footer-group">
            <div className="mono-label footer-group-label">Contact</div>
            <a className="footer-email" href="mailto:sprof1k20@gmail.com">sprof1k20@gmail.com</a>
          </div>
          <div className="footer-group footer-group-links">
            <div className="mono-label footer-group-label">Links</div>
            <a className="footer-link" href="https://www.linkedin.com/in/sprokhvatilo/" target="_blank" rel="noopener">LinkedIn<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="assets/Serhii-Prokhvatylo-CV.pdf" target="_blank" rel="noopener">CV<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="https://www.figma.com/design/uKOqQqj7zxHbcYaXwfn8Rh/Serhii-Prokhvatylo-%7C-Portfolio?node-id=2-71194&t=Vxne7jA8LGCoWhLn-1" target="_blank" rel="noopener">Figma Projects<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="https://t.me/sprokhvatilo" target="_blank" rel="noopener">Telegram<span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-name">Serhii.<br className="footer-name-break" />Prokhvatylo</span>
          <span className="footer-year">©2026</span>
        </div>
      </section>
    </div>
  );
}
