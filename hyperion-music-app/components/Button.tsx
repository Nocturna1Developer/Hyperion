/* 
Button.tsx:

- This script defines a reusable Button component that leverages the 'forwardRef' function from React to provide more control over the button in the parent component.
- It uses tailwind-merge to combine default styling classes with any additional classes that are passed in through the 'className' prop.
- The button can be disabled through the 'disabled' prop and its type can be defined with the 'type' prop.

Details:

- It extends React.ButtonHTMLAttributes<HTMLButtonElement> to include all native button properties.
- The 'children' prop is used to specify the button content.
- A 'ref' is created to allow for additional functionality such as focusing or scrolling to the button.
- The button has default styles which can be extended with the 'className' prop.
- It has specific styling changes when the button is disabled.
- The button's type defaults to 'button' but can be customized via the 'type' prop.
*/

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type = 'button', // Default button type is 'button', can be overridden
    ...props
}, ref) => {
    // Button component returns a styled button element. The style is a merge of default styles and additional styles from 'className' prop
    return (
        <button
            type={type}
            className={twMerge(
                // Default button styles
                `
                w-full 
                rounded-full 
                bg-green-500
                border
                border-transparent
                px-3 
                py-3 
                disabled:cursor-not-allowed 
                disabled:opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition
                `,
                // If the button is disabled, change the opacity and cursor styles
                disabled && 'opacity-75 cursor-not-allowed',
                // Additional classes passed through className prop
                className
            )}
            disabled={disabled} // Button can be disabled via 'disabled' prop
            ref={ref} // Forward the ref to the parent component
            {...props} // Spread additional props on the button
        >
            {children} // Render the button content
        </button>
    );
});

Button.displayName = "Button";

export default Button;
