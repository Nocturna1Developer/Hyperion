/*
Loading.tsx:

- This is a React Functional Component that displays a loading spinner while data is being fetched or a process is being completed.
- The component uses a pre-defined 'Box' component to style and arrange the layout and the 'BounceLoader' from 'react-spinners' to display the loading spinner.

Details:

- The component does not accept any props.
- The 'Box' component is used to create a container for the loading spinner with specific CSS classes for layout and style.
- Inside the 'Box' component, a 'BounceLoader' is used to display the loading spinner with specific color and size.
*/

"use client";

// Import Box component from the project and BounceLoader from react-spinners
import { BounceLoader } from "react-spinners";
import Box from "@/components/Box";

// Define the Loading component
const Loading = () => {
    // Return a Box component with the BounceLoader
    return (
        <Box className="h-full flex items-center justify-center">
            <BounceLoader color="#4B0082" size={40} />
        </Box>
    );
}

export default Loading; // Export the Loading component
