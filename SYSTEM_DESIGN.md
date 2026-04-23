# Instamind MVP System Design

## Goal
Build a fast-shipping web MVP for an AI grocery refill and meal planning assistant on top of Swiggy Food and Instamart. The product should help a user describe intent in plain language, remember recurring preferences, generate a suggested plan, and hand the user off to Swiggy for approval and checkout.

This design is intentionally lightweight for a solo founder: minimal moving parts, low ops burden, and clear upgrade paths.

## Product shape
Core user flow:
1. User signs in.
2. User connects Swiggy.
3. User sets basic preferences like diet, budget, repeat items, and household size.
4. User enters a goal like "restock breakfast for 5 days" or "healthy dinner under ₹450".
5. Backend planner combines user memory with Swiggy data.
6. App returns a suggested plan with explanation, items, estimated totals, and approval links.
7. User approves in Swiggy, then Instamind stores the outcome for future recommendations.

## Architecture

```text
[Next.js web app]
  |- Landing page
  |- Auth + onboarding screens
  |- Planner chat / request form
  |- Plan review screen
  |- Account + memory settings
  |
  v
[Next.js API routes or small Express/Fastify service]
  |- Auth module
  |- Swiggy OAuth callback handler
  |- User/profile module
  |- Preference memory module
  |- Planning/orchestration module
  |- Cart/recommendation module
  |- Webhook/event ingestion module
  |
  v
[Postgres]
  |- users
  |- swiggy_accounts
  |- preferences
  |- planning_requests
  |- plans
  |- plan_items
  |- order_events

Optional supporting services:
- Redis, only if request/job load later needs caching or async queues
- LLM API for plan generation and explanation
- Swiggy MCP or partner APIs for catalog, cart, and order actions
```

## Recommended stack
- Frontend: Next.js with App Router, TypeScript, Tailwind CSS
- Backend: Next.js server actions + route handlers for MVP
- Database: Postgres via Supabase or Neon
- Auth: NextAuth or Clerk for user login, plus Swiggy OAuth connection
- ORM: Prisma or Drizzle
- AI layer: single orchestration service calling one LLM provider
- Hosting: Vercel for app, managed Postgres for data

Why this stack:
- One codebase, one deployment path
- Fast local iteration
- Good enough auth and database primitives without building infra first
- Easy to evolve into separate backend services later

## Main frontend screens

### 1. Landing page
Purpose:
- Explain the product clearly
- Capture waitlist or demo traffic
- Route users into signup

Key elements:
- Hero and product promise
- Example prompts
- Explanation of Swiggy connection
- CTA to sign up or try demo

### 2. Sign in / create account
Purpose:
- Let users create an Instamind account
- Keep this separate from Swiggy connection

Key elements:
- Google or email magic link
- Lightweight legal copy

### 3. Connect Swiggy
Purpose:
- Ask user to authorize Swiggy access
- Handle OAuth callback and show status

Key elements:
- "Connect Swiggy" button
- Scope explanation
- Success/error states
- Reconnect flow if token expires

### 4. Onboarding / preferences
Purpose:
- Collect just enough memory to improve first plans

Key elements:
- Dietary preference
- Budget range
- Household size
- Repeat staples
- Brand preferences
- Delivery urgency style, like cheapest vs fastest

### 5. Planner screen
Purpose:
- Main product surface
- User enters natural language request and sees result

Key elements:
- Prompt input
- Suggested quick actions, like weekly refill or dinner tonight
- Recent requests
- Loading and partial progress states

### 6. Plan review screen
Purpose:
- Show recommended groceries, food options, or blended plan

Key elements:
- Sections for Instamart items and Swiggy Food recommendations
- Estimated price and timing
- Explanation panel, why these choices were made
- Accept, regenerate, or edit plan actions
- Deep links or handoff links into Swiggy

### 7. Memory and account settings
Purpose:
- Let users fix bad assumptions without contacting support

Key elements:
- Saved preferences
- Linked Swiggy account status
- Recent plans and outcomes
- Delete account / disconnect controls

## Backend modules

### 1. Auth module
Responsibilities:
- User session management
- Access control for app data
- Mapping app users to Swiggy connections

Endpoints:
- `POST /api/auth/*` via auth provider
- `GET /api/me`

### 2. Swiggy integration module
Responsibilities:
- Start OAuth flow
- Receive callback
- Exchange auth code for tokens
- Refresh tokens if supported
- Provide normalized client methods for downstream planner logic

Endpoints:
- `GET /api/integrations/swiggy/connect`
- `GET /api/integrations/swiggy/callback`
- `POST /api/integrations/swiggy/disconnect`

### 3. User profile and preferences module
Responsibilities:
- CRUD for user profile and food/grocery preferences
- Normalize repeat items and constraints

Endpoints:
- `GET /api/preferences`
- `PUT /api/preferences`

### 4. Planning/orchestration module
Responsibilities:
- Take user goal plus memory plus Swiggy context
- Decide if request is grocery, meal, or hybrid
- Call LLM and tool layer in a controlled prompt chain
- Save request, result, and explanation

