"use client";
import { supabaseClient } from "@/lib/supabase";
import { View } from "@/types/data";
import { useState } from "react";

export default function useViews() {
    const [views, setViews] = useState<{[key: number]: {
        id: number;
        created_at: string;
    }}>();

    const getViews = async () => {
        try {
            const { data, error } = await supabaseClient
                .from("views")
                .select("*");

            if (data) {
                setViews(data as View[]);
            }

            if (error) {
                console.log(`[useViews] ERROR: ${error.message}`);
            }
        } catch (e) {
            console.log(`[useViews] ERROR: ${e}`);
        }
    }

    const newView = async () => {
        const { data, error } = await supabaseClient.from("views").insert({}).select().single();

        setViews((prev) => ({...prev, data}));

        if (error) {
            console.log(`[newView] ERROR: ${error.message}`);
        }
    }

    return {
        views,
        getViews,
        newView,
    }
}