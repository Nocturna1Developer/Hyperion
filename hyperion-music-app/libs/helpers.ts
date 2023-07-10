/*
utils.ts:

- This script provides utility functions for use in the application.
- The 'getURL' function retrieves the base URL of the website.
- The 'postData' function posts JSON data to a specified URL and returns the response.
- The 'toDateTime' function converts Unix timestamp to JavaScript Date object.

Details:

- The 'getURL' function retrieves the base URL of the website from environment variables or uses 'http://localhost:3000/' as a fallback.
- The 'postData' function takes an object with 'url' and 'data' properties. It makes a POST request to the 'url' with 'data' as the body. The function throws an error if the request is not successful and returns the response body otherwise.
- The 'toDateTime' function converts Unix timestamp to JavaScript Date object, offsetting it by 30 minutes from the Unix epoch start.
*/

import { Price } from '@/types';

// Function to retrieve the base URL of the website
export const getURL = () => {
    let url =
        process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
        process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
        'http://localhost:3000/';
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`;
    // Make sure to including trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`;
    return url;
};

// Function to post JSON data to a specified URL and return the response
export const postData = async ({
    url,
    data
}: {
    url: string;
    data?: { price: Price };
}) => {
    console.log('posting,', url, data);

    const res: Response = await fetch(url, {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify(data)
    });

    if (!res.ok) {
        console.log('Error in postData', { url, data, res });

        throw Error(res.statusText);
    }

    return res.json();
};

// Function to convert Unix timestamp to JavaScript Date object
export const toDateTime = (secs: number) => {
    var t = new Date('1970-01-01T00:30:00Z'); // Unix epoch start.
    t.setSeconds(secs);
    return t;
};
