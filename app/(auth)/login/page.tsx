/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { supabaseClient } from "@/lib/supabase";
import { useState } from "react";
import "@/app/(auth)/auth.css";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

export default function Page() {

    const [data, setData] = useState<{
        email: string;
        password: string;
    }>();

    const login = async () => {
        if (data) {
            try {
                const { data: authData, error } = await supabaseClient.auth.signInWithPassword({
                    email: data.email,
                    password: data.password
                });

                if (error) {
                    console.log(`Error: ${error.message}`);
                }

            } catch (e) {
                console.log(`Error: ${e}`);
            } finally {
                redirect('/');
            }
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setData((prev: any) => ({
            ...prev,
            [name]: value
        }))
    };

    const signUp = async () => {
        if (data) {
            try {
                const { data: authData, error } = await supabaseClient.auth.signUp({
                    email: data.email,
                    password: data.password
                });

                if (error) {
                    console.log(`Error: ${error.message}`);
                }

            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }
    }

    return (
        <div className="login">
            <form action={"/api/auth/login"} method="post">
                <div>
                    <input type="text" name="email" placeholder="youremail@address.com" onChange={handleChange} />
                </div>
                <div>
                    <input type="password" name="password" placeholder="Enter your password..." onChange={handleChange} />
                </div>
                <Button className="font-semibold" onClick={login}>Login</Button>
            </form>
            <form className="flex flex-col items-center justify-center gap-2" action={"/api/auth/sign-up"} method="post">
                <p className="text-sm lg:text-base font-bold text-gray-700">
                    Don&#39;t have an account?
                </p>
                <Button onClick={signUp} className="font-semibold" variant={"secondary"}>
                    Sign up
                </Button>
            </form>
        </div>
    );
}