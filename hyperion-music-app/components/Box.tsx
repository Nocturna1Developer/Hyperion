/* 
Box.tsx:

- The Box component is a reusable styled 'div' component which includes built-in styles using Tailwind CSS.
- It uses the tailwind-merge package to handle the merging of classes provided through the 'className' prop with the default styles.

Details:

- It takes two props: 'children' to render child components and 'className' to apply additional CSS classes to the component.
- The component has default styles of a rounded edge, fitting height, full width, and a dark background using Tailwind CSS classes.
- The additional classes provided via the 'className' prop are merged with the default styles using 'twMerge'.
*/

import { twMerge } from "tailwind-merge";

interface BoxProps {
    children: React.ReactNode;
    className?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    // Box return structure
    return (
        <div
            // Merge default styles with any additional classes provided
            className={twMerge(
                `
                bg-neutral-900 
                rounded-lg 
                h-fit 
                w-full
                `,
                className
            )}
        >
            {children}
        </div>
    );
}

export default Box;
