import '../case-study.css';

const TEAM = [
  { initials: 'SP', name: 'Serhii Prokhvatylo', role: 'Lead Product Designer', accent: 'oklch(0.78 0.13 60)' },
  { initials: 'RV', name: 'Dr. Rebecca Voss',   role: 'CMO, Vera Health',       accent: 'oklch(0.62 0.14 38)' },
  { initials: 'AP', name: 'Alex Park',          role: 'Engineering Lead',       accent: 'oklch(0.55 0.11 220)' },
  { initials: 'MC', name: 'Marina Costa',       role: 'Product Manager',        accent: 'oklch(0.62 0.12 150)' },
];

const META = [
  { label: 'Client',   value: 'Vera Health',          sub: 'Boston · SF · Berlin' },
  { label: 'My Role',  value: 'Lead Product Designer', sub: 'Strategy · IA · UI · Motion' },
  { label: 'Timeline', value: '4 months',              sub: 'Aug — Dec 2024' },
  { label: 'Industry', value: 'Healthcare / AI',       sub: 'Clinical decision support' },
];

const CORE_PROBLEMS = [
  'Fragmented medical information across half a dozen tools',
  'Time-consuming clinical decision-making under pressure',
  'High cognitive load during patient evaluation at 3am',
  'Risk of missed or outdated treatment guidelines',
];

const BUSINESS_GOALS = [
  'Reduce time from triage to first documented action',
  'Increase weekly active adoption among attending physicians',
  'Build trust in AI-assisted recommendations with visible reasoning',
];

const USER_GOALS = [
  'Get clear, structured answers in seconds',
  'Understand why a recommendation is being made',
  'Access trusted, up-to-date medical sources without context-switching',
];

const PHASES = [
  { idx: '01', name: 'Discover', desc: 'Twelve hours shadowed across two hospitals. Mapped every interrupt, every alert, every workaround on the way to a single decision.' },
  { idx: '02', name: 'Define',   desc: "Synthesised friction into a four-trust framework: accurate, calm, accountable, fast. Anything that didn't serve those four was cut." },
  { idx: '03', name: 'Design',   desc: 'Three rounds of low-fi → hi-fi with two attending physicians in the room. Optimised relentlessly for one-glance legibility.' },
  { idx: '04', name: 'Deliver',  desc: 'Shipped in eight weeks across three hospitals. Iterated on live signal during overnight shifts and surgical pre-ops.' },
];

const OUTCOMES = [
  { stat: '42%', label: 'Faster patient intake',  detail: 'Average time from triage to first documented action, vs. baseline workflow.' },
  { stat: '3',   label: 'Hospitals shipped',      detail: 'Boston, San Francisco and Berlin — live in eight weeks, end to end.' },
  { stat: '94%', label: 'Physician satisfaction', detail: 'Of 87 surveyed clinicians after 30 days of daily use on shift.' },
];

const NEXT = {
  idx: '02 / 04',
  year: '2024',
  client: 'SP Cars',
  title: 'Local taxi for Mukachevo, rebuilt from scratch',
  image: 'assets/case-spcars.png',
  href: '#',
};

function Avatar({ a, size = 40 }) {
  return (
    <div className="cs-avatar" style={{ background: a.accent, width: size, height: size }}>
      <span>{a.initials}</span>
    </div>
  );
}

function SectionEyebrow({ idx, name, chapter }) {
  return (
    <div className="cs2-eyebrow">
      <span className="mono-label">[ {idx} · {name} ]</span>
      <span className="mono-label">{chapter}</span>
    </div>
  );
}

