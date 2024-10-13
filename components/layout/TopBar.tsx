"use client";

import Link from "next/link";
import Logo from "../elements/Logo";
import { getSession } from "@/hooks/useSession";
import { ICONS } from "@/config";
import { createContext, useContext, useState } from "react";
import { useModal } from "@/hooks/useModal";

export default function TopBar() {

    const { session } = getSession();

    return (
        <div className="w-screen h-12 fixed drop-shadow-md shadow-md flex items-center px-4 py-3">
            <Link href="/" className="hover:scale-110 transition-all duration-75 ease-in shadow-xl rounded-full">
                <Logo width={35} height={35} />
            </Link>
            {session ? (
                <div className="w-full flex justify-end items-center">
                    <AuthBarToggle />
                </div>
            ) : (
                <div className="w-full flex justify-end items-center">
                    <button className="hover:scale-110 transition-all duration-75 ease-in text-blue-600/75 hover:text-blue-600">
                        <Link href="/login" className="">
                            <ICONS.login />
                        </Link>
                    </button>
                </div>
            )}
        </div>
    )
}

const AuthBarContext = createContext({
    isOpen: false,
    toggleAuthBar: () => { }
});

function AuthBarToggle() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <AuthBarContext.Provider value={{ isOpen, toggleAuthBar: () => setIsOpen((prev) => !prev) }}>
            <AuthBar />
        </AuthBarContext.Provider>
    )
}

function AuthBar() {
    const { isOpen, toggleAuthBar } = useContext(AuthBarContext);

    const { onOpen } = useModal();

    function handleClick() {
        toggleAuthBar();
        onOpen("auth");
    }

    return (
        <UserButton isOpen={isOpen} handleClick={handleClick} />
    )
}

interface UserButtonProps {
    isOpen: boolean;
    handleClick: () => void;
}

function UserButton({ isOpen, handleClick }: UserButtonProps) {
    let className: string = "flex items-center justify-center w-10 h-10 rounded-full focus:ring ring-blue-500/75 focus:ring-offset-2 transition-all duration-75 ease-in text-blue-600 hover:border border-dashed border-blue-600";

    switch (isOpen) {
        case true:
            className += " opacity-75";
            break;
        case false:
            className += " hover:scale-110";
            break;
    }

    return (
        <button className={className} onClick={handleClick}>
            <ICONS.profile size={20} />
        </button>
    )
}