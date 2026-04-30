import { NextResponse } from 'next/server';
import { buildPlan } from '../../../lib/planner';

export async function POST(request) {
  const body = await request.json().catch(() => ({}));
  const plan = buildPlan(body.prompt, body.profile || {});
  return NextResponse.json({ ok: true, plan });
}

export async function GET() {
  const plan = buildPlan();
  return NextResponse.json({ ok: true, plan });
}
