/**
 * SearchInput.tsx:
 *
 * This is a React Functional Component representing a search input field.
 * It uses the 'useRouter' hook from Next.js to update the URL based on the search input.
 * It also uses a custom 'useDebounce' hook to delay the execution of side effects (like API calls) until a certain amount of time has passed without the user typing.
 *
 * Details:
 *
 * - The 'useRouter' hook is used to get the router object, which allows programmatically changing the URL.
 * - The 'useDebounce' hook is used to debounce the search input value.
 * - When the debounced value changes, a side effect is executed, updating the URL with the new search query.
 * - The 'qs' library is used to build the query string of the new URL.
 * - The 'Input' component is a generic input field component.
 */

"use client";

import qs from "query-string";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import useDebounce from "@/hooks/useDebounce";

import Input from "./Input";

const SearchInput = () => {
    const router = useRouter(); // Getting the router object
    const [value, setValue] = useState<string>(''); // State to hold the value of the input
    const debouncedValue = useDebounce<string>(value, 500); // Debounced value of the input

    useEffect(() => {
        const query = { // Query object for the new URL
            title: debouncedValue,
        };

        // Stringify the URL and query object into a URL string
        const url = qs.stringifyUrl({
            url: '/search',
            query
        });

        router.push(url); // Navigate to the new URL
    }, [debouncedValue, router]);

    return (
        // Input field with a handler for the onChange event
        <Input
            placeholder="What kind of songs do you like :)?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
        />
    );
}

export default SearchInput;
