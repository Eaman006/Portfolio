import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSessionToken, SESSION_COOKIE_NAME, getAdminEmail } from '@/lib/auth';

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    const isValid = validateSessionToken(token);

    if (!isValid) {
      return NextResponse.json(
        { authenticated: false, error: 'Session invalid or expired' },
        { status: 401 }
      );
    }

    return NextResponse.json({
      authenticated: true,
      user: {
        email: getAdminEmail(),
        role: 'Admin',
      },
    });
  } catch (error) {
    console.error('Verify API error:', error);
    return NextResponse.json(
      { authenticated: false, error: 'Verification failed' },
      { status: 500 }
    );
  }
}
