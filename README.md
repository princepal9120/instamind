# Instamind

Instamind is an AI grocery refill and meal planning assistant built for Swiggy Instamart MCP.

The app now includes a working MVP surface, deterministic planner, Swiggy OAuth routes, and a protected Instamart MCP proxy. It can run as a demo without credentials and switch to live MCP calls after Swiggy Builders Club access is approved.

## What is included

- Interactive meal and grocery intent planner.
- Budget-aware Instamart cart recommendations.
- Explainable item reasoning and meal fallback suggestions.
- Swiggy OAuth 2.1 with PKCE start and callback routes.
- Instamart MCP JSON-RPC proxy for documented tools.
- Safety guardrails for cart mutation and checkout.
- Vercel-ready Next.js app.

## Swiggy MCP flow implemented

Instamind follows the documented Instamart journey:

1. `get_addresses`
2. `search_products`
3. `update_cart`
4. `get_cart`
5. `checkout`
6. `track_order`

Mutating MCP tools require `confirm: true` in `/api/swiggy/tool`, so the product cannot accidentally update a cart or checkout without explicit approval.

## Local run

```bash
npm install
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Environment

Copy the example file:

```bash
cp .env.example .env.local
```

Then set:

```bash
SWIGGY_CLIENT_ID=your_client_id
SWIGGY_REDIRECT_URI=http://localhost:3000/api/auth/swiggy/callback
```

If `SWIGGY_REDIRECT_URI` is omitted, the app defaults to:

```bash
<app-origin>/api/auth/swiggy/callback
```

## API routes

### `POST /api/plan`

Generates the cart-ready Instamind plan.

```json
{
  "prompt": "Breakfast refill for 4 days under ₹600"
}
```

### `GET /api/swiggy/status`

Returns whether OAuth is configured and whether a Swiggy token cookie is present.

### `GET /api/auth/swiggy/start`

Starts Swiggy OAuth with PKCE.

### `GET /api/auth/swiggy/callback`

Exchanges the OAuth code for an access token and stores it in an HTTP-only cookie.

### `POST /api/swiggy/tool`

Calls an Instamart MCP tool through `https://mcp.swiggy.com/im`.

```json
{
  "name": "get_cart",
  "arguments": {}
}
```

For mutating tools:

```json
{
  "name": "update_cart",
  "confirm": true,
  "arguments": {
    "selectedAddressId": "addr_123",
    "items": [{ "spinId": "spin_123", "quantity": 1 }]
  }
}
```

## Builders Club demo script

1. Open the app.
2. Show the planner prompt.
3. Generate a cart recommendation.
4. Explain the budget, item reasoning, and fallback meal.
5. Show the MCP flow section.
6. Connect Swiggy after credentials are approved.
7. Demonstrate read-only tools first: `get_addresses`, `get_cart`, `search_products`.
8. Confirm cart mutation only after user approval.

## Production checklist

- Add approved Swiggy `client_id`.
- Register the exact production redirect URI with Swiggy.
- Use HTTPS in production.
- Add persistent user profiles and preference memory.
- Add live product variant selection before `update_cart`.
- Add order history learning after checkout or track events.
