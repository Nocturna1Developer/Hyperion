/*
webhook.ts:

This script is designed to handle Stripe webhook events to synchronize the state between your Supabase database and Stripe.
It processes Stripe webhook events in an HTTP POST function, verifies the signature, checks the event type, and processes the event accordingly.
Details:

The relevantEvents variable is a Set of events that the application has an interest in processing. Any event not included in this list will be ignored.
The POST function is an asynchronous function that will process incoming POST requests. It reads the event sent by Stripe, validates its signature for security, and processes the event based on its type.
Signature verification is performed using Stripe's constructEvent method. This step is essential to ensure the webhook event comes from Stripe. If the signature fails validation, it returns a 400 response with an error message.
The event handling section identifies the event type and carries out specific actions accordingly. For product, price, and subscription related events, the application updates its Supabase database using helper functions upsertProductRecord, upsertPriceRecord, and manageSubscriptionStatusChange.
In the case of a checkout session completion, the manageSubscriptionStatusChange function is also called if the mode is 'subscription'.
If the application successfully processes the event, it returns a JSON response with { received: true } and a status code of 200.
Appropriate error responses are returned in the event of any errors occurring either during the signature verification or event handling stages.
*/
import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { headers } from 'next/headers';

import { stripe } from '@/libs/stripe';
import {
    upsertProductRecord,
    upsertPriceRecord,
    manageSubscriptionStatusChange
} from '@/libs/supabaseAdmin';

// List of Stripe event types we are interested in
const relevantEvents = new Set([
    'product.created',
    'product.updated',
    'price.created',
    'price.updated',
    'checkout.session.completed',
    'customer.subscription.created',
    'customer.subscription.updated',
    'customer.subscription.deleted'
]);

// Function to handle HTTP POST request from Stripe webhook system
export async function POST(
    request: Request
) {
    const body = await request.text()
    const sig = headers().get('Stripe-Signature');

    const webhookSecret =
        process.env.STRIPE_WEBHOOK_SECRET_LIVE ??
        process.env.STRIPE_WEBHOOK_SECRET;
    let event: Stripe.Event;

    try {
        if (!sig || !webhookSecret) return;
        // Verifying the signature of the event sent by Stripe
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        console.log(`❌ Error message: ${err.message}`);
        return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }

    // If the event type is among the relevant events, handle it
    if (relevantEvents.has(event.type)) {
        try {
            switch (event.type) {
                case 'product.created':
                case 'product.updated':
                    await upsertProductRecord(event.data.object as Stripe.Product);
                    break;
                case 'price.created':
                case 'price.updated':
                    await upsertPriceRecord(event.data.object as Stripe.Price);
                    break;
                case 'customer.subscription.created':
                case 'customer.subscription.updated':
                case 'customer.subscription.deleted':
                    const subscription = event.data.object as Stripe.Subscription;
                    await manageSubscriptionStatusChange(
                        subscription.id,
                        subscription.customer as string,
                        event.type === 'customer.subscription.created'
                    );
                    break;
                case 'checkout.session.completed':
                    const checkoutSession = event.data
                        .object as Stripe.Checkout.Session;
                    if (checkoutSession.mode === 'subscription') {
                        const subscriptionId = checkoutSession.subscription;
                        await manageSubscriptionStatusChange(
                            subscriptionId as string,
                            checkoutSession.customer as string,
                            true
                        );
                    }
                    break;
                default:
                    throw new Error('Unhandled relevant event!');
            }
        } catch (error) {
            console.log(error);
            // Return a response with an error message if any error occurs
            return new NextResponse('Webhook error: "Webhook handler failed. View logs."', { status: 400 });
        }
    }

    // If everything runs smoothly, send back a response with received: true
    return NextResponse.json({ received: true }, { status: 200 });
};