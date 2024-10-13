"use client";
import { supabaseClient } from "@/lib/supabase";
import { IClick } from "@/types/data";
import { useState } from "react";

export default function useClicks() {

    const [clicks, setClicks] = useState<{[key: number]: {
        id: number;
        created_at: string;
        userId: string;
    }}>();

    const getClicks = async () => {
        try {
            const {data, error} = await supabaseClient
                .from("clicks")
                .select("*");

            if (data) {
                setClicks(data as IClick[]);
            }

            if (error) {
                console.log(`[useClicks] ERROR: ${error.message}`);
            }

        } catch (e) {
            console.log(`[useClicks] ERROR: ${e}`);
        }
    }

    const newClick = async () => {
        const { data, error } = await supabaseClient.from("clicks").insert({
            userId: (await supabaseClient.auth.getUser()).data.user?.id
        }).select().single();

        setClicks((prev) => ({...prev, data}));

        if (error) {
            console.log(`[newClick] ERROR: ${error.message}`);
        }
    }

    return {
        clicks,
        getClicks,
        newClick,
    }
}