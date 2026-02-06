import { getServerSession } from "next-auth";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import rateLimit from "@/lib/rate-limit";

const limiter = rateLimit({
    interval: 60 * 1000, // 60 seconds
    uniqueTokenPerInterval: 500, // Max 500 users per second
});

export async function POST(req: NextRequest) {
    const session = await getServerSession();

    if (!session || !session.user?.email || !(session.user as any).isMember) {
        return NextResponse.json({ error: "Unauthorized or Not a Member" }, { status: 403 });
    }

    try {
        await limiter.check(5, "CACHE_TOKEN"); // 5 requests per minute
    } catch {
        return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
    }

    try {
        const { fileName } = await req.json(); // Expect fileName in body

        // 1. Log the download (History)
        // Note: 'download_logs' table must exist!
        await supabase.from('download_logs').insert({
            user_email: session.user.email,
            file_name: fileName || 'Unknown File',
            downloaded_at: new Date().toISOString()
        });

        // 2. Get current count
        const { data: user } = await supabase
            .from('users')
            .select('downloads')
            .eq('email', session.user.email)
            .single();

        const currentDownloads = user?.downloads || 0;

        // 3. Increment Total
        const { error } = await supabase
            .from('users')
            .update({ downloads: currentDownloads + 1 })
            .eq('email', session.user.email);

        if (error) throw error;

        return NextResponse.json({ success: true, newCount: currentDownloads + 1 });
    } catch (error) {
        console.error("Error incrementing download:", error);
        return NextResponse.json({ error: "Failed to update - Did you run the SQL?" }, { status: 500 });
    }
}
