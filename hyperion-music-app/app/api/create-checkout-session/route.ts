/*
createCheckoutSession.ts:

This script handles the creation of a Stripe checkout session for a user who wants to subscribe to a service.
It is implemented in an HTTP POST function, which receives the price and quantity for the subscription and any additional metadata.
It uses the Supabase client to fetch the user's details and uses these to retrieve or create a customer on Stripe.
A new checkout session is then created on Stripe with the specified details and a success and cancellation URL.
Details:

The createRouteHandlerClient function from '@supabase/auth-helpers-nextjs' library is used to initialize a Supabase client with the necessary authentication details.
The POST function receives a request containing price, quantity, and any additional metadata for the subscription.
It then uses the createRouteHandlerClient to create a Supabase client and fetches the user details associated with the authenticated session.
Using the user details, it retrieves or creates a customer on Stripe by calling createOrRetrieveCustomer.
A new checkout session is created on Stripe by calling stripe.checkout.sessions.create. It includes details such as payment method types, billing address collection, customer ID, line items (with price and quantity), mode of transaction, allowance of promotional codes, subscription data, and success and cancel URLs.
If the session creation is successful, it returns a JSON response containing the session ID.
In the event of an error, it logs the error and returns an HTTP 500 (Internal Error) response.
*/

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from "next/headers";
import { NextResponse } from 'next/server';

import { stripe } from '@/libs/stripe';
import { getURL } from '@/libs/helpers';
import { createOrRetrieveCustomer } from '@/libs/supabaseAdmin';

export async function POST(
    request: Request
) {
    // Parse price, quantity and metadata from the request body
    const { price, quantity = 1, metadata = {} } = await request.json();

    try {
        // Create a Supabase client for the authenticated user
        const supabase = createRouteHandlerClient({
            cookies
        });
        const {
            data: { user }
        } = await supabase.auth.getUser();

        // Retrieve or create a customer on Stripe
        const customer = await createOrRetrieveCustomer({
            uuid: user?.id || '',
            email: user?.email || ''
        });

        // Create a new checkout session on Stripe
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'required',
            customer,
            line_items: [
                {
                    price: price.id,
                    quantity
                }
            ],
            mode: 'subscription',
            allow_promotion_codes: true,
            subscription_data: {
                trial_from_plan: true,
                metadata
            },
            success_url: `${getURL()}/account`,
            cancel_url: `${getURL()}/`
        });

        // Return the session ID in the response
        return NextResponse.json({ sessionId: session.id });
    } catch (err: any) {
        console.log(err);
        // In case of error, return an internal error response
        return new NextResponse('Internal Error', { status: 500 });
    }
}