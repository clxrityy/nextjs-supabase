import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies as cookie } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const url = new URL(req.url);
    const cookieStore = cookie();

    const formData = await req.formData();

    const email = String(formData.get('email'));
    const password = String(formData.get('password'));

    const supabase = createRouteHandlerClient({
        cookies: () =>  cookieStore
    });

    try {
        await supabase.auth.signUp({
            email, password,
            options: {
                emailRedirectTo: `${url.origin}/api/auth/callback`
            }
        });
    } catch (e) {
        console.log(`Error: ${e}`);
    }

    return NextResponse.redirect(url.origin, {
        status: 301
    })
}