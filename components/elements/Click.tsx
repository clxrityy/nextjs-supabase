"use client";

import { ICONS } from "@/config";
import useClicks from "@/hooks/useClicks";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";


export default function Click() {

    const { newClick, getClicks, clicks } = useClicks();
    const [clicked, setClicked] = useState<boolean>(false);

    useEffect(() => {
        const channel = supabase.channel("realtime clicks").on("postgres_changes", {
            event: "INSERT",
            schema: "public",
            table: "clicks"
        }, (payload) => {
            console.log(payload);
        }).subscribe();

        async function fetchClicks() {
            await getClicks();
        }

        fetchClicks();

        return () => {
            channel.unsubscribe();
        }

    }, [clicks, getClicks, clicked]);

    const handleClick = async () => {
        await newClick();
        setClicked(true);
        setInterval(() => {
            setClicked(false);
        }, 500);
    }

    const array = Object.values(clicks || {});

    return (
        <div className="flex flex-row gap-6 md:gap-7 lg:gap-8 items-center justify-center">
            <button onClick={handleClick} className="text-3xl md:text-4xl lg:text-5xl bg-blue-500 px-5 py-3 rounded-lg text-white hover:bg-blue-600 focus:ring focus:ring-offset-2 transition-all duration-100 ease-in focus:bg-blue-700">
                <ICONS.click />
            </button>
            <div>
                <p className={`text-xl md:text-2xl lg:text-3xl flex flex-row gap-2 items-center text-center`}>
                    Clicks: <span className={`${clicked ? "text-green-500 font-bold" : "text-black font-semibold"} font-mono`}>{clicks ? array.length : <ICONS.loading className="animate-spin text-gray-600" />}</span>
                </p>
            </div>
        </div>
    )
}