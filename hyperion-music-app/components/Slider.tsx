/*
Slider.tsx:

- This is a React Functional Component that provides a slider for adjusting volume.
- It uses the Radix UI's Slider component.
- It receives 'value' and 'onChange' as props.
- The 'value' prop represents the current value of the slider.
- The 'onChange' function is called when the slider value is changed.

Details:

- The 'handleChange' function updates the current value of the slider and calls the 'onChange' function passed as a prop.
- The component returns a slider with a default value of 1 (max value), and it calls 'handleChange' whenever the slider value is changed.
- The slider's maximum value is set to 1, and its step is 0.1. 
- Accessibility is improved by providing an 'aria-label' prop.

*/

"use client";

import * as RadixSlider from '@radix-ui/react-slider';

// Define the properties that the Slider component will receive
interface SlideProps {
    value?: number;
    onChange?: (value: number) => void;
}

// Create the Slider component using the properties defined above
const Slider: React.FC<SlideProps> = ({
    value = 1,
    onChange
}) => {

    // Function to handle the change event from the slider
    const handleChange = (newValue: number[]) => {
        onChange?.(newValue[0]); // Update the value using the onChange function passed as prop
    };

    // Return the component JSX
    return (
        <RadixSlider.Root
            className="
        relative 
        flex 
        items-center 
        select-none 
        touch-none 
        w-full 
        h-10
      "
            defaultValue={[1]} // Default value for the slider
            value={[value]} // Current value for the slider
            onValueChange={handleChange} // Handle the change event
            max={1} // Maximum value for the slider
            step={0.1} // The step between each value in the slider
            aria-label="Volume" // Accessibility label for the slider
        >
            <RadixSlider.Track
                className="
          bg-neutral-600 
          relative 
          grow 
          rounded-full 
          h-[3px]
        "
            >
                <RadixSlider.Range
                    className="
            absolute 
            bg-white 
            rounded-full 
            h-full
          "
                />
            </RadixSlider.Track>
        </RadixSlider.Root>
    );
}

export default Slider; // Export the Slider component
