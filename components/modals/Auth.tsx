"use client";

import { getSession } from "@/hooks/useSession";
import { useModal } from "@/hooks/useModal";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog";
import { ICONS } from "@/config";
import { Button } from "../ui/button";
import { supabaseClient } from "@/lib/supabase";

export default function AuthModal() {
    const { isOpen, onClose, type } = useModal();

    const isOpenAuth = isOpen && type === "auth";

    const { session } = getSession();

    if (!session) return null;
    if (!isOpenAuth) return null;

    const logout = async () => {
        try {
            const { error } = await supabaseClient.auth.signOut();
            if (error) {
                console.log(`Error: ${error.message}`);
                throw new Error(error.message);
            }
        } catch (e) {
            console.log(`Error caught logging out: ${e}`);
        }
    }

    return (
        <Dialog open={isOpenAuth} onOpenChange={onClose}>
            <DialogContent>
                <DialogHeader className="gap-4">
                    <DialogTitle className="flex flex-row gap-2 items-center text-center">
                        {session.user.email}
                    </DialogTitle>
                    <DialogDescription className="text-xs sm:text-sm">
                        Manage your account settings
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col items-center justify-center gap-4">
                    <form action={"/api/auth/logout"} method="post">
                        <Button onClick={logout} className="flex flex-row gap-1 items-center text-center font-bold">
                            <ICONS.logout /> Logout
                        </Button>
                    </form>
                </div>
            </DialogContent>
        </Dialog>
    )
}