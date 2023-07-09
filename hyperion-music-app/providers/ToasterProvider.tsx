/*
ToasterProvider.tsx:

- The ToasterProvider component is a simple wrapper component that renders a Toaster from 'react-hot-toast'.
- The Toaster is a notifications system used to display ephemeral messages, or "toasts", to the user. This could include messages about the success or failure of operations, informational messages, and so on.
- It is configured to have a dark theme with a black background and white text.

Details:

- The component does not accept any props and does not have any state.
- It returns a Toaster component from 'react-hot-toast' with the toast options set to display the toast messages with a black background and white text.
- This component is likely used in the application's root component, wrapping the rest of the application so that toast messages can be displayed from anywhere in the app.
*/

"use client";

import { Toaster } from  "react-hot-toast";

const ToasterProvider = () => {
    // Render the Toaster with a black background and white text
    return (
        <Toaster
            toastOptions={{
                style: {
                    background: '#333',
                    color: '#fff',
                }
            }}
        />
    );
}

export default ToasterProvider;
