/*
createBillingSession.ts:

This script handles the creation of a Stripe billing session for an authenticated user.
It is implemented in an HTTP POST function.
The Supabase client is used to fetch the user's details and these are then used to retrieve or create a customer on Stripe.
A new billing session is then created on Stripe for the retrieved customer with a return URL.
Details:

The createRouteHandlerClient function from '@supabase/auth-helpers-nextjs' library is used to initialize a Supabase client with the necessary authentication details.
The POST function doesn't receive any request body.
It uses the createRouteHandlerClient to create a Supabase client and fetches the user details associated with the authenticated session.
If no user is found, an error is thrown.
Using the user details, it retrieves or creates a customer on Stripe by calling createOrRetrieveCustomer. If no customer is found or created, an error is thrown.
A new billing session is created on Stripe for the customer by calling stripe.billingPortal.sessions.create. It includes the customer ID and a return URL.
If the session creation is successful, it returns a JSON response containing the session URL.
In the event of an error, it logs the error and returns an HTTP 500 (Internal Error) response.
*/

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

export async function POST() {
    try {
        // Create a Supabase client for the authenticated user
        const supabase = createRouteHandlerClient({
            cookies
        });

        // Fetch the user details associated with the authenticated session
        const {
            data: { user }
        } = await supabase.auth.getUser();

        // If no user is found, throw an error
        if (!user) throw Error('Could not get user');

        // Retrieve or create a customer on Stripe
        const customer = await createOrRetrieveCustomer({
            uuid: user.id || '',
            email: user.email || ''
        });

        // If no customer is found or created, throw an error
        if (!customer) throw Error('Could not get customer');

        // Create a new billing session on Stripe for the customer
        const { url } = await stripe.billingPortal.sessions.create({
            customer,
            return_url: `${getURL()}/account`
        });

        // Return the session URL in the response
        return NextResponse.json({ url });
    } catch (err: any) {
        console.log(err);
        // In case of error, return an internal error response
        return new NextResponse('Internal Error', { status: 500 });
    }
};
