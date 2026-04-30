export const stapleCatalog = [
  {
    name: 'Eggs',
    query: 'eggs',
    unit: '12 pcs',
    price: 96,
    category: 'Protein',
    reason: 'Reliable breakfast protein for quick meals.',
    aliases: ['egg', 'eggs'],
  },
  {
    name: 'Milk',
    query: 'milk',
    unit: '2 litres',
    price: 128,
    category: 'Dairy',
    reason: 'Breakfast staple for tea, oats, cereal, and smoothies.',
    aliases: ['milk', 'chai'],
  },
  {
    name: 'Bananas',
    query: 'banana',
    unit: '12 pcs',
    price: 72,
    category: 'Fruit',
    reason: 'Low-effort fruit that fits breakfast and snacks.',
    aliases: ['banana', 'bananas', 'fruit'],
  },
  {
    name: 'Oats',
    query: 'oats',
    unit: '1 pack',
    price: 180,
    category: 'Breakfast',
    reason: 'Fast breakfast base that works across multiple days.',
    aliases: ['oats', 'breakfast'],
  },
  {
    name: 'Curd',
    query: 'curd',
    unit: '2 tubs',
    price: 90,
    category: 'Dairy',
    reason: 'Useful with meals, bowls, and light dinners.',
    aliases: ['curd', 'yogurt', 'dahi'],
  },
  {
    name: 'Brown bread',
    query: 'brown bread',
    unit: '1 loaf',
    price: 55,
    category: 'Breakfast',
    reason: 'Backup breakfast and snack option when cooking time is low.',
    aliases: ['bread', 'toast', 'sandwich'],
  },
  {
    name: 'Paneer',
    query: 'paneer',
    unit: '200 g',
    price: 105,
    category: 'Protein',
    reason: 'Vegetarian protein for dinner or quick bowls.',
    aliases: ['paneer', 'vegetarian', 'veg', 'protein'],
  },
  {
    name: 'Chicken breast',
    query: 'chicken breast',
    unit: '250 g',
    price: 185,
    category: 'Protein',
    reason: 'High-protein dinner ingredient when non-veg is allowed.',
    aliases: ['chicken', 'non veg', 'non-veg', 'protein'],
  },
  {
    name: 'Rice',
    query: 'rice',
    unit: '1 kg',
    price: 90,
    category: 'Staple',
    reason: 'Core staple for dinner bowls and leftovers.',
    aliases: ['rice', 'biryani', 'meal'],
  },
  {
    name: 'Mixed vegetables',
    query: 'mixed vegetables',
    unit: '1 pack',
    price: 120,
    category: 'Vegetables',
    reason: 'Flexible base for dinner, poha, upma, rice, and wraps.',
    aliases: ['vegetable', 'vegetables', 'veggies', 'healthy'],
  },
];

const defaultInput = 'Breakfast refill for 4 days, plus one healthy dinner tonight under ₹450.';

function parseBudget(text) {
  const match = text.match(/(?:₹|rs\.?|inr)?\s*(\d{2,5})/i);
  return match ? Number(match[1]) : 650;
}

function parseDays(text) {
  const match = text.match(/(\d+)\s*(?:day|days)/i);
  return match ? Math.min(Math.max(Number(match[1]), 1), 7) : 4;
}

function includesAny(text, aliases) {
  return aliases.some((alias) => text.includes(alias));
}

