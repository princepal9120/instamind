# Instamind MVP Plan

## Product framing
Instamind is an AI assistant that helps users avoid the daily “what should I eat and what should I restock?” loop by combining meal planning, grocery refill suggestions, and quick ordering through Swiggy Food and Instamart.

## Core user flows
1. **First-time setup**
   - User enters household size, diet preferences, disliked items, budget range, and usual meal cadence.
   - User optionally connects or simulates recent Swiggy Food and Instamart history.
   - Instamind creates a simple pantry baseline and weekly meal preference profile.

2. **Weekly planning**
   - User asks for a 3 to 7 day meal plan.
   - Instamind proposes meals based on pantry assumptions, preferences, prep effort, and budget.
   - User can accept, swap, or skip meals.

3. **Grocery refill**
   - Instamind detects likely missing ingredients for the approved plan plus staple refills.
   - User reviews a grouped Instamart cart with quantities and estimated spend.
   - User confirms and is handed off to Instamart checkout.

4. **Low-effort fallback ordering**
   - If user is busy or pantry is low, Instamind suggests Swiggy Food options aligned with the same preferences and budget.
   - User picks a recommendation and is handed off to Swiggy Food checkout.

5. **Post-order learning**
   - Instamind logs what was planned, ordered, skipped, or swapped.
   - Future refill and meal suggestions improve using this lightweight feedback loop.

## MVP features only
- Lightweight onboarding for household, diet, dislikes, budget, and cooking frequency.
- Mock pantry model seeded from simple assumptions plus recent purchase history if available.
- AI-generated weekly meal plans for breakfast, lunch, and dinner, with easy swaps.
- Ingredient gap detection for selected meals.
- Smart staple refill suggestions for common household goods and groceries.
- Instamart cart builder using mapped mock or basic catalog items.
- Swiggy Food fallback recommendations when meals are skipped or cooking effort is low.
- Budget-aware recommendations and simple estimated total before checkout.
- Feedback capture: thumbs up, thumbs down, swap, ordered, skipped.
- Basic reminders: “running low” and “plan next 3 days.”

## Fake and mock data assumptions
- Pantry state is inferred, not truly real time.
- Swiggy Food and Instamart integrations can start as mocked catalog and order-history inputs.
- Item availability, pricing, ETA, and substitutions are approximate until live APIs are integrated.
- Refill logic assumes average household consumption rates for staples like milk, eggs, bread, rice, atta, oil, fruits, and snacks.
- Nutrition quality can be rule-based rather than clinically precise.
- User behavior signals are limited to a small set of explicit actions and recent mock orders.
- Checkout is a handoff or deep link, not an in-app payment flow.

## Future roadmap
- Real account linking with live Swiggy Food and Instamart history.
- Better pantry memory using receipts, repeat purchases, and meal completion signals.
- Family mode with shared preferences and collaborative planning.
- Auto-replenishment subscriptions for staple categories.
- Health goals, macros, and condition-aware meal planning.
- Conversational planning in WhatsApp or voice.
- Dynamic pricing and availability optimization across merchants.
- Smart leftover reuse and waste reduction suggestions.
- Festival, regional cuisine, and seasonal planning packs.
- Full closed-loop ordering with proactive reorder prompts.

## Three strong one-liners
1. **Instamind turns “What should we eat?” into a plan, a grocery cart, or an order in minutes.**
2. **From pantry guesswork to meal plan to checkout, Instamind makes home food decisions effortless.**
3. **Instamind is the AI layer that connects weekly meal planning with one-tap grocery refills and fallback food ordering.**
