import { NextResponse } from 'next/server';

export async function POST(request) {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete('swiggy_access_token');
  return response;
}
