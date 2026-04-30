import { NextResponse } from 'next/server';
import { createPkcePair, getClientId, getRedirectUri, SWIGGY_BASE_URL } from '../../../../../lib/swiggy';

export async function GET(request) {
  const clientId = getClientId();
  if (!clientId) {
    return NextResponse.redirect(new URL('/?swiggy=missing-client-id', request.url));
  }

  const { verifier, challenge } = createPkcePair();
  const state = crypto.randomUUID();
  const origin = new URL(request.url).origin;
  const redirectUri = getRedirectUri(origin);

  const authorizeUrl = new URL('/auth/authorize', SWIGGY_BASE_URL);
  authorizeUrl.searchParams.set('response_type', 'code');
  authorizeUrl.searchParams.set('client_id', clientId);
  authorizeUrl.searchParams.set('redirect_uri', redirectUri);
  authorizeUrl.searchParams.set('code_challenge', challenge);
  authorizeUrl.searchParams.set('code_challenge_method', 'S256');
  authorizeUrl.searchParams.set('state', state);
  authorizeUrl.searchParams.set('scope', 'mcp:tools');

  const response = NextResponse.redirect(authorizeUrl);
  response.cookies.set('swiggy_pkce_verifier', verifier, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60,
    path: '/',
  });
  response.cookies.set('swiggy_oauth_state', state, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 10 * 60,
    path: '/',
  });
  return response;
}
