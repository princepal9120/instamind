const pillars = [
  {
    title: 'Intent-first planning',
    description:
      'Instamind starts from the user outcome, not a catalog browse. It understands whether the user needs a refill, a meal, or a blended plan.',
  },
  {
    title: 'Memory-backed decisions',
    description:
      'Repeat staples, budget bands, accepted substitutions, and meal preferences make every plan feel more personal over time.',
  },
  {
    title: 'Swiggy-native execution',
    description:
      'The product is designed around Swiggy Food and Instamart MCP flows so recommendations can evolve into real, approved actions.',
  },
];

const howItWorks = [
  'Understand the user goal, budget, and household context.',
  'Decide whether the best path is Swiggy Food, Instamart, or a blended cart.',
  'Generate a cart-ready plan with reasoning, substitutions, and budget fit.',
];

const demoItems = [
  ['Eggs', '12 pcs', '₹96'],
  ['Milk', '2 litres', '₹128'],
  ['Bananas', '12 pcs', '₹72'],
  ['Oats', '1 pack', '₹180'],
  ['Curd', '2 tubs', '₹90'],
];

const useCases = [
  'Weekly breakfast refill for busy professionals',
  'Tonight plus tomorrow planning in one decision flow',
  'Repeat grocery management with lighter manual effort',
];

export default function HomePage() {
  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <div className="brand-mark">Instamind</div>
          <nav className="topnav">
            <a href="#how-it-works">How it works</a>
            <a href="#demo">Demo</a>
            <a href="#system">System</a>
          </nav>
          <a href="https://github.com/princepal9120/instamind" className="ghost-button">
            View GitHub
          </a>
        </div>
      </header>

      <section className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Swiggy Builders Club submission concept</div>
            <h1 className="hero-title">AI planning for grocery refills and meal decisions, built for Swiggy-native execution.</h1>
            <p className="hero-copy">
              Instamind turns recurring needs, budget, and food preferences into ready-to-approve plans. Instead of making users browse from scratch, it decides what should come from Instamart, what should come from Swiggy Food, and why the final plan fits.
            </p>
            <div className="hero-actions">
              <a href="#demo" className="primary-button">
                Explore the concept
              </a>
              <a href="#system" className="secondary-button">
                View system design
              </a>
            </div>
          </div>

          <div className="hero-card">
            <div className="hero-card-header">Example output</div>
            <div className="signal-card">
              <p><strong>Goal</strong></p>
              <p>Breakfast refill for 4 days, plus one healthy dinner tonight under ₹450.</p>
            </div>
            <div className="signal-card muted">
              <p><strong>Recommended path</strong></p>
              <p>Instamart for recurring staples. Swiggy Food for a quick, high-protein dinner.</p>
            </div>
            <div className="signal-card muted">
              <p><strong>Why this works</strong></p>
              <p>It covers tomorrow morning, matches preference memory, and avoids over-ordering.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="section-block">
        <div className="container section-grid two-col">
          <div>
            <div className="section-kicker">How it works</div>
            <h2 className="section-title">A lighter, cleaner commerce flow</h2>
            <p className="section-copy">
              The product is intentionally simple at the surface. Users describe the outcome they want. The planner layer decides the right commerce path and returns a plan that is clear enough to approve.
            </p>
          </div>
          <div className="stack-list">
            {howItWorks.map((item, index) => (
              <div key={item} className="list-card">
                <div className="list-index">0{index + 1}</div>
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-block muted-surface">
        <div className="container">
          <div className="section-head narrow">
            <div className="section-kicker">Core product pillars</div>
            <h2 className="section-title">Built to feel less like shopping, more like planning</h2>
          </div>
          <div className="card-grid three-up">
            {pillars.map((pillar) => (
              <div key={pillar.title} className="feature-card">
                <h3>{pillar.title}</h3>
                <p>{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="demo" className="section-block">
        <div className="container section-grid demo-grid">
          <div>
            <div className="section-kicker">MVP demo</div>
            <h2 className="section-title">A credible first version for builders review</h2>
            <p className="section-copy">
              This MVP is designed to communicate the product clearly without pretending the full Swiggy integration stack is already wired. The value is in the planner logic, the blended decision flow, and the product surface.
            </p>
            <div className="note-card">
              <p className="note-label">Sample input</p>
              <p>
                Keep me stocked for breakfast for the next 4 days. I also want one healthy dinner tonight. I usually buy eggs, milk, bananas, oats, and curd.
              </p>
            </div>
          </div>

          <div className="demo-card">
            <div className="demo-header">
              <div>
                <h3>Suggested refill cart</h3>
                <p>Instamart estimate</p>
              </div>
              <div className="demo-total">₹566</div>
            </div>
            <div className="demo-items">
              {demoItems.map(([name, qty, price]) => (
                <div key={name} className="demo-row">
                  <div>
                    <div className="row-title">{name}</div>
                    <div className="row-subtitle">{qty}</div>
                  </div>
                  <div className="row-price">{price}</div>
                </div>
              ))}
            </div>
            <div className="recommendation-box">
              <strong>Dinner recommendation</strong>
              <p>Grilled chicken bowl, ETA 25 min, approx. ₹389. Chosen for budget fit, protein preference, and lower decision overhead.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="system" className="section-block muted-surface system-section">
        <div className="container section-grid two-col">
          <div>
            <div className="section-kicker">System design</div>
            <h2 className="section-title">Small surface area, clear integration points</h2>
            <p className="section-copy">
              The architecture stays intentionally light. A clean web layer, a planner/orchestrator, a simple memory layer, and Swiggy integration points that can be connected once access is approved.
            </p>
            <div className="mini-grid">
              <div className="mini-card">
                <h3>Auth callback</h3>
                <p>/api/integrations/swiggy/callback</p>
              </div>
              <div className="mini-card">
                <h3>Deployment</h3>
                <p>Next.js, Vercel-ready, builder-friendly setup.</p>
              </div>
            </div>
          </div>
          <div className="diagram-card">
            <pre>{`Web app
  ↓
Planner / orchestrator
  ↓
Memory + preference layer
  ↓
Swiggy Food MCP | Instamart MCP
  ↓
Cart-ready recommendation + approval flow`}</pre>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="container section-grid two-col">
          <div>
            <div className="section-kicker">Use cases</div>
            <h2 className="section-title">Where Instamind is strongest first</h2>
          </div>
          <div className="stack-list compact">
            {useCases.map((item) => (
              <div key={item} className="list-card compact-card">
                <p>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
