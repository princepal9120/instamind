import { NextResponse } from 'next/server';
import { callInstamartTool, getTokenFromRequest } from '../../../../lib/swiggy';

const allowedTools = new Set([
  'get_addresses',
  'create_address',
  'delete_address',
  'search_products',
  'your_go_to_items',
  'clear_cart',
  'get_cart',
  'update_cart',
  'checkout',
  'get_order_details',
  'get_orders',
  'track_order',
  'report_error',
]);

const mutatingTools = new Set(['create_address', 'delete_address', 'clear_cart', 'update_cart', 'checkout']);

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const name = body.name;

  if (!allowedTools.has(name)) {
    return NextResponse.json({ ok: false, error: 'Unsupported Instamart tool.' }, { status: 400 });
  }

  if (mutatingTools.has(name) && body.confirm !== true) {
    return NextResponse.json(
      { ok: false, error: 'Mutating Swiggy actions require confirm: true.' },
      { status: 409 },
    );
  }

  try {
    const token = getTokenFromRequest(request);
    const result = await callInstamartTool({ token, name, arguments: body.arguments || {} });
    return NextResponse.json({ ok: true, result });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: error.message, payload: error.payload || null },
      { status: error.status || 500 },
    );
  }
}
