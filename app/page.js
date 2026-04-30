'use client';

import { useEffect, useMemo, useState } from 'react';

const starterPrompt = 'Keep me stocked for breakfast for the next 4 days. I also want one healthy dinner tonight under ₹650. I usually buy eggs, milk, bananas, oats, and curd.';

const quickPrompts = [
  'Breakfast refill for 4 days under ₹600.',
  'Healthy vegetarian dinner tonight plus breakfast staples.',
  'I am busy this week. Build a low-effort grocery plan for 3 days.',
];

function rupees(value) {
  return `₹${Number(value || 0).toLocaleString('en-IN')}`;
}

export default function HomePage() {
  const [prompt, setPrompt] = useState(starterPrompt);
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState({ connected: false, clientConfigured: false, mode: 'demo-planner' });
  const [toolResult, setToolResult] = useState(null);
  const [toolLoading, setToolLoading] = useState(false);

  async function loadStatus() {
    const response = await fetch('/api/swiggy/status');
    const data = await response.json();
    setStatus(data);
  }

  async function generatePlan(nextPrompt = prompt) {
    setLoading(true);
    setToolResult(null);
    try {
      const response = await fetch('/api/plan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: nextPrompt }),
      });
      const data = await response.json();
      setPlan(data.plan);
    } finally {
      setLoading(false);
    }
  }

  async function callTool(name, args = {}, confirm = false) {
    setToolLoading(true);
    try {
      const response = await fetch('/api/swiggy/tool', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, arguments: args, confirm }),
      });
      const data = await response.json();
      setToolResult({ name, ok: response.ok, data });
    } finally {
      setToolLoading(false);
    }
  }

  useEffect(() => {
    loadStatus();
    generatePlan(starterPrompt);
  }, []);

  const groupedCart = useMemo(() => {
    if (!plan?.cart) return [];
    return plan.cart.reduce((groups, item) => {
      const existing = groups.find((group) => group.category === item.category);
      if (existing) existing.items.push(item);
      else groups.push({ category: item.category, items: [item] });
      return groups;
    }, []);
  }, [plan]);

  return (
    <main className="page-shell">
      <header className="topbar">
        <div className="container topbar-inner">
          <a href="#top" className="brand-mark">Instamind</a>
          <nav className="topnav">
            <a href="#planner">Planner</a>
            <a href="#swiggy">Swiggy MCP</a>
            <a href="#system">System</a>
          </nav>
          <a href="https://github.com/princepal9120/instamind" className="ghost-button">GitHub</a>
        </div>
      </header>

      <section id="top" className="hero-section">
        <div className="container hero-grid">
          <div>
            <div className="eyebrow">Swiggy Builders Club ready MVP</div>
            <h1 className="hero-title">Your AI grocery brain for Instamart planning.</h1>
            <p className="hero-copy">
              Instamind turns a messy food need into an explainable grocery cart, a meal fallback, and a Swiggy MCP execution path. It works in demo mode today and switches to live Instamart once Swiggy credentials are connected.
            </p>
            <div className="hero-actions">
              <a href="#planner" className="primary-button">Try the planner</a>
              <a href="/api/auth/swiggy/start" className="secondary-button">Connect Swiggy</a>
            </div>
            <div className="status-strip">
              <span className={status.connected ? 'live-dot' : 'demo-dot'} />
              {status.connected ? 'Live Swiggy MCP connected' : 'Demo planner active'}
              {!status.clientConfigured && <span className="muted-inline">Add SWIGGY_CLIENT_ID to enable OAuth.</span>}
            </div>
          </div>

          <div className="hero-card planner-preview">
            <div className="hero-card-header">Current recommendation</div>
            <div className="metric-grid">
              <div className="metric-card">
                <span>Total</span>
                <strong>{rupees(plan?.total)}</strong>
              </div>
              <div className="metric-card">
                <span>Confidence</span>
                <strong>{Math.round((plan?.confidence || 0) * 100)}%</strong>
              </div>
            </div>
            <div className="signal-card">
              <p><strong>{plan?.path || 'Instamart-first refill plan'}</strong></p>
              <p>{plan?.summary || 'Generating a plan...'}</p>
            </div>
            <div className="signal-card muted">
              <p><strong>Guardrail</strong></p>
              <p>Instamind never checks out without an explicit user confirmation and a fresh cart read.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="planner" className="section-block">
        <div className="container section-grid planner-grid">
          <div>
            <div className="section-kicker">Interactive planner</div>
            <h2 className="section-title">Describe the outcome. Instamind builds the cart logic.</h2>
            <p className="section-copy">
              This is the core product loop: intent, pantry assumptions, budget fit, cart-ready items, and Swiggy MCP calls that can run once credentials are approved.
            </p>
            <div className="prompt-box">
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={7} />
              <button className="primary-button full-button" onClick={() => generatePlan()} disabled={loading}>
                {loading ? 'Planning...' : 'Generate plan'}
              </button>
            </div>
            <div className="quick-prompts">
              {quickPrompts.map((item) => (
                <button key={item} onClick={() => { setPrompt(item); generatePlan(item); }}>{item}</button>
              ))}
            </div>
          </div>

          <div className="demo-card">
            <div className="demo-header">
              <div>
                <h3>Instamart refill cart</h3>
                <p>{plan?.diet} · {plan?.days} day plan</p>
              </div>
              <div className="demo-total">{rupees(plan?.total)}</div>
            </div>
            <div className="cart-groups">
              {groupedCart.map((group) => (
                <div key={group.category} className="cart-group">
                  <div className="cart-group-title">{group.category}</div>
                  {group.items.map((item) => (
                    <div key={item.name} className="demo-row">
                      <div>
                        <div className="row-title">{item.name}</div>
                        <div className="row-subtitle">{item.quantity} · query: {item.mcpQuery}</div>
                        <p className="row-reason">{item.reason}</p>
                      </div>
                      <div className="row-price">{rupees(item.estimatedPrice)}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <div className="recommendation-box">
              <strong>Meal decisions</strong>
              {plan?.meals?.map((meal) => (
                <p key={meal.title}><b>{meal.title}:</b> {meal.details}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="swiggy" className="section-block muted-surface">
        <div className="container section-grid two-col">
          <div>
            <div className="section-kicker">Swiggy MCP integration</div>
            <h2 className="section-title">Built around the real Instamart tool flow.</h2>
            <p className="section-copy">
              The API layer follows Swiggy’s documented Instamart journey: get addresses, search products, update cart, get cart, checkout, and track order. Mutating calls require confirmation by design.
            </p>
            <div className="mcp-actions">
              <button className="secondary-button" onClick={() => callTool('get_addresses')} disabled={toolLoading}>Get addresses</button>
              <button className="secondary-button" onClick={() => callTool('get_cart')} disabled={toolLoading}>Read cart</button>
              <button className="secondary-button" onClick={() => callTool('search_products', { addressId: 'demo-address-id', query: plan?.cart?.[0]?.mcpQuery || 'milk' })} disabled={toolLoading}>Search first item</button>
            </div>
            <p className="small-note">Live calls need a connected Swiggy token. Without credentials, the planner still demonstrates the end-to-end review flow for the Builders Club video.</p>
          </div>
          <div className="diagram-card result-card">
            <div className="result-title">Tool response</div>
            <pre>{toolResult ? JSON.stringify(toolResult, null, 2) : JSON.stringify(plan?.mcpFlow || [], null, 2)}</pre>
          </div>
        </div>
      </section>

      <section id="system" className="section-block system-section">
        <div className="container section-grid two-col">
          <div>
            <div className="section-kicker">System design</div>
            <h2 className="section-title">A small, shippable architecture.</h2>
            <p className="section-copy">
              The project now has a frontend planner, deterministic planning engine, Swiggy OAuth routes, a protected MCP proxy, and a review-first cart flow.
            </p>
            <div className="mini-grid">
              <div className="mini-card"><h3>Planner API</h3><p>/api/plan returns explainable cart recommendations.</p></div>
              <div className="mini-card"><h3>OAuth</h3><p>/api/auth/swiggy/start and callback implement PKCE.</p></div>
              <div className="mini-card"><h3>MCP proxy</h3><p>/api/swiggy/tool wraps Instamart tools through JSON-RPC.</p></div>
              <div className="mini-card"><h3>Safety</h3><p>Cart mutation and checkout require confirm: true.</p></div>
            </div>
          </div>
          <div className="diagram-card">
            <pre>{`User intent
  ↓
Instamind planner
  ↓
Cart explanation + budget check
  ↓
Swiggy OAuth token
  ↓
Instamart MCP tools
  ↓
Fresh cart read
  ↓
User confirmation
  ↓
Checkout + tracking`}</pre>
          </div>
        </div>
      </section>
    </main>
  );
}
