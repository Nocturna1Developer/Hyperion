/*
Header.tsx:

- The Header component renders the application's main header.
- It includes navigation buttons (back, forward, home, search), and buttons to handle user authentication.
- The header also has the functionality to logout the user.

Details:

- It receives 'children' and 'className' as props.
- It uses various hooks like usePlayer(), useRouter(), useAuthModal() and useUser() to get the current user, player state, routing methods, and to handle opening the auth modal.
- It defines a function 'handleLogout()' to handle user logout.
- The component renders buttons for backward and forward navigation, home and search navigation for smaller screens, and authentication buttons (based on the current user's state).

*/

"use client";

import { twMerge } from "tailwind-merge";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useRouter } from "next/navigation";
import { FaUserAlt } from "react-icons/fa";
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { toast } from "react-hot-toast";
import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";
import usePlayer from "@/hooks/usePlayer";

import Button from "./Button";

interface HeaderProps {
    children: React.ReactNode;
    className?: string;
}

const Header: React.FC<HeaderProps> = ({
    children,
    className,
}) => {
    const player = usePlayer(); // Get current player state
    const router = useRouter(); // Get routing methods
    const authModal = useAuthModal(); // Hook to handle opening the auth modal

    const supabaseClient = useSupabaseClient();
    const { user } = useUser(); // Get current user

    // Function to handle user logout
    const handleLogout = async () => {
        const { error } = await supabaseClient.auth.signOut();
        player.reset();
        router.refresh();

        if (error) {
            toast.error(error.message);
        }
    }

    // Render header
    return (
        <div
            className={twMerge(`
        h-fit 
        bg-gradient-to-b 
        from-emerald-800 
        p-6
        `,
                className
            )}>
            <div className="w-full mb-4 flex items-center justify-between">
                <div className="hidden md:flex gap-x-2 items-center">
                    <button
                        onClick={() => router.back()}
                        className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretLeft className="text-white" size={35} />
                    </button>
                    <button
                        onClick={() => router.forward()}
                        className="
              rounded-full 
              bg-black 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <RxCaretRight className="text-white" size={35} />
                    </button>
                </div>
                <div className="flex md:hidden gap-x-2 items-center">
                    <button
                        onClick={() => router.push('/')}
                        className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <HiHome className="text-black" size={20} />
                    </button>
                    <button
                        onClick={() => router.push('/search')}
                        className="
              rounded-full 
              p-2 
              bg-white 
              flex 
              items-center 
              justify-center 
              cursor-pointer 
              hover:opacity-75 
              transition
            "
                    >
                        <BiSearch className="text-black" size={20} />
                    </button>
                </div>
                <div className="flex justify-between items-center gap-x-4">
                    {user ? (
                        <div className="flex gap-x-4 items-center">
                            <Button
                                onClick={handleLogout}
                                className="bg-white px-6 py-2"
                            >
                                Logout
                            </Button>
                            <Button
                                onClick={() => router.push('/account')}
                                className="bg-white"
                            >
                                <FaUserAlt />
                            </Button>
                        </div>
                    ) : (
                        <>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="
                    bg-transparent 
                    text-neutral-300 
                    font-medium
                  "
                                >
                                    Sign up
                                </Button>
                            </div>
                            <div>
                                <Button
                                    onClick={authModal.onOpen}
                                    className="bg-white px-6 py-2"
                                >
                                    Log in
                                </Button>
                            </div>
                        </>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
}

export default Header;