Endpoints:
- `POST /api/plans`
- `GET /api/plans/:id`
- `POST /api/plans/:id/regenerate`

### 5. Catalog/cart recommendation module
Responsibilities:
- Resolve user intent into concrete items or restaurant suggestions
- Deduplicate repeated items
- Attach quantity, substitution notes, and rationale

Internal outputs:
- candidate grocery items
- candidate food options
- merged plan summary

### 6. Event ingestion module
Responsibilities:
- Record plan approvals, rejections, edits, and completed orders
- Feed future ranking and memory updates

Endpoints:
- `POST /api/webhooks/swiggy`
- `POST /api/plans/:id/feedback`

## Data model sketch

### users
- `id`
- `email`
- `name`
- `created_at`
- `last_active_at`

### swiggy_accounts
- `id`
- `user_id`
- `swiggy_user_id`
- `access_token_encrypted`
- `refresh_token_encrypted`
- `token_expires_at`
- `connected_at`
- `status`

### preferences
- `id`
- `user_id`
- `dietary_prefs` JSON
- `budget_mode`
- `household_size`
- `favorite_brands` JSON
- `repeat_items` JSON
- `avoid_items` JSON
- `delivery_preference`
- `updated_at`

### planning_requests
- `id`
- `user_id`
- `raw_prompt`
- `request_type` (grocery, meal, hybrid)
- `status`
- `created_at`

### plans
- `id`
- `planning_request_id`
- `user_id`
- `summary`
- `explanation`
- `estimated_total`
- `currency`
- `handoff_url`
- `status`
- `created_at`

### plan_items
- `id`
- `plan_id`
- `source_type` (instamart, swiggy_food)
- `external_item_id`
- `title`
- `quantity`
- `unit`
- `estimated_price`
- `reason`
- `substitution_group`

### order_events
- `id`
- `user_id`
- `plan_id`
- `event_type` (approved, edited, ordered, failed)
- `payload` JSON
- `created_at`

## Auth callback path
Use this callback path for Swiggy OAuth:

- `/api/integrations/swiggy/callback`

Callback flow:
1. User clicks Connect Swiggy.
2. App redirects to Swiggy authorization page with `redirect_uri` set to `/api/integrations/swiggy/callback`.
3. Swiggy returns `code` and `state`.
4. Backend verifies `state`.
5. Backend exchanges `code` for tokens.
6. Tokens are encrypted and stored in `swiggy_accounts`.
7. User is redirected to `/onboarding` if first-time, otherwise `/planner?connected=swiggy`.

If the product later supports mobile too, keep the server-side callback the same and let mobile also route through the backend.

## Request lifecycle
1. Frontend posts prompt to `POST /api/plans`.
2. Backend loads user preferences and Swiggy connection.
3. Planner classifies request.
4. Planner fetches relevant product or order context from Swiggy tools.
5. LLM generates a structured plan object, not just free text.
6. Backend validates and saves the plan.
7. Frontend renders the review screen.
8. User approves via Swiggy handoff link or connected cart action.
9. Outcome is captured as feedback or webhook event.

## Practical MVP boundaries
To ship fast, avoid these in v1:
- Real-time chat memory across long threads
- Multiple grocery providers
- Fully automated checkout
- Complex ranking models
- Native mobile apps
- Huge event pipelines

Instead, keep the planner deterministic where possible:
- Rule-based request classification first
- One LLM call for plan generation
- One normalized result schema for UI rendering

## Deployment suggestion
Best solo-founder setup:
- Vercel for frontend and backend routes
- Supabase or Neon Postgres for storage
- Vercel env vars for secrets
- Sentry for error tracking
- PostHog or Plausible for product analytics

This gives:
- Low maintenance
- Cheap initial cost
- Easy previews per branch
- Enough observability to debug early users

## Suggested folder layout

```text
app/
  page.tsx
  sign-in/page.tsx
  onboarding/page.tsx
  planner/page.tsx
  plans/[id]/page.tsx
  settings/page.tsx
  api/
    integrations/swiggy/connect/route.ts
    integrations/swiggy/callback/route.ts
    plans/route.ts
    plans/[id]/route.ts
    preferences/route.ts
lib/
  auth.ts
  db.ts
  swiggy.ts
  planner.ts
  validations.ts
prisma/
  schema.prisma
```

## Good first implementation order
1. Convert landing page into Next.js app shell.
2. Add auth and protected planner page.
3. Add preference onboarding form.
4. Implement Swiggy connect and callback route.
5. Create `POST /api/plans` with mocked plan output.
6. Replace mocked planner with real Swiggy + LLM orchestration.
7. Add plan history and feedback capture.

## Bottom line
For MVP, Instamind should be one deployable web app with a thin backend, managed Postgres, and a single planner pipeline. The key proof is not perfect automation, it is that users can go from intent to a trustworthy, explainable, ready-to-approve Swiggy plan in a few steps.