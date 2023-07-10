/*
getStripe.ts:

- This is a client-side script used to load and instantiate the Stripe.js object, which is used to interact with the Stripe API on the client side.
- The 'loadStripe' function is used to asynchronously load the Stripe.js library and create a new instance of the Stripe object.
- The 'getStripe' function is used to get the Stripe.js object. It creates the object on its first call and reuses the same object on subsequent calls.

Details:

- The 'loadStripe' and 'Stripe' types are imported from the '@stripe/stripe-js' package.
- The 'stripePromise' variable holds a promise that resolves with the Stripe object. It's initially undefined.
- The 'getStripe' function is exported for use in other parts of the application. 
- Inside the 'getStripe' function, 'stripePromise' is assigned a promise that resolves with the Stripe object only if it's not already assigned.
- The 'loadStripe' function is called with the Stripe publishable key obtained from the environment variable 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'.
*/

import { loadStripe, Stripe } from '@stripe/stripe-js'; // Import loadStripe and Stripe from the stripe-js package

let stripePromise: Promise<Stripe | null>; // A promise that resolves with the Stripe object

export const getStripe = () => {
    if (!stripePromise) { // If stripePromise is not already assigned
        stripePromise = loadStripe( // Assign it a promise that resolves with the Stripe object
            process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '' // Pass the Stripe publishable key to the loadStripe function
        );
    }

    return stripePromise; // Return the promise
};
