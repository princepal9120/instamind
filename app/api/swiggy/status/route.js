import { NextResponse } from 'next/server';
import { getClientId } from '../../../../lib/swiggy';

export async function GET(request) {
  const connected = Boolean(request.cookies.get('swiggy_access_token')?.value);
  return NextResponse.json({
    ok: true,
    connected,
    clientConfigured: Boolean(getClientId()),
    mode: connected ? 'live-mcp' : 'demo-planner',
  });
}
