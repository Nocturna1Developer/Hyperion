
/*
middleware.ts:

This script creates a Supabase middleware client using the 'createMiddlewareClient' function.
It calls the 'getSession' method on Supabase's 'auth' object to fetch the current session.
The function is designed to be used as a middleware function to secure serverless functions or API routes.
Details:

The 'createMiddlewareClient' function from the '@supabase/auth-helpers-nextjs' package is used to create a middleware client.
The 'NextRequest' and 'NextResponse' types from 'next/server' are used to type the 'req' and 'res' parameters.
The middleware client is instantiated with the 'req' and 'res' objects passed to the function.
The 'getSession' method is then called on the 'auth' object of the middleware client to get the current session.
The function finally returns the response object.
*/

import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    // Create a response object using 'NextResponse.next()'
    const res = NextResponse.next();

    // Create a Supabase middleware client using 'createMiddlewareClient()' and pass in the request and response objects
    const supabase = createMiddlewareClient({ req, res });

    // Call the 'getSession()' method on the Supabase client's 'auth' object to get the current session
    await supabase.auth.getSession();

    // Return the response object
    return res;
};