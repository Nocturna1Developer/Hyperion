/* 
Sidebar.tsx:

- The Sidebar component renders the sidebar of the app and handles routing to different pages (Home and Search).
- It also displays the list of songs in the user's library using the Library component.
- The component uses the Tailwind CSS utility for styles and the `usePathname` hook from Next.js to get the current path name for navigation.
- It uses the `usePlayer` hook to access the activeId state of the Player.
- A `useMemo` hook is used to optimize the creation of the `routes` array, which is dependent on the `pathname`.

Details:

- It takes two props: `children` for rendering child components and `songs` which is an array of Song objects.
- The component contains two main sections: The sidebar and the main content area. The sidebar includes navigational items and the library of songs. The main content area is where child components are rendered.
- The `routes` array defines the configuration for the sidebar navigation items, including their icons, labels, active state, and href values.
- A `twMerge` function is used to conditionally change the height of the component based on the `player.activeId` state.
*/

"use client";

import { HiHome } from "react-icons/hi";
import { BiSearch } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { usePathname } from "next/navigation";

import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

import SidebarItem from "./SidebarItem";
import Box from "./Box";
import Library from "./Library";
import { useMemo } from "react";

interface SidebarProps {
    children: React.ReactNode;
    songs: Song[];
}

const Sidebar = ({ children, songs }: SidebarProps) => {
    const pathname = usePathname(); // Get the current pathname
    const player = usePlayer(); // Get the player context

    // Define the configuration for the sidebar navigation items
    const routes = useMemo(() => [
        {
            icon: HiHome,
            label: 'Home',
            active: pathname !== '/search',
            href: '/'
        },
        {
            icon: BiSearch,
            label: 'Search',
            href: '/search',
            active: pathname === '/search'
        },
    ], [pathname]);

    return (
        <div
            // Apply different styles based on the active state of the player
            className={twMerge(`flex h-full`, player.activeId && 'h-[calc(100%-80px)]')}
        >
            {/* The sidebar */}
            <div className="hidden md:flex flex-col gap-y-2 bg-black h-full w-[300px] p-2">
                <Box>
                    <div className="flex flex-col gap-y-4 px-5 py-4">
                        {/* Sidebar navigation items */}
                        {routes.map((item) => (
                            <SidebarItem key={item.label} {...item} />
                        ))}
                    </div>
                </Box>
                {/* User's library of songs */}
                <Box className="overflow-y-auto h-full">
                    <Library songs={songs} />
                </Box>
            </div>

            {/* The main content area */}
            <main className="h-full flex-1 overflow-y-auto py-2">
                {children}
            </main>
        </div>
    );
}

export default Sidebar;