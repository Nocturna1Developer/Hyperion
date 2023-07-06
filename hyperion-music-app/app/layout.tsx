/* 
Layout.tsx:

- The Layout component defines the main layout and structure of the app.
- It fetches data, provides contexts, and renders the main components of the app like Sidebar and Player.
- It uses Google's Figtree font, which is configured and set for the body of the application.
- The component also defines metadata for the application and a revalidation value for incremental static regeneration.

Details:

- The component fetches active products with prices and songs associated with the user using `getActiveProductsWithPrices` and `getSongsByUserId` respectively.
- These data are then used to provide context and props for children components.
- The `ToasterProvider`, `SupabaseProvider`, and `UserProvider` wrap the whole application for providing application-wide context for toast notifications, Supabase client, and user state respectively.
- The `ModalProvider` uses fetched products as props.
- The `Sidebar` and `Player` are main components of the app and are rendered within the `UserProvider` context.
- The layout is wrapped in html and body tags, with the body tag being assigned the Figtree font.
*/

import { Figtree } from 'next/font/google'

import getSongsByUserId from '@/actions/getSongsByUserId'
import getActiveProductsWithPrices from '@/actions/getActiveProductsWithPrices'
import Sidebar from '@/components/Sidebar'
import ToasterProvider from '@/providers/ToasterProvider'
import UserProvider from '@/providers/UserProvider'
import ModalProvider from '@/providers/ModalProvider'
import SupabaseProvider from '@/providers/SupabaseProvider'
import Player from '@/components/Player'

import './globals.css'

const font = Figtree({ subsets: ['latin'] }) // Use Figtree Google font with the 'latin' subset.

export const metadata = {
  title: 'H Y P E R I O N',
  description: 'A minimalistic music streaming app.',
}

export const revalidate = 0;

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const products = await getActiveProductsWithPrices(); // Fetch all active products with their prices.
  const userSongs = await getSongsByUserId(); // Fetch all songs for the user.

  // The RootLayout return structure.
  return (
    <html lang="en">
      <body className={font.className}>
        {/* Toast notification context */}
        <ToasterProvider />
        {/* Supabase client context */}
        <SupabaseProvider>
          {/* User context */}
          <UserProvider>
            {/* Modal context with fetched products */}
            <ModalProvider products={products} />
            {/* Sidebar component with user songs */}
            <Sidebar songs={userSongs}>
              {/* Child components */}
              {children}
            </Sidebar>
            {/* Player component */}
            <Player />
          </UserProvider>
        </SupabaseProvider>
      </body>
    </html>
  )
}
