import '../case-study.css';

const TEAM = [
  { initials: 'SP', name: 'Serhii Prokhvatylo', role: 'Lead Product Designer', accent: 'oklch(0.78 0.13 60)' },
  { initials: 'RV', name: 'Dr. Rebecca Voss',   role: 'CMO, Vera Health',       accent: 'oklch(0.62 0.14 38)' },
  { initials: 'AP', name: 'Alex Park',          role: 'Engineering Lead',       accent: 'oklch(0.55 0.11 220)' },
  { initials: 'MC', name: 'Marina Costa',       role: 'Product Manager',        accent: 'oklch(0.62 0.12 150)' },
];

const CORE_PROBLEMS = [
  'Fragmented medical information',
  'Time-consuming clinical decision-making',
  'High cognitive load during patient evaluation',
  'Risk of missed or outdated guidelines',
];

const BUSINESS_GOALS = [
  'Reduce time to clinical decision',
  'Increase adoption among medical professionals',
  'Build trust in AI-assisted recommendations',
];
const USER_GOALS = [
  'Get clear, structured answers fast',
  'Understand why a recommendation is given',
  'Access trusted medical sources instantly',
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

function Avatar({ a, size = 40 }) {
  return (
    <div className="cs-avatar" style={{ background: a.accent, width: size, height: size }}>
      <span>{a.initials}</span>
    </div>
  );
}

export function CaseStudy() {
  return (
    <div className="case-study">
      {/* header */}
      <header className="site-header cs-header" style={{ position: 'sticky', top: 0, zIndex: 10, borderBottom: '1px solid var(--line)' }}>
        <div className="nav-row cs-nav-row">
          <div className="nav-status">
            <a className="cs-back mono-label" href="/">
              <span aria-hidden="true">←</span> Back to work
            </a>
          </div>
          <div className="cs-brand">SP / DESIGN</div>
          <div className="nav-links cs-nav-meta">
            <span className="mono-label">Case 01 / 04</span>
          </div>
        </div>
      </header>

      {/* hero */}
      <section className="cs-hero">
        <div className="cs-hero-meta">
          <span className="mono-label">[ Case Study · 01 ]</span>
          <span className="mono-label">2024 — Q4</span>
          <span className="mono-label">Vera Health</span>
        </div>

        <h1 className="cs-headline">
          An AI <span className="serif-it">clinical</span> assistant <span className="serif-it">doctors actually</span> trust.
        </h1>

        <div className="cs-hero-foot">
          <p className="cs-hero-lede">
            Vera Health is an AI-powered clinical companion that helps physicians capture,
            review and act on patient context in seconds — not minutes. I led the redesign
            from a friction-heavy prototype to a calm, opinionated product running live in
            three hospitals.
          </p>
          <div className="cs-hero-cta">
            <a className="cs-cta" href="#">
              View live product <span aria-hidden="true">↗</span>
            </a>
            <a className="cs-cta cs-cta--ghost" href="#">
              View Figma file <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      {/* meta info: role / timeline / team */}
      <section className="cs-context">
        <div className="cs-context-col">
          <div className="mono-label">My Role</div>
          <div className="cs-context-value">Lead Product Designer</div>
          <div className="mono-label cs-context-sub">Strategy · IA · UI · Motion</div>
        </div>
        <div className="cs-context-col">
          <div className="mono-label">Timeline</div>
          <div className="cs-context-value">4 months</div>
          <div className="mono-label cs-context-sub">Aug — Dec 2024</div>
        </div>
        <div className="cs-context-col cs-context-col--team">
          <div className="mono-label">Team</div>
          <div className="cs-team-row">
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

      {/* 01 · The Problem */}
      <section className="cs-section">
        <div className="cs-section-head">
          <span className="mono-label">[ 01 · The Problem ]</span>
          <span className="mono-label">Discovery</span>
        </div>
        <h2 className="cs-section-title">The problem</h2>

        <div className="cs-twocol">
          <div className="cs-twocol-col">
            <h3 className="cs-sub-label">Context</h3>
            <p className="cs-body">
              Doctors operate under time pressure and information overload. Accessing
              up-to-date clinical guidelines, drug interactions, and treatment
              recommendations often requires switching between multiple tools.
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

      {/* Image trio: left tall, right two stacked */}
      <section className="cs-image-trio" aria-label="Vera Health product visuals">
        <div className="cs-trio-left">
          <img src="/assets/vera-1.png" alt="Vera Health home — patient dashboard" />
        </div>
        <div className="cs-trio-right">
          <img src="/assets/vera-2.png" alt="Vera Health reasoning and clinical calculator views" />
          <img src="/assets/vera-3.png" alt="Vera Health flows across three devices" />
        </div>
      </section>

      {/* 02 · Goals & Success Criteria */}
      <section className="cs-section">
        <div className="cs-section-head">
          <span className="mono-label">[ 02 · Goals &amp; Success Criteria ]</span>
          <span className="mono-label">Definition</span>
        </div>
        <h2 className="cs-section-title">Goals &amp; Success Criteria</h2>

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

      {/* Image 4 — wide product still */}
      <section className="cs-image-full" aria-label="Vera Health — Wells Criteria and Discover">
        <img src="/assets/vera-4.png" alt="Vera Health — clinical calculator and Discover feed" />
      </section>

      {/* 03 · The Approach */}
      <section className="cs-section">
        <div className="cs-section-head">
          <span className="mono-label">[ 03 · The Approach ]</span>
          <span className="mono-label">Process</span>
        </div>
        <h2 className="cs-section-title">
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

      {/* Pull quote */}
      <section className="cs-quote">
        <p className="cs-quote-text">
          "Serhii's first round of sketches understood our world better than three previous
          vendors put together. By week eight he'd shipped something my residents quietly
          started <em>preferring</em> over the old chart system."
        </p>
        <div className="cs-quote-att">
          <Avatar a={{ initials: 'RV', accent: 'oklch(0.62 0.14 38)' }} size={48} />
          <div>
            <div className="cs-team-name">Dr. Rebecca Voss</div>
            <div className="mono-label">Chief Medical Officer, Vera Health</div>
          </div>
        </div>
      </section>

      {/* 04 · The Solution */}
      <section className="cs-section cs-solution">
        <div className="cs-section-head">
          <span className="mono-label">[ 04 · The Solution ]</span>
          <span className="mono-label">Shipping</span>
        </div>
        <h2 className="cs-section-title">
          A <span className="serif-it">quietly competent</span> interface that does its homework in the background.
        </h2>

        <div className="cs-solution-split">
          <figure className="cs-solution-image">
            <img src="/assets/vera-5.png" alt="Vera Health — reasoning view shown in-hand" />
          </figure>
          <div className="cs-solution-copy">
            <h3 className="cs-sub-label">Reasoned, not generated</h3>
            <p className="cs-body">
              Every recommendation is paired with the clinical guideline that produced it,
              inline citations, and a visible reasoning trace — so physicians can confirm
              in seconds why the system suggested what it did.
            </p>
            <h3 className="cs-sub-label" style={{ marginTop: 28 }}>One-glance legibility</h3>
            <p className="cs-body">
              The reading hierarchy is built for tired eyes at 3am: short answer first,
              supporting context next, source review one tap away. Calculators and drug
              checks sit alongside the chat, not buried behind it.
            </p>
          </div>
        </div>
      </section>

      {/* 05 · Outcome */}
      <section className="cs-section">
        <div className="cs-section-head">
          <span className="mono-label">[ 05 · Outcome ]</span>
          <span className="mono-label">30-day post-launch</span>
        </div>
        <h2 className="cs-section-title">
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
      </section>

      {/* CTA */}
      <section className="cs-cta-section">
        <span className="mono-label">[ Next ]</span>
        <h2 className="cs-cta-headline">
          Have a hard product problem? <span className="serif-it">Let's talk.</span>
        </h2>
        <a className="cs-cta cs-cta--big" href="mailto:sprof1k20@gmail.com">
          sprof1k20@gmail.com <span aria-hidden="true">↗</span>
        </a>
        <div className="cs-cta-back">
          <a className="under mono-label" href="/">← Back to all work</a>
        </div>
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
