import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { key } = await req.json();

  if (!key || key !== process.env.ADMIN_SECRET_KEY) {
    return NextResponse.json({ error: 'Invalid access key' }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set('admin_session', process.env.ADMIN_SECRET_KEY!, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24 * 7,
  });

  return response;
}
