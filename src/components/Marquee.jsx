const PILLS = [
  'Mobile Apps', 'AI Tools', 'Dashboards', 'Product Design',
  'UX Audit', 'SaaS Platforms', 'Design Systems', 'iOS / Android',
  'Web Experiences', 'FinTech', 'HealthTech', 'Data Visualization',
  'Onboarding', 'Branding',
];

export function MarqueePills() {
  const items = [...PILLS, ...PILLS];
  return (
    <section className="marquee-section" aria-hidden="true">
      <div className="marquee-track">
        {items.map((p, i) => (
          <span key={i} className="marquee-pill">
            <span className="marquee-dot" />
            {p}
          </span>
        ))}
      </div>
    </section>
  );
}
