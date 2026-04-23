const app = document.getElementById('app');

const state = {
  budget: 450,
  diet: 'High protein',
  cadence: '4 days',
  goal: 'Keep me stocked for breakfast for the next 4 days and suggest one healthy dinner tonight under ₹450.',
  pantry: ['Eggs', 'Milk', 'Bananas', 'Oats', 'Curd'],
};

function currency(value) {
  return `₹${value}`;
}

function buildPlan() {
  const pantryItems = [
    { name: 'Eggs', qty: '12 pcs', price: 96 },
    { name: 'Milk', qty: '2 litres', price: 128 },
    { name: 'Bananas', qty: '12 pcs', price: 72 },
    { name: 'Oats', qty: '1 pack', price: 180 },
    { name: 'Curd', qty: '2 tubs', price: 90 },
  ];

  const total = pantryItems.reduce((sum, item) => sum + item.price, 0);
  const dinner = state.budget <= 450
    ? { name: 'Grilled chicken bowl', source: 'Swiggy Food', eta: '25 min', price: 389 }
    : { name: 'High protein thali', source: 'Swiggy Food', eta: '22 min', price: 429 };

  return {
    pantryItems,
    pantryTotal: total,
    dinner,
    explanation: `Instamind picked a blended plan because your goal includes both stocking breakfast staples and solving dinner tonight. It kept the refill cart anchored to your repeat items and selected a quick high-protein dinner within your budget.`
  };
}

function render() {
  const plan = buildPlan();

  app.innerHTML = `
    <nav class="nav">
      <div class="container nav-inner">
        <div class="brand">Insta<span>mind</span></div>
        <div class="nav-links">
          <a href="#planner">Planner</a>
          <a href="#features">Features</a>
          <a href="#architecture">Architecture</a>
          <a href="https://github.com/princepal9120/instamind" target="_blank" rel="noreferrer">GitHub</a>
        </div>
      </div>
    </nav>

    <section class="hero">
      <div class="container">
        <div class="grid-hero">
          <div>
            <div class="badge">Instamind MVP for Swiggy Builders</div>
            <h1>Your AI assistant for grocery refills and smarter meal decisions.</h1>
            <p class="lead">Instamind turns recurring needs, budget, and food preferences into ready-to-approve plans. Instead of browsing from scratch, users describe the outcome they want and the agent decides what to order from Swiggy Food, what to restock from Instamart, and why.</p>
            <div class="cta-row">
              <a class="btn btn-primary" href="#planner">Try the demo planner</a>
              <a class="btn btn-secondary" href="#architecture">View system design</a>
            </div>
          </div>
          <div class="card">
            <div class="pill success">Current demo scope</div>
            <div class="grid-2 compact-grid">
              <div class="mini-card"><strong>Preference memory</strong><p class="muted">Tracks staple groceries, diet, and budget.</p></div>
              <div class="mini-card"><strong>Planner logic</strong><p class="muted">Chooses Food, Instamart, or both.</p></div>
              <div class="mini-card"><strong>Explainable output</strong><p class="muted">Shows why the plan is a fit.</p></div>
              <div class="mini-card"><strong>Swiggy integration path</strong><p class="muted">Ready for MCP and auth callback wiring.</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section alt" id="planner">
      <div class="container">
        <h2>Demo planner</h2>
        <p class="top">This is the MVP surface you can show right now. It demonstrates the end-user experience, recommendation flow, and reasoning layer.</p>

        <div class="planner-layout">
          <div class="card">
            <h3 class="mini-title">User preferences</h3>
            <label class="field">
              <span>Goal</span>
              <textarea id="goalInput">${state.goal}</textarea>
            </label>
            <div class="grid-2 compact-grid">
              <label class="field">
                <span>Budget</span>
                <input id="budgetInput" type="number" value="${state.budget}" min="100" step="10" />
              </label>
              <label class="field">
                <span>Diet</span>
                <select id="dietInput">
                  <option${state.diet === 'High protein' ? ' selected' : ''}>High protein</option>
                  <option${state.diet === 'Balanced' ? ' selected' : ''}>Balanced</option>
                  <option${state.diet === 'Vegetarian' ? ' selected' : ''}>Vegetarian</option>
                </select>
              </label>
            </div>
            <label class="field">
              <span>Repeat staples</span>
              <input id="pantryInput" value="${state.pantry.join(', ')}" />
            </label>
            <button class="btn btn-primary full" id="generateBtn">Generate plan</button>
          </div>

          <div class="card">
            <div class="pill warning">Generated plan</div>
            <div class="result-block">
              <h3 class="mini-title">Breakfast refill cart</h3>
              <div class="list">
                ${plan.pantryItems.map(item => `<div class="list-row"><div><strong>${item.name}</strong><div class="muted small">${item.qty}</div></div><div>${currency(item.price)}</div></div>`).join('')}
              </div>
              <div class="summary-row"><strong>Instamart estimate</strong><strong>${currency(plan.pantryTotal)}</strong></div>
            </div>
            <div class="result-block">
              <h3 class="mini-title">Dinner recommendation</h3>
              <div class="list-row">
                <div>
                  <strong>${plan.dinner.name}</strong>
                  <div class="muted small">${plan.dinner.source} • ETA ${plan.dinner.eta}</div>
                </div>
                <div>${currency(plan.dinner.price)}</div>
              </div>
            </div>
            <div class="mini-card">
              <strong>Why this plan</strong>
              <p class="muted">${plan.explanation}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section" id="features">
      <div class="container">
        <h2>MVP features</h2>
        <div class="grid-4">
          <div class="card"><strong>Onboarding</strong><p class="muted">Capture budget, diet, repeat groceries, and convenience preferences.</p></div>
          <div class="card"><strong>Refill planner</strong><p class="muted">Build a grocery plan from recurring essentials and current goals.</p></div>
          <div class="card"><strong>Meal fallback</strong><p class="muted">Suggest a ready-to-order meal when cooking effort is low.</p></div>
          <div class="card"><strong>Trust layer</strong><p class="muted">Explain why each suggestion fits the user.</p></div>
        </div>
      </div>
    </section>

    <section class="section alt" id="architecture">
      <div class="container">
        <h2>System design</h2>
        <p class="top">A lightweight architecture for a solo founder to ship fast, then wire live Swiggy APIs after approval.</p>
        <div class="card" style="padding:0; overflow:hidden;">
          <pre class="diagram">┌──────────────────────────────┐
│  Web app frontend            │
│  - onboarding                │
│  - planner form              │
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
│  - auth callback integration │
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
└──────────────────────────────┘</pre>
        </div>
        <div class="grid-3">
          <div class="card"><strong>Auth callback path</strong><p class="muted">/api/integrations/swiggy/callback</p></div>
          <div class="card"><strong>Initial stack</strong><p class="muted">Static/Next.js frontend, Node.js orchestration, simple local memory, then MCP adapters.</p></div>
          <div class="card"><strong>Deployment path</strong><p class="muted">Vercel or simple Node host first, mobile later using the same backend.</p></div>
        </div>
      </div>
    </section>

    <footer class="footer">
      <div class="container">Instamind MVP, built to show the product direction and integration path clearly.</div>
    </footer>
  `;

  document.getElementById('generateBtn').addEventListener('click', () => {
    state.goal = document.getElementById('goalInput').value.trim();
    state.budget = Number(document.getElementById('budgetInput').value) || 450;
    state.diet = document.getElementById('dietInput').value;
    state.pantry = document.getElementById('pantryInput').value.split(',').map(s => s.trim()).filter(Boolean);
    render();
  });
}

render();
