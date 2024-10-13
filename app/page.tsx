import Click from "@/components/elements/Click";
import { Button } from "@/components/ui/button";
import { ICONS } from "@/config";
import Link from "next/link";
import { Suspense } from "react";

export const revalidate = 0;

export default async function Home() {

  return (
    <div className="w-screen h-screen items-center flex justify-center">
      <div className="flex flex-col items-center justify-center gap-14 container">
        <div className="flex flex-col items-center justify-center gap-8">
          <div className="flex flex-col items-center gap-4 justify-center text-center relative">
            <h2 className="flex flex-row gap-2 items-center text-center justify-center">
              <ICONS.nextjs size={55} className="text-black" /> + <ICONS.supabase size={50} className="text-[#6DCE94] bg-black rounded-full border border-white px-1 py-1" />
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">Next.js + Supabase</h1>
            <p className="font-semibold text-gray-700">
              Realtime updates & authentication template
            </p>
          </div>
          <Button className="gap-2 font-semibold">
            <Link href={"https://github.com/clxrityy/nextjs-supabase"}>
              <ICONS.github size={20} className="text-white" />
              View on GitHub
            </Link>
          </Button>
        </div>
        <Suspense fallback={<ICONS.loading size={50} className="animate-spin text-blue-500" />}>
          <Click />
        </Suspense>
      </div>
    </div>
  );
}
