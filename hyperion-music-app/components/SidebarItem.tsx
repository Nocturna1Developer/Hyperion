/*
SidebarItem.tsx:

- SidebarItem is a component that represents an item in the Sidebar navigation. 
- This component uses the 'next/link' package for navigation and 'react-icons' for displaying the icons.

Details:

- It takes four props: 'icon' which is a React Icon, 'label' which is the text displayed next to the icon, 'active' which is a boolean representing whether this item is the currently active page, and 'href' which is the path to the page the item represents.
- The Link component from 'next/link' is used to handle navigation.
- The 'IconType' type from 'react-icons' is used to type the 'icon' prop.
- The 'twMerge' function is used to conditionally apply the 'text-white' class if the item is active.

*/

import Link from 'next/link';
import { IconType } from 'react-icons';
import { twMerge } from 'tailwind-merge';

interface SidebarItemProps {
    icon: IconType; // React icon component
    label: string; // Text displayed next to the icon
    active?: boolean; // Whether this item is the currently active page
    href: string; // Path to the page the item represents
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    icon: Icon,
    label,
    active,
    href
}) => {
    // Return structure for Sidebar Item
    return (
        <Link
            href={href}
            // Apply 'text-white' class if the item is active
            className={twMerge(`
            flex 
            flex-row 
            h-auto 
            items-center 
            w-full 
            gap-x-4 
            text-md 
            font-medium
            cursor-pointer
            hover:text-white
            transition
            text-neutral-400
            py-1`,
                active && "text-white"
            )
            }
        >
            <Icon size={26} /> {/* Icon */}
            <p className="truncate w-100">{label}</p> {/* Text label */}
        </Link>
    );
}

export default SidebarItem;
