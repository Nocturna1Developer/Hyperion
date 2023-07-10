/**
 * useDebounce.ts:
 *
 * This is a custom React Hook that accepts a value and a delay, then returns a version of that value that only updates after the delay has passed without the value changing. 
 * This is typically used to prevent expensive computations or API calls from executing too frequently when an input value changes rapidly (e.g., in the case of typeahead or autocomplete functionality).
 *
 * Details:
 *
 * - The hook accepts a 'value' of generic type 'T', and an optional 'delay' in milliseconds.
 * - The hook returns the 'debouncedValue', which updates only when the delay has passed without the 'value' changing.
 * - If a 'delay' is not provided, it defaults to 500 milliseconds.
 * - When the 'value' or 'delay' changes, a side effect is executed: a timeout is set to update the 'debouncedValue' after the delay has passed.
 * - When the 'value' or 'delay' changes before the delay has passed, the previous timeout is cleared before a new one is set. This is done in the cleanup function of the 'useEffect' hook, which is executed before the next side effect and when the component is unmounted.
 */

import { useEffect, useState } from 'react'

function useDebounce<T>(value: T, delay?: number): T {
    // State for our debounced value
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Set debouncedValue to value after the specified delay
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500);

        // Return a cleanup function that cancels the timer when the value or delay changes
        return () => {
            clearTimeout(timer);
        }
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
