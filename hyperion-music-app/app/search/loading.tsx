/**
 * Loading.tsx
 *
 * This script exports a functional component named 'Loading' that displays a loading spinner.
 * It uses the 'BounceLoader' component from 'react-spinners' library to display a bouncing loader spinner.
 * The loader is enclosed within a 'Box' component, which is a styled div, that is full height and centers its content.
 *
 * Details:
 *
 * - The 'BounceLoader' component is used to create a bouncing loader spinner.
 * - The 'Box' component is used to create a container that centers its content.
 * - The 'BounceLoader' component receives two props: 'color' and 'size', which determine the color and size of the spinner respectively.
 * - Finally, the 'Loading' component returns the 'Box' component with the 'BounceLoader' component as its child.
 */

"use client";

import { BounceLoader } from "react-spinners";
import Box from "@/components/Box";

const Loading = () => {
    return (
        // Box component is used to create a styled container
        <Box className="h-full flex items-center justify-center">
            {/* BounceLoader component is used to create a bouncing loader spinner */}
            <BounceLoader color="#22c55e" size={40} />
        </Box>
    );
}

export default Loading;
