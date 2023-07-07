/*
ListItem.tsx:

- The ListItem component is a reusable button that displays a list item with an image, name, and navigational capability.
- It leverages the 'useRouter' hook from Next.js for navigation and the 'useAuthModal' and 'useUser' hooks for user authentication.
- It takes three props: 'image' for the list item's image, 'name' for the list item's name, and 'href' for the navigation path.

Details:

- The component defines a function 'onClick' that checks if a user is logged in. If not, it triggers the authentication modal. If a user is logged in, it navigates to the provided 'href'.
- It returns a button that contains an Image component for the list item's image, a paragraph for the list item's name, and a clickable icon wrapped within a div.
*/

"use client";

import Image from "next/image";
import { useRouter } from "next/router";
import { FaPlay } from "react-icons/fa";

import useAuthModal from "@/hooks/useAuthModal";
import { useUser } from "@/hooks/useUser";

interface ListItemProps {
    image: string;
    name: string;
    href: string;
}

const ListItem: React.FC<ListItemProps> = ({ image, name, href }) => {
    const router = useRouter(); // Provides navigation functionality
    const authModal = useAuthModal(); // Provides access to authentication modal control
    const { user } = useUser(); // Current user state

    // Defines what happens when the ListItem is clicked
    const onClick = () => {
        if (!user) {
            return authModal.onOpen(); // Triggers the authentication modal if no user is logged in
        }
        router.push(href); // Navigates to the 'href' if a user is logged in
    };

    // ListItem return structure
    return (
        <button
            onClick={onClick}
            className="relative group flex items-center rounded-md overflow-hidden gap-x-4 bg-neutral-100/10 cursor-pointer hover:bg-neutral-100/20 transition pr-4"
        >
            <div className="relative min-h-[64px] min-w-[64px]">
                {/* ListItem image */}
                <Image
                    className="object-cover"
                    src={image}
                    layout="fill"
                    alt="Image"
                />
            </div>
            {/* ListItem name */}
            <p className="font-medium truncate py-5">{name}</p>
            <div
                className="absolute transition opacity-0 rounded-full flex items-center justify-center bg-green-500 p-4 drop-shadow-md right-5 group-hover:opacity-100 hover:scale-110"
            >
                {/* Play button */}
                <FaPlay className="text-black" />
            </div>
        </button>
    );
}

export default ListItem;