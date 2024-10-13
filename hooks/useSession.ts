/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import { useEffect, useState } from "react";
import { supabaseClient } from "@/lib/supabase";
import { Session, User } from "@supabase/auth-helpers-nextjs";
import { AuthError } from "@supabase/supabase-js";

export function getSession() {

    const [session, setSession] = useState<Session>();
    const [error, setError] = useState<AuthError>();

    async function retreiveSession() {
        try {
            const { data, error } = await supabaseClient.auth.getSession();

            if (data.session) {
                setSession(data.session);
            }

            if (error) {
                setError(error);
            }
        } catch (e) {
            console.log(`[getSession] ERROR: ${e}`);
        }
    }

    useEffect(() => {
        retreiveSession();
    }, []);

    return {
        session,
        error
    };
}

export function refreshSession() {
    const [session, setSession] = useState<Session | null>();
    const [user, setUser] = useState<User | null>();
    const [error, setError] = useState<AuthError | null>();

    async function refresh() {
        try {
            const { data, error } = await supabaseClient.auth.refreshSession();

            if (data) {
                setSession(data.session);
                setUser(data.user);
            }

            if (error) {
                setError(error);
            }
        } catch (e) {
            console.log(`[refreshSession] ERROR: ${e}`);
        }
    }

    useEffect(() => {
        refresh();
    }, []);

    return {
        session,
        user,
        error
    };
}

export function setSession({ access_token, refresh_token }: { access_token: string, refresh_token: string }) {
    const [user, setUser] = useState<User | null>();
    const [error, setError] = useState<AuthError | null>();
    const [session, setSession] = useState<Session | null>();

    async function setSesh() {
        try {
            const { data, error } = await supabaseClient.auth.setSession({ access_token, refresh_token });

            if (data) {
                setSession(data.session);
                setUser(data.user);
            }

            if (error) {
                setError(error);
            }
        } catch (e) {
            console.log(`[setSession] ERROR: ${e}`);
        }
    }

    useEffect(() => {
        setSesh();
    }, []);

    return {
        session,
        user,
        error
    };
}