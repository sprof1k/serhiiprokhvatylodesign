import { useState, useEffect, useRef } from 'react';
import { Reveal, Placeholder, ParallaxPortrait } from './Bits';
import { ScrollWords, ScrollReveal } from './ScrollReveal';
import { ExperienceSection } from './Experience';
import { ServicesSection } from './Services';
import { MarqueePills } from './Marquee';
import { FallingIcons } from './FallingIcons';
import { FeaturedProject } from './Featured';
import { PROJECTS, EXPERIENCE, SERVICES } from '../data';

export function VariantA() {
  const scrollRef = useRef(null);
  const portraitRef = useRef(null);
  const [time, setTime] = useState('');

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = String(d.getUTCHours()).padStart(2, '0');
      const m = String(d.getUTCMinutes()).padStart(2, '0');
      setTime(`${h}:${m} UTC`);
    };
    tick();
    const i = setInterval(tick, 30000);
    return () => clearInterval(i);
  }, []);

  return (
    <div ref={scrollRef} style={{ width: '100%', minHeight: '100vh', background: 'transparent', color: 'var(--ink)', position: 'relative' }}>
      {/* nav */}
      <header className="site-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: 'var(--bg)', borderBottom: '1px solid var(--line)' }}>
        <div className="nav-row" style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', padding: '14px 32px 14px 32px', paddingRight: 130, gap: 24 }}>
          <div className="nav-status" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, background: 'oklch(0.7 0.18 145)', borderRadius: '50%' }} />
            <span className="mono-label">Available · Q1 2026</span>
          </div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '0.04em' }}>SP / DESIGN</div>
          <div className="nav-links" style={{ display: 'flex', justifyContent: 'flex-end', gap: 18 }}>
            {['Work', 'About', 'Notes', 'Contact'].map((l, i) => (
              <a key={l} href={'#' + l.toLowerCase()} className="mono-label" style={{ textDecoration: 'none' }}>
                <span style={{ opacity: 0.5, marginRight: 6 }}>{String(i + 1).padStart(2, '0')}</span>{l}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="hero-section" style={{ minHeight: '88vh', padding: '56px 32px 56px', borderBottom: '1px solid var(--line)', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <ParallaxPortrait src="/assets/serhii-photo.jpg" scope={scrollRef} side="right" innerRef={portraitRef} />
        <FallingIcons scope={scrollRef} triggerRef={portraitRef} floorSelector=".marquee-section" />
        <div className="hero-text-group">
          <div className="mono-label hero-tag" style={{ marginBottom: 36 }}>{'/* portfolio · v.4 — '}{time}{' */'}</div>
          <h1 className="hero-title" style={{ fontFamily: 'var(--font-display)', fontSize: 86, lineHeight: 0.96, letterSpacing: '-0.04em', fontWeight: 500, margin: '0 0 36px', maxWidth: 1100 }}>
            Serhii Prokhvatylo —<br />{' '}
            <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 300, fontSize: '1.08em' }}>product designer</span> who treats AI<br />{' '}
            like a partner, not a replacement.
          </h1>
        </div>
        <div className="hero-meta" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, maxWidth: 1100 }}>
          <p style={{ fontFamily: 'var(--font-serif)', fontSize: 19, lineHeight: 1.5, color: 'var(--ink-2)', margin: 0 }}>
            Six years designing products people actually use — from B2B
            ops tooling to consumer fintech. Currently exploring how
            generative interfaces change the texture of everyday software.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'flex-end' }}>
            <div className="mono-label">{'// where to find me'}</div>
            <div style={{ display: 'flex', gap: 24 }}>
              <a className="under" href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>read.cv</a>
              <a className="under" href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>linkedin</a>
              <a className="under" href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>twitter / x</a>
              <a className="under" href="#" style={{ fontFamily: 'var(--font-mono)', fontSize: 13 }}>email →</a>
            </div>
          </div>
        </div>
      </section>

      {/* marquee — sits between hero and selected work */}
      <MarqueePills />

      {/* featured project — highlighted single case */}
      <FeaturedProject />

      {/* selected work */}
      <section id="work" className="work-section" style={{ padding: '48px 32px 56px', borderBottom: '1px solid var(--line)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 28 }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 500, letterSpacing: '-0.02em', margin: 0 }}>
            Selected <span style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic', fontWeight: 400, fontSize: '1.08em' }}>work</span>
          </h2>
          <span className="mono-label">{`${PROJECTS.length} projects · 2023 — 2025`}</span>
        </div>

        <div className="work-grid" style={{ columnCount: 2, columnGap: 8 }}>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 80} root={scrollRef}>
              <article
                style={{ cursor: 'pointer', breakInside: 'avoid', marginBottom: 8, display: 'block' }}
                data-cursor="open"
                onClick={() => p.link && (window.location.href = p.link)}
              >
                <Placeholder className="work-card-img" label={p.client} color={p.color} aspect="16/10" image={p.image} />
                <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'baseline', margin: '14px 0 18px' }}>
                  <span className="mono-label">{p.id}</span>
                  <div>
                    <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, lineHeight: 1.25, fontWeight: 500, letterSpacing: '-0.01em' }}>{p.title}</div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--muted)', textTransform: 'uppercase', letterSpacing: '0.06em', marginTop: 6 }}>{p.client} · {p.role}</div>
                    <div className="mono-label" style={{ color: 'var(--accent)', marginTop: 8 }}>{p.metric}</div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* about — full viewport scroll-reveal */}
      <ScrollReveal>
        {(p) => (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 32 }}>
              <span className="mono-label">[ 02 · About ]</span>
              <span className="mono-label">{`scroll · ${String(Math.round(p * 100)).padStart(3, '0')}%`}</span>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', maxWidth: 1280, margin: '0 auto', width: '100%' }}>
              <ScrollWords
                className="about-scroll-text"
                text={`I help tech teams turn complex ideas into simple, scalable, and visually clean products that users understand instantly. My work combines product thinking, strong UX architecture, and a fast, detail-oriented delivery process.

I've collaborated with companies across the US and Europe — from AI startups and SaaS platforms to FinTech, HealthTech, and internal enterprise tools — building designs that improve usability, clarity, and business outcomes.`}
                progress={p}
                fontFamily="var(--font-serif)"
                fontSize="clamp(28px, 3.4vw, 52px)"
                lineHeight={1.25}
                color="var(--ink)"
                dim={0.12}
              />
            </div>
          </>
        )}
      </ScrollReveal>

      {/* experience */}
      <ExperienceSection items={EXPERIENCE} />

      {/* services */}
      <ServicesSection items={SERVICES} />

      {/* footer */}
      <section id="contact" className="footer-section">
        <div className="footer-top">
          <div className="footer-group">
            <div className="mono-label footer-group-label">Contact</div>
            <a className="footer-email" href="mailto:sprof1k20@gmail.com">sprof1k20@gmail.com</a>
          </div>
          <div className="footer-group footer-group-links">
            <div className="mono-label footer-group-label">Links</div>
            <a className="footer-link" href="#">Resume<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="#">Read.cv<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="#">LinkedIn<span aria-hidden="true">↗</span></a>
            <a className="footer-link" href="#">GitHub<span aria-hidden="true">↗</span></a>
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