export function buildPlan(rawPrompt = defaultInput, profile = {}) {
  const prompt = rawPrompt.trim() || defaultInput;
  const lowered = prompt.toLowerCase();
  const budget = Number(profile.budget) || parseBudget(lowered);
  const days = Number(profile.days) || parseDays(lowered);
  const household = Number(profile.household) || (lowered.includes('family') ? 4 : 1);
  const diet = profile.diet || (lowered.includes('veg') && !lowered.includes('non') ? 'Vegetarian' : 'Flexible');
  const lowEffort = lowered.includes('busy') || lowered.includes('quick') || lowered.includes('tonight') || lowered.includes('low effort');

  const selected = stapleCatalog.filter((item) => {
    if (['Eggs', 'Chicken breast'].includes(item.name) && diet === 'Vegetarian') return false;
    if (includesAny(lowered, item.aliases)) return true;
    return ['Milk', 'Bananas', 'Oats', 'Curd'].includes(item.name);
  });

  const dinnerBase = diet === 'Vegetarian' ? stapleCatalog.find((item) => item.name === 'Paneer') : stapleCatalog.find((item) => item.name === 'Chicken breast');
  const vegetables = stapleCatalog.find((item) => item.name === 'Mixed vegetables');
  const rice = stapleCatalog.find((item) => item.name === 'Rice');

  const cart = [...selected];
  if (lowered.includes('dinner') || lowered.includes('meal') || lowEffort) {
    [dinnerBase, vegetables, rice].forEach((item) => {
      if (item && !cart.some((cartItem) => cartItem.name === item.name)) cart.push(item);
    });
  }

  const scaledCart = cart.map((item) => {
    const multiplier = household >= 3 && ['Milk', 'Bananas', 'Eggs', 'Curd'].includes(item.name) ? 1.5 : 1;
    return {
      ...item,
      quantity: item.unit,
      estimatedPrice: Math.round(item.price * multiplier),
      mcpQuery: item.query,
    };
  });

  let total = scaledCart.reduce((sum, item) => sum + item.estimatedPrice, 0);
  let trimmed = [...scaledCart];
  while (total > budget && trimmed.length > 4) {
    const removableIndex = trimmed.findIndex((item) => ['Brown bread', 'Mixed vegetables', 'Rice'].includes(item.name));
    const index = removableIndex === -1 ? trimmed.length - 1 : removableIndex;
    trimmed.splice(index, 1);
    total = trimmed.reduce((sum, item) => sum + item.estimatedPrice, 0);
  }

  const swiggyFoodFallback = diet === 'Vegetarian'
    ? 'Paneer rice bowl or dal khichdi from a nearby high-rated restaurant.'
    : 'Grilled chicken bowl or egg rice bowl from a nearby high-rated restaurant.';

  return {
    prompt,
    summary: `Plan for ${days} day${days > 1 ? 's' : ''}, ${household} ${household > 1 ? 'people' : 'person'}, budget around ₹${budget}.`,
    budget,
    days,
    household,
    diet,
    path: lowEffort ? 'Instamart cart plus Swiggy Food fallback' : 'Instamart-first refill plan',
    confidence: total <= budget ? 0.91 : 0.78,
    total,
    cart: trimmed,
    meals: [
      {
        title: 'Breakfast baseline',
        details: 'Oats, milk, bananas, curd, and eggs or paneer depending on preference.',
      },
      {
        title: 'Healthy dinner',
        details: diet === 'Vegetarian' ? 'Paneer veggie rice bowl.' : 'Chicken veggie rice bowl.',
      },
      {
        title: 'Fallback order',
        details: swiggyFoodFallback,
      },
    ],
    reasoning: [
      'Prioritizes repeat staples before discovery items.',
      'Keeps the cart explainable so the user can approve or edit quickly.',
      'Uses Instamart for pantry gaps and keeps Food as a low-effort fallback.',
      'Requires final user confirmation before any checkout action.',
    ],
    mcpFlow: [
      { tool: 'get_addresses', arguments: {} },
      { tool: 'search_products', arguments: { addressId: '<selectedAddressId>', query: '<each cart item query>' } },
      { tool: 'update_cart', arguments: { selectedAddressId: '<selectedAddressId>', items: [{ spinId: '<variant spinId>', quantity: 1 }] } },
      { tool: 'get_cart', arguments: {} },
      { tool: 'checkout', arguments: { paymentMethod: '<user selected payment method from get_cart>' } },
    ],
  };
}
