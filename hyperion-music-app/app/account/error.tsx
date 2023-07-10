/*
Error.tsx:

- This is a React Functional Component that displays an error message when something goes wrong in the application.
- The component uses a pre-defined 'Box' component to style and arrange the layout.

Details:

- The component does not accept any props.
- The 'Box' component is used to create a container for the error message with specific CSS classes for layout and style.
- Inside the 'Box' component, a 'div' is used to display the text message "Something went wrong.".
*/

"use client";

// Import Box component from the project
import Box from "@/components/Box";

// Define the Error component
const Error = () => {
    // Return a Box component with the error message
    return (
        <Box className="h-full flex items-center justify-center">
            <div className="text-neutral-400">
                Something went wrong.
            </div>
        </Box>
    );
}

export default Error; // Export the Error component
