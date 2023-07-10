/*
getActiveProductsWithPrices.ts:

- This is a server-side function that queries the Supabase database to get all active products and their prices.
- The function uses a server-side Supabase client from the "@supabase/auth-helpers-nextjs" package.
- It queries the "products" table in the Supabase database and joins with the "prices" table.
- It filters for only active products and active prices.
- The results are ordered by the "index" field in the "metadata" JSON column of the "products" table and the "unit_amount" field in the "prices" table.
- If the query encounters an error, the error message is logged.
- The function returns an array of objects with the type ProductWithPrice, or an empty array if no data is returned.

Details:

- The "cookies" argument passed to createServerComponentClient is from the "next/headers" package, which provides headers for Next.js requests.
- The "ProductWithPrice" type is imported from the "@/types" module.
*/

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import { ProductWithPrice } from "@/types";

// Define the async function getActiveProductsWithPrices
const getActiveProductsWithPrices = async (): Promise<ProductWithPrice[]> => {
    // Create a server-side Supabase client
    const supabase = createServerComponentClient({
        cookies: cookies // Pass in the cookies from the request
    });

    // Make a query to the Supabase database to get all active products with their prices
    const { data, error } = await supabase
        .from('products') // Select from the "products" table
        .select('*, prices(*)') // Select all fields and join with "prices" table
        .eq('active', true) // Filter for only active products
        .eq('prices.active', true) // Filter for only active prices
        .order('metadata->index') // Order by the "index" field in the "metadata" JSON column
        .order('unit_amount', { foreignTable: 'prices' }); // Order by the "unit_amount" field in the "prices" table

    // If there is an error in the query, log it
    if (error) {
        console.log(error.message);
    }

    // Return the data as an array of ProductWithPrice objects, or an empty array if no data is returned
    return (data as any) || [];
}

export default getActiveProductsWithPrices;
