"use client";

import { useEffect, useState } from "react";
import AuthModal from "../modals/Auth";

const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);

        return () => setIsMounted(false);
    }, []);

    if (!isMounted) return null;

    return (
        <>
        {/**
         * MODALS
         */}
         <AuthModal />
        </>
    )
}

export default ModalProvider;