export function CaseStudy() {
  return (
    <div className="case-study cs2">
      {/* header */}
      <header className="site-header cs-header" style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--line)' }}>
        <div className="nav-row cs-nav-row">
          <div className="nav-status">
            <a className="cs-back mono-label" href="index.html">
              <span aria-hidden="true">←</span> Back to work
            </a>
          </div>
          <div className="cs-brand">SP / DESIGN</div>
          <div className="nav-links cs-nav-meta">
            <span className="mono-label">Case 01 / 04</span>
          </div>
        </div>
      </header>

      {/* 1. Hero — text only, editorial */}
      <section className="cs2-hero">
        <div className="cs2-hero-top">
          <span className="mono-label">[ Case Study 01 · Vera Health ]</span>
          <span className="mono-label">Healthcare · AI · iOS</span>
          <span className="mono-label">2024 — Q4</span>
        </div>

        <h1 className="cs2-headline">
          An AI <span className="serif-it">clinical</span> assistant
          <br />
          <span className="serif-it">doctors actually</span> trust.
        </h1>

        <div className="cs2-hero-foot">
          <p className="cs2-hero-lede">
            Vera Health is an AI-powered clinical companion that helps physicians capture,
            review and act on patient context in seconds — not minutes. I led the redesign
            from a friction-heavy prototype to a calm, opinionated product running live in
            three hospitals.
          </p>
          <div className="cs2-hero-actions">
            <a className="cs-cta" href="#">
              View live product <span aria-hidden="true">↗</span>
            </a>
            <a className="cs-cta cs-cta--ghost" href="#">
              View Figma file <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. Full-bleed showcase image */}
      <section className="cs2-fullbleed cs2-fullbleed--hero" aria-label="Vera Health flagship visual">
        <img src="assets/vera-1.png" alt="Vera Health — patient dashboard, full product view" loading="eager" decoding="async" />
      </section>

      {/* 3. Meta strip */}
      <section className="cs2-meta-strip">
        {META.map((m) => (
          <div key={m.label} className="cs2-meta-cell">
            <div className="mono-label">{m.label}</div>
            <div className="cs2-meta-value">{m.value}</div>
            <div className="mono-label cs2-meta-sub">{m.sub}</div>
          </div>
        ))}
      </section>

      {/* 4. Overview */}
      <section className="cs2-section cs2-overview">
        <SectionEyebrow idx="01" name="Overview" chapter="Context" />
        <div className="cs2-overview-body">
          <h2 className="cs2-section-title">
            A product for the <span className="serif-it">hardest twenty seconds</span> of a doctor's day.
          </h2>
          <div className="cs2-prose">
            <p>
              Vera Health entered the redesign with a working prototype but a stalling product:
              physicians used it once, then routed back to the tools they already trusted. Adoption
              was the surface symptom — the deeper issue was that the interface asked clinicians to
              read like an engineer at exactly the moments they needed to think like a doctor.
            </p>
            <p>
              Over four months I led the team through discovery in two teaching hospitals, a
              redefined product surface, and a relentless run of low-fi to hi-fi iteration with
              two attending physicians in the room. The shipping target wasn't a feature list. It
              was a single sentence: <em>a doctor at 3am can trust this in one glance.</em>
            </p>
          </div>
        </div>
      </section>

      {/* 5. The Problem */}
      <section className="cs2-section">
        <SectionEyebrow idx="02" name="The Problem" chapter="Discovery" />
        <h2 className="cs2-section-title">
          Information was everywhere. <span className="serif-it">Decisions were nowhere.</span>
        </h2>

        <div className="cs-twocol">
          <div className="cs-twocol-col">
            <h3 className="cs-sub-label">Context</h3>
            <p className="cs-body">
              Doctors operate under time pressure and information overload. Accessing up-to-date
              clinical guidelines, drug interactions and treatment recommendations often requires
              switching between four to six separate tools — most of them designed in different
              decades, for different jobs.
            </p>
            <p className="cs-body" style={{ marginTop: 14 }}>
              The cost is paid in attention. Every context switch is a chance for a missed dose,
              a stale guideline, a charted note that never makes it to the next clinician.
            </p>
          </div>
          <div className="cs-twocol-col">
            <h3 className="cs-sub-label">Core Problems</h3>
            <ul className="cs-bullets">
              {CORE_PROBLEMS.map((p) => <li key={p}>{p}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 6. Full-bleed image */}
      <section className="cs2-fullbleed" aria-label="Vera Health — reasoning and clinical calculator views">
        <img src="assets/vera-4.png" alt="Vera Health — clinical calculator and Discover feed" loading="lazy" decoding="async" />
      </section>

      {/* 7. Goals */}
      <section className="cs2-section">
        <SectionEyebrow idx="03" name="Goals & Success" chapter="Definition" />
        <h2 className="cs2-section-title">
          One brief. <span className="serif-it">Two audiences.</span> Same north star.
        </h2>

        <div className="cs-twocol">
          <div className="cs-twocol-col">
            <h3 className="cs-sub-label">Business Goals</h3>
            <ul className="cs-bullets">
              {BUSINESS_GOALS.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
          <div className="cs-twocol-col">
            <h3 className="cs-sub-label">User Goals</h3>
            <ul className="cs-bullets">
              {USER_GOALS.map((g) => <li key={g}>{g}</li>)}
            </ul>
          </div>
        </div>
      </section>

      {/* 8. Image trio */}
      <section className="cs2-trio-section">
        <div className="cs-image-trio">
          <div className="cs-trio-left">
            <img src="assets/vera-2.png" alt="Vera Health home — patient dashboard" loading="lazy" decoding="async" />
          </div>
          <div className="cs-trio-right">
            <img src="assets/vera-3.png" alt="Vera Health reasoning view" loading="lazy" decoding="async" />
            <img src="assets/vera-5.png" alt="Vera Health flows across three devices" loading="lazy" decoding="async" />
          </div>
        </div>
      </section>

      {/* 9. The Approach */}
      <section className="cs2-section">
        <SectionEyebrow idx="04" name="The Approach" chapter="Process" />
        <h2 className="cs2-section-title">
          Four phases. Two hospitals shadowed. <span className="serif-it">No assumptions left unchecked.</span>
        </h2>
        <div className="cs-phases">
          {PHASES.map((p) => (
            <div key={p.idx} className="cs-phase">
              <span className="mono-label cs-phase-idx">{p.idx}</span>
              <div className="cs-phase-name">{p.name}</div>
              <p className="cs-phase-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. Pull quote */}
      <section className="cs2-quote">
        <span className="mono-label cs2-quote-tag">[ Client · 30 days post-launch ]</span>
        <p className="cs2-quote-text">
          "Serhii's first round of sketches understood our world better than three previous
          vendors put together. By week eight he'd shipped something my residents quietly
          started <em>preferring</em> over the old chart system."
        </p>
        <div className="cs2-quote-att">
          <Avatar a={{ initials: 'RV', accent: 'oklch(0.62 0.14 38)' }} size={48} />
          <div>
            <div className="cs-team-name">Dr. Rebecca Voss</div>
            <div className="mono-label">Chief Medical Officer, Vera Health</div>
          </div>
        </div>
      </section>

      {/* 11. Solution */}
      <section className="cs2-section">
        <SectionEyebrow idx="05" name="The Solution" chapter="Shipping" />
        <h2 className="cs2-section-title">
          A <span className="serif-it">quietly competent</span> interface
          <br />
          that does its homework in the background.
        </h2>

        <div className="cs-solution-split">
          <figure className="cs-solution-image">
            <img src="assets/vera-5.png" alt="Vera Health — reasoning view shown in-hand" loading="lazy" decoding="async" />
          </figure>
          <div className="cs-solution-copy">
            <h3 className="cs-sub-label">Reasoned, not generated</h3>
            <p className="cs-body">
              Every recommendation is paired with the clinical guideline that produced it, inline
              citations, and a visible reasoning trace — so physicians can confirm in seconds why
              the system suggested what it did.
            </p>
            <h3 className="cs-sub-label" style={{ marginTop: 28 }}>One-glance legibility</h3>
            <p className="cs-body">
              The reading hierarchy is built for tired eyes at 3am: short answer first, supporting
              context next, source review one tap away. Calculators and drug checks sit alongside
              the chat, not buried behind it.
            </p>
            <h3 className="cs-sub-label" style={{ marginTop: 28 }}>Calm by default</h3>
            <p className="cs-body">
              The whole product runs in a low-saturation palette with a single warm accent. Alerts
              are reserved for the few moments that genuinely need them — everything else stays out
              of the way.
            </p>
          </div>
        </div>
      </section>

      {/* 12. Full-bleed close */}
      <section className="cs2-fullbleed" aria-label="Vera Health — final product still">
        <img src="assets/vera-2.png" alt="Vera Health — final shipping product still" loading="lazy" decoding="async" />
      </section>

      {/* 13. Outcome */}
      <section className="cs2-section">
        <SectionEyebrow idx="06" name="Outcome" chapter="30-day post-launch" />
        <h2 className="cs2-section-title">
          The numbers stopped being the story. <span className="serif-it">The shifts did.</span>
        </h2>
        <div className="cs-outcome-grid">
          {OUTCOMES.map((o, i) => (
            <div key={i} className="cs-outcome-card">
              <div className="cs-outcome-stat">{o.stat}</div>
              <div className="cs-outcome-label">{o.label}</div>
              <p className="cs-outcome-detail">{o.detail}</p>
            </div>
          ))}
        </div>

        <div className="cs2-team-credit">
          <div className="mono-label cs2-team-credit-label">Built with</div>
          <div className="cs2-team-row">
            {TEAM.map((t) => (
              <div key={t.name} className="cs-team-member">
                <Avatar a={t} />
                <div>
                  <div className="cs-team-name">{t.name}</div>
                  <div className="mono-label cs-team-role">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 14. Next project */}
      <section className="cs2-next">
        <div className="cs2-next-head">
          <span className="mono-label">[ Next case ]</span>
          <span className="mono-label">{NEXT.idx}</span>
        </div>
        <a className="cs2-next-card" href={NEXT.href}>
          <div className="cs2-next-text">
            <div className="mono-label">{NEXT.year} · {NEXT.client}</div>
            <h2 className="cs2-next-title">
              {NEXT.title}
              <span className="cs2-next-arrow" aria-hidden="true">↗</span>
            </h2>
          </div>
          <div className="cs2-next-image">
            <img src={NEXT.image} alt={NEXT.title} loading="lazy" decoding="async" />
          </div>
        </a>
      </section>

      {/* footer */}
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
