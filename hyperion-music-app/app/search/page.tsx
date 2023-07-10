/**
 * Search.tsx
 *
 * This script exports a functional component named 'Search' that displays the search results for songs based on their title.
 * It uses the custom action 'getSongsByTitle' to fetch songs with a given title from a Supabase database.
 * The component receives a 'searchParams' prop which contains the search parameters, in this case, the song title.
 * It displays a header with the title 'Search' and a search input field, and a 'SearchContent' component with the fetched songs.
 *
 * Details:
 *
 * - The 'getSongsByTitle' action is used to fetch songs with a given title from the Supabase database.
 * - The 'Search' component receives a 'searchParams' prop which contains the search parameters, and it deconstructs it to get the song title.
 * - The songs are fetched from the database asynchronously when the component is mounted.
 * - The fetched songs are passed as a prop to the 'SearchContent' component.
 * - The 'SearchInput' component is used to allow the user to input a song title to search.
 * - Finally, the 'Search' component returns a div element with a header, a search input field, and the 'SearchContent' component with the fetched songs.
 */

import getSongsByTitle from "@/actions/getSongsByTitle";
import SearchInput from "@/components/SearchInput";
import Header from "@/components/Header";
import SearchContent from "./components/SearchContent";

export const revalidate = 0;

interface SearchProps {
    searchParams: { title: string }
};

const Search = async ({ searchParams }: SearchProps) => {
    // Fetch songs with the given title from the database
    const songs = await getSongsByTitle(searchParams.title);

    // Render a div element with a header, a search input field, and the SearchContent component with the fetched songs
    return (
        <div
            className="
        bg-neutral-900 
        rounded-lg 
        h-full 
        w-full 
        overflow-hidden 
        overflow-y-auto
      "
        >
            <Header className="from-bg-neutral-900">
                <div className="mb-2 flex flex-col gap-y-6">
                    <h1 className="text-white text-3xl font-semibold">
                        Search
                    </h1>
                    {/* Render a search input field */}
                    <SearchInput />
                </div>
            </Header>
            {/* Render the SearchContent component with the fetched songs */}
            <SearchContent songs={songs} />
        </div>
    );
}

export default Search;
