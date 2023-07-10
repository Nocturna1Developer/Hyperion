/*
Home.tsx:

- The Home component renders the home page of the application.
- It displays a welcome message, a grid of featured list items, and a list of the newest songs.
- It uses getSongs action to fetch the songs data.

Details:

- The revalidate variable is set to 0, meaning the page will always be regenerated when a request comes in.
- The Home function fetches song data with the getSongs action.
- It uses the Header component to display the header of the page and embeds other elements like the welcome message and the featured list grid.
- The ListItem component is used to display a featured list item.
- The PageContent component displays the content of the page, which is the newest songs.

*/

import getSongs from "@/actions/getSongs"; // This function is used to fetch the song data
import Header from "@/components/Header"; // This component is used to display the Header of the page
import ListItem from "@/components/ListItem"; // This component is used to display individual song items

import PageContent from "./components/PageContent"; // This component is used to display the main content of the page

export const revalidate = 0; // Revalidation time for Next.js Incremental Static Regeneration, data will always be up to date, not cached

export default async function Home() {
  const songs = await getSongs(); // Fetch song data asynchronously

  return (
    <div
      className="
        bg-neutral-900 // Background color
        rounded-lg // Border style
        h-full // Full height
        w-full // Full width
        overflow-hidden // Hide overflowing content
        overflow-y-auto // Allow vertical scrolling if the content overflows
      "
    >
      <Header>
        <div className="mb-2">
          <h1
            className="
            text-white // Text color
            text-3xl // Text size
            font-semibold // Font weight
            ">
            {'Welcome back'} {/* Display welcome text */}
          </h1>
          <div
            className="
              grid // Use grid layout
              grid-cols-1 // Grid column count for mobile
              sm:grid-cols-2 // Grid column count for small screens and above
              xl:grid-cols-3 // Grid column count for xl screens and above
              2xl:grid-cols-4 // Grid column count for 2xl screens and above
              gap-3 // Space between grid items
              mt-4 // Top margin
            "
          >
            <ListItem
              name="Liked Songs"
              image="/images/liked.png"
              href="liked symphonies"
            /> {/* List item for 'Liked Songs' */}
          </div>
        </div>
      </Header>
      <div className="mt-2 mb-7 px-6">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-semibold">
            {'Explore a musical universe!'} {/* Title for the newest songs section */}
          </h1>
        </div>
        <PageContent songs={songs} /> {/* Render the main content of the page with the fetched song data */}
      </div>
    </div>
  )
}