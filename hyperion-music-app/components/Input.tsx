/**
 * Input.tsx:
 *
 * This Input component is a wrapper around the native HTML input element with added styles.
 * 
 * Features:
 * - Uses the 'tailwind-merge' package to dynamically apply Tailwind CSS classes.
 * - The component is wrapped with 'forwardRef' to allow ref forwarding.
 * - Supports all native input element attributes through 'InputHTMLAttributes'.
 * - Applies a set of default styles and can receive additional custom classes through the 'className' prop.
 * - Handles disabled state styling.
 * 
 * The component expects the following props:
 * 1. 'className': Custom classes passed as a string (optional).
 * 2. 'type': The type of the input (text, number, file, etc).
 * 3. 'disabled': A boolean indicating whether the input is disabled.
 * 4. Other native input element attributes like 'placeholder', 'id', etc.
 */


// Import necessary modules
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge"

// Define a TypeScript interface for the Input component props
export interface InputProps
    extends React.InputHTMLAttributes<HTMLInputElement> { }

// Define the Input component with forwardRef to allow ref forwarding
const Input = forwardRef<HTMLInputElement, InputProps>(({
    // Destructure the necessary props
    // className: Custom classes passed as a string (optional)
    // type: The type of the input (text, number, file, etc)
    // disabled: A boolean indicating whether the input is disabled
    className,
    type,
    disabled,
    ...props
}, ref) => {
    // Return the Input component
    return (
        // Use the native HTML input element
        <input
            // Specify the type of the input
            type={type}
            // Apply dynamic styles using tailwind-merge
            // A set of default styles are applied, custom classes are added if passed
            // If the input is disabled, an opacity style is applied
            className={twMerge(
                `
                flex 
                w-full 
                rounded-md 
                bg-neutral-700
                border
                border-transparent
                px-3 
                py-3 
                text-sm 
                file:border-0 
                file:bg-transparent 
                file:text-sm 
                file:font-medium 
                placeholder:text-neutral-400 
                disabled:cursor-not-allowed 
                disabled:opacity-50
                focus:outline-none
              `,
                disabled && 'opacity-75',
                className
            )}
            // Apply the disabled attribute if passed
            disabled={disabled}
            // Forward the ref to the parent component
            ref={ref}
            // Spread any other native input element attributes
            {...props}
        />
    )
});

// Set the display name for debugging purposes
Input.displayName = "Input";

// Export the Input component
export default Input;



