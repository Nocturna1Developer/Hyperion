/*
Liked.tsx:

- This is a Next.js server-side rendered page component that displays the songs that the user has liked.
- It uses a function 'getLikedSongs' to fetch all the songs that the currently authenticated user has liked.
- The page displays a header with an image and title, and a 'LikedContent' component which displays the list of liked songs.

Details:

- 'getLikedSongs' is called in the server-side rendering function to fetch all the liked songs for the current user.
- A 'Header' component is rendered at the top of the page with an image and a title that says 'Liked Songs'.
- The 'LikedContent' component is rendered with the list of liked songs as a prop.
- The 'revalidate' property is set to 0, which means the page will be regenerated on every request.
*/

import Image from "next/image";

import getLikedSongs from "@/actions/getLikedSongs";
import Header from "@/components/Header";

import LikedContent from "./components/LikedContent";

export const revalidate = 0;

const Liked = async () => {
    // Fetch all the songs that the user has liked
    const songs = await getLikedSongs();

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
            <Header>
                <div className="mt-20">
                    <div
                        className="
              flex 
              flex-col 
              md:flex-row 
              items-center 
              gap-x-5
            "
                    >
                        <div className="relative h-32 w-32 lg:h-44 lg:w-44">
                            <Image
                                className="object-cover"
                                fill
                                src="/images/liked.png"
                                alt="Playlist"
                            />
                        </div>
                        <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                            <p className="hidden md:block font-semibold text-sm">
                                Playlist
                            </p>
                            <h1
                                className="
                  text-white 
                  text-4xl 
                  sm:text-5xl 
                  lg:text-7xl 
                  font-bold
                "
                            >
                                Liked Songs
                            </h1>
                        </div>
                    </div>
                </div>
            </Header>
            {/* Render the LikedContent component with the list of liked songs as a prop */}
            <LikedContent songs={songs} />
        </div>
    );
}

export default Liked;