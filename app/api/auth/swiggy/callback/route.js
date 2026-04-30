import { NextResponse } from 'next/server';
import { exchangeCodeForToken, getClientId, getRedirectUri } from '../../../../../lib/swiggy';

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const storedState = request.cookies.get('swiggy_oauth_state')?.value;
  const verifier = request.cookies.get('swiggy_pkce_verifier')?.value;
  const clientId = getClientId();
  const redirectUri = getRedirectUri(url.origin);

  if (!code || !state || !storedState || state !== storedState || !verifier || !clientId) {
    return NextResponse.redirect(new URL('/?swiggy=auth-failed', request.url));
  }

  try {
    const token = await exchangeCodeForToken({ code, verifier, redirectUri, clientId });
    const response = NextResponse.redirect(new URL('/?swiggy=connected', request.url));
    response.cookies.set('swiggy_access_token', token.access_token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      maxAge: Number(token.expires_in || 432000),
      path: '/',
    });
    response.cookies.delete('swiggy_pkce_verifier');
    response.cookies.delete('swiggy_oauth_state');
    return response;
  } catch (error) {
    return NextResponse.redirect(new URL(`/?swiggy=${encodeURIComponent(error.message)}`, request.url));
  }
}
