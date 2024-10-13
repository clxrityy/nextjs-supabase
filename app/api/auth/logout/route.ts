import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = new URL(req.url);

    const cookieStore = cookies();

    const supabase = createRouteHandlerClient({
        cookies: () => cookieStore
    });

    try {
        await supabase.auth.signOut();

        return NextResponse.redirect(url.origin, {
            status: 301
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
        throw new Error(e);
    }
}