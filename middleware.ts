import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    // Protection for /admin routes
    if (request.nextUrl.pathname.startsWith('/admin')) {
        // Check for NextAuth session cookie
        const sessionToken = request.cookies.get('next-auth.session-token')
            || request.cookies.get('__Secure-next-auth.session-token');

        // If user has a session cookie, allow them through
        // The actual admin check happens in the page component
        if (sessionToken) {
            return NextResponse.next();
        }

        // If no session, redirect to home (or could show login)
        return NextResponse.redirect(new URL('/', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
