import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import Footer from "@/components/layout/Footer";
import { Skeleton } from "@/components/ui/skeleton";

const ModalProvider = dynamic(() => import("@/components/providers/Modal"), {
  ssr: false,
});

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Nextjs + Supabase Template",
  description: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="max-h-screen h-screen relative w-full">
          <div className="relative w-screen h-screen">
            <TopBar />
            {children}
            <Suspense fallback={<Skeleton className="absolute bottom-0 w-screen h-12" />}>
              <Footer />
            </Suspense>
            <Suspense fallback={null}>
              <ModalProvider />
            </Suspense>
          </div>
        </div>
      </body>
    </html>
  );
}
