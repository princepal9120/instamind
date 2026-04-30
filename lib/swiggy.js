import crypto from 'crypto';

export const SWIGGY_BASE_URL = 'https://mcp.swiggy.com';
export const INSTAMART_ENDPOINT = `${SWIGGY_BASE_URL}/im`;

export function getClientId() {
  return process.env.SWIGGY_CLIENT_ID || process.env.NEXT_PUBLIC_SWIGGY_CLIENT_ID || '';
}

export function getRedirectUri(origin) {
  return process.env.SWIGGY_REDIRECT_URI || `${origin}/api/auth/swiggy/callback`;
}

export function createPkcePair() {
  const verifier = crypto.randomBytes(32).toString('base64url');
  const challenge = crypto.createHash('sha256').update(verifier).digest('base64url');
  return { verifier, challenge };
}

export async function exchangeCodeForToken({ code, verifier, redirectUri, clientId }) {
  const response = await fetch(`${SWIGGY_BASE_URL}/auth/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      grant_type: 'authorization_code',
      code,
      code_verifier: verifier,
      client_id: clientId,
      redirect_uri: redirectUri,
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || data?.message || 'Swiggy token exchange failed';
    const error = new Error(message);
    error.status = response.status;
    throw error;
  }
  return data;
}

export async function callInstamartTool({ token, name, arguments: args = {} }) {
  if (!token) {
    const error = new Error('Missing Swiggy access token. Connect Swiggy or pass a Bearer token.');
    error.status = 401;
    throw error;
  }

  const response = await fetch(INSTAMART_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      params: {
        name,
        arguments: args,
      },
      id: Date.now(),
    }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message = data?.error?.message || data?.message || `Swiggy MCP call failed with ${response.status}`;
    const error = new Error(message);
    error.status = response.status;
    error.payload = data;
    throw error;
  }

  return data?.result || data;
}

export function getTokenFromRequest(request) {
  const auth = request.headers.get('authorization') || '';
  if (auth.toLowerCase().startsWith('bearer ')) return auth.slice(7).trim();
  return request.cookies.get('swiggy_access_token')?.value || '';
}
