/*
stripe.ts:

- This is a Node.js script used to create a new instance of the Stripe object which is used to interact with the Stripe API.
- The script uses the Stripe secret key from environment variables to authenticate with the Stripe API.

Details:

- The 'Stripe' object is imported from the 'stripe' package.
- A new 'Stripe' object is created with the secret key obtained from the environment variable 'STRIPE_SECRET_KEY'.
- The 'Stripe' object is created with an options object specifying the API version and app information such as the app's name and version.
- The created 'Stripe' object is exported for use in other parts of the application.
*/

import Stripe from 'stripe'; // Import Stripe module

// Create a new Stripe instance with the Stripe secret key from the environment variables
export const stripe = new Stripe(
    process.env.STRIPE_SECRET_KEY ?? '', // The Stripe secret key
    {
        apiVersion: '2022-11-15', // The Stripe API version
        appInfo: { // App information
            name: 'Hyperion-Music-App', // App name
            version: '0.1.0' // App version
        }
    }
);
