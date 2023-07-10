
/*
PlayButton.tsx:

The PlayButton component is a reusable button component that shows the play icon.
The 'react-icons' library is used to get the play icon (FaPlay).
Details:

The component doesn't take any props.
It returns a button element with a play icon.
The button has several tailwind classes for styling.
The button's opacity is initially set to 0 and it changes to 100 when the group-hover pseudo-class is activated.
The button has a translate-y-1/4 class initially and it changes to translate-y-0 when the group-hover pseudo-class is activated.
The button scale increases to 110 when the hover pseudo-class is activated.
The play icon (FaPlay) is colored black.
This component can be used anywhere a play button is needed in a music-related application.
*/

import { FaPlay } from "react-icons/fa";

const PlayButton = () => {
    return (
        <button
            className="
             transition 
             opacity-0 
             rounded-full 
             flex 
             items-center 
             justify-center 
             bg-indigo-500 
             p-4 
             drop-shadow-md 
             translate
             translate-y-1/4
             group-hover:opacity-100 
             group-hover:translate-y-0
             hover:scale-110
         "
        >
            {/* Play icon */}
            <FaPlay className="text-black" />
        </button>
    );
}

export default PlayButton;