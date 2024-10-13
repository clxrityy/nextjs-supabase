/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { ICONS } from "@/config";
import useViews from "@/hooks/useViews";
import { useEffect } from "react";


export default function Footer() {
    const { getViews, views, newView } = useViews();

    useEffect(() => {
        getViews().then(() => {
            newView();
        })
    }, []);

    const viewCount = views ? Object.keys(views).length : (
        <ICONS.loading className="animate-spin" />
    );

    return (
        <footer className="fixed bottom-0 bg-gray-100 w-screen">
            <div className="px-4 py-1 flex w-full justify-end items-center flex-row gap-5 font-light">
                <p className="flex flex-row gap-1 items-center text-center font-mono tracking-widest text-sm text-blue-900/75"><ICONS.views size={16} /> {viewCount}</p>
            </div>
        </footer>
    );
}