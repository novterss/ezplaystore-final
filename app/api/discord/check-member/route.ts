import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { handler } from '../../auth/[...nextauth]/route'; // Adjust import path to where handler is defined

const GUILD_ID = '1452701844366168126'; // EzPlay Store Thailand

export async function GET() {
    // 1. Get Session using the same config
    // Note: We might need to export authOptions if handler doesn't work directly here depending on NextAuth version conventions
    // But strictly, we can just use the token from the request header if we passed it, or get session.
    // Actually, getServerSession requires authOptions. The 'handler' in route.ts is the result of NextAuth(...).
    // We might encounter an issue importing 'handler' if it's not the authOptions object.
    // Let's assume for now we can get the session or we need to pass the access token from client.
    // passing access token from client is easier and stateless for this check.

    return NextResponse.json({ error: 'Use POST with accessToken' }, { status: 405 });
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { accessToken } = body;

        if (!accessToken) {
            return NextResponse.json({ isMember: false, error: 'No access token' }, { status: 401 });
        }

        // 2. Call Discord API
        const response = await fetch('https://discord.com/api/users/@me/guilds', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            console.error('Discord API Error:', await response.text());
            return NextResponse.json({ isMember: false, error: 'Failed to fetch guilds' }, { status: 500 });
        }

        const guilds = await response.json();
        const isMember = guilds.some((g: any) => g.id === GUILD_ID);

        return NextResponse.json({ isMember });
    } catch (error) {
        console.error('Check Member Error:', error);
        return NextResponse.json({ isMember: false }, { status: 500 });
    }
}
