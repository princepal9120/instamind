const features = [
  {
    title: 'Refill memory',
    description: 'Remember staple groceries, repeat order patterns, preferred brands, and budget bands.',
  },
  {
    title: 'Meal-aware planning',
    description: 'Understand whether the user needs a grocery refill, a meal tonight, or both in one flow.',
  },
  {
    title: 'Explainable carts',
    description: 'Return a plan that clearly explains what to buy, what to order, and why it fits.',
  },
  {
    title: 'Swiggy-native actions',
    description: 'Designed to plug directly into Swiggy Food and Instamart MCP tools for real execution.',
  },
];

const demoItems = [
  ['Eggs', '12 pcs', '₹96'],
  ['Milk', '2 litres', '₹128'],
  ['Bananas', '12 pcs', '₹72'],
  ['Oats', '1 pack', '₹180'],
  ['Curd', '2 tubs', '₹90'],
];

const roadmap = [
  {
    phase: 'Phase 1',
    items: ['Next.js landing and demo flow', 'interactive planner', 'mock preference memory'],
  },
  {
    phase: 'Phase 2',
    items: ['Swiggy auth callback', 'Food integration', 'Instamart cart creation'],
  },
  {
    phase: 'Phase 3',
    items: ['mobile app', 'push refill reminders', 'family mode and shared lists'],
  },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <div className="text-2xl font-semibold tracking-tight">
            Insta<span className="text-violet-600">mind</span>
          </div>
          <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
            <a href="#product">Product</a>
            <a href="#demo">Demo</a>
            <a href="#architecture">Architecture</a>
            <a href="#roadmap">Roadmap</a>
          </nav>
          <a
            href="https://github.com/princepal9120/instamind"
            className="rounded-xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            GitHub
          </a>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-gradient-to-b from-violet-50 via-white to-white">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-violet-200 bg-violet-100 px-4 py-1.5 text-sm font-medium text-violet-700">
              Swiggy Builders MVP
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight text-slate-900 md:text-7xl">
              Your AI assistant for grocery refills and smarter meal decisions.
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600 md:text-xl">
              Instamind turns recurring needs, budget, and food preferences into ready-to-approve plans. Instead of browsing from scratch, users describe the outcome they want and the agent decides what to order from Swiggy Food, what to restock from Instamart, and why.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a href="#demo" className="rounded-2xl bg-violet-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-violet-700">
                Explore the MVP
              </a>
              <a href="#architecture" className="rounded-2xl border border-slate-300 px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
                View system design
              </a>
            </div>
          </div>

          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.08)]">
            <div className="rounded-3xl border border-violet-100 bg-violet-50 p-5">
              <p className="text-sm font-medium text-violet-700">Sample agent output</p>
              <div className="mt-4 space-y-3 text-sm leading-6 text-slate-700">
                <p><strong>Goal:</strong> breakfast refill for 4 days, plus one healthy dinner tonight under ₹450.</p>
                <p><strong>Plan:</strong> Instamart cart for staples and one Swiggy Food recommendation for immediate dinner.</p>
                <p><strong>Why:</strong> covers tomorrow morning, matches high-protein preference, and stays within budget.</p>
              </div>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">Memory layer stores repeat groceries, accepted substitutions, and budget bands.</div>
              <div className="rounded-2xl border border-slate-200 p-4 text-sm text-slate-600">Planner layer chooses Food, Instamart, or a blended flow based on intent.</div>
            </div>
          </div>
        </div>
      </section>

      <section id="product" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">What the product needs to feel like</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            Not a generic shopping UI. Not a chatbot that tells you to browse. Instamind should feel like a personal commerce operator that remembers, decides, and explains.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-slate-900">{feature.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="demo" className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">MVP demo flow</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              This is the fastest credible version to ship. It proves the user flow, the reasoning layer, and the Swiggy integration story without pretending everything is already production-connected.
            </p>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="rounded-2xl bg-slate-100 p-4 text-sm text-slate-700">
                Keep me stocked for breakfast for the next 4 days. I also want one healthy dinner tonight under ₹450. I usually buy eggs, milk, bananas, oats, and curd.
              </div>
              <div className="mt-4 rounded-2xl border border-violet-200 bg-violet-50 p-4 text-sm leading-6 text-slate-700">
                <strong>Instamind plan</strong>
                <p className="mt-2">Breakfast refill cart through Instamart plus one quick high-protein dinner option through Swiggy Food.</p>
                <p className="mt-2">The blended plan is cheaper than over-ordering dinner twice and keeps tomorrow morning covered.</p>
              </div>
            </div>

            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                <div>
                  <h3 className="text-xl font-semibold text-slate-900">Suggested refill cart</h3>
                  <p className="text-sm text-slate-500">Instamart estimate</p>
                </div>
                <div className="text-lg font-semibold text-slate-900">₹566</div>
              </div>
              <div className="divide-y divide-slate-200">
                {demoItems.map(([name, qty, price]) => (
                  <div key={name} className="flex items-center justify-between py-4 text-sm">
                    <div>
                      <div className="font-medium text-slate-900">{name}</div>
                      <div className="text-slate-500">{qty}</div>
                    </div>
                    <div className="font-medium text-slate-700">{price}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-slate-200 p-4 text-sm leading-6 text-slate-600">
                <strong className="text-slate-900">Dinner recommendation:</strong> grilled chicken bowl, ETA 25 min, approx. ₹389. Chosen because it matches budget, protein preference, and convenience.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="architecture" className="mx-auto max-w-6xl px-6 py-20">
        <div className="max-w-3xl">
          <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">System design</h2>
          <p className="mt-4 text-lg leading-8 text-slate-600">
            A lightweight architecture for a solo founder to ship fast. Web first, clean integration points, then real Swiggy auth and MCP execution once access is approved.
          </p>
        </div>

        <div className="mt-10 overflow-x-auto rounded-[28px] border border-slate-200 bg-slate-950 p-6 shadow-sm">
          <pre className="min-w-[780px] whitespace-pre-wrap font-mono text-sm leading-6 text-slate-200">{`┌──────────────────────────────┐
│  Next.js web app             │
│  - landing page              │
│  - planner input             │
│  - recommendation screen     │
│  - approval UI               │
└───────────────┬──────────────┘
                │ HTTPS
                ▼
┌──────────────────────────────┐
│  App API / Orchestrator      │
│  Node.js + TypeScript        │
│  - preference handling       │
│  - planning / routing        │
│  - result explanation        │
│  - auth callback             │
└───────────┬─────────┬────────┘
            │         │
            │         ├────────────────────────────┐
            │         │                            │
            ▼         ▼                            ▼
┌────────────────┐ ┌────────────────┐   ┌─────────────────┐
│ Memory store   │ │ Swiggy Food    │   │ Swiggy          │
│ pantry habits  │ │ MCP server     │   │ Instamart MCP   │
│ diets/budget   │ │ meals/offers   │   │ products/carts  │
└────────────────┘ └────────────────┘   └─────────────────┘
            │
            ▼
┌──────────────────────────────┐
│ Explainability layer         │
│ - why this plan              │
│ - substitutions              │
│ - budget fit                 │
└──────────────────────────────┘`}</pre>
        </div>

        <div className="mt-8 grid gap-5 md:grid-cols-3">
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Auth callback path</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">/api/integrations/swiggy/callback</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">Vercel-ready stack</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Next.js App Router, simple CSS, no extra complexity, clean for immediate deployment.</p>
          </div>
          <div className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-lg font-semibold text-slate-900">MVP promise</h3>
            <p className="mt-3 text-sm leading-6 text-slate-600">Ship a clean story now, then wire in real Swiggy APIs without rebuilding the product surface.</p>
          </div>
        </div>
      </section>

      <section id="roadmap" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="max-w-3xl">
            <h2 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">Roadmap</h2>
            <p className="mt-4 text-lg leading-8 text-slate-600">
              The current repo now communicates the product clearly. From here, the right next move is to add real execution in layers.
            </p>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {roadmap.map((phase) => (
              <div key={phase.phase} className="rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900">{phase.phase}</h3>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-slate-600">
                  {phase.items.map((item) => (
                    <li key={item}>• {item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
