/*
LikedContent.tsx:

- This is a React Functional Component that displays a list of liked songs for the authenticated user.
- If no songs are found, it shows a message stating that there are no liked songs.
- It uses the 'useOnPlay' hook to handle the song playing operation and a 'LikeButton' component to allow liking a song.

Details:

- The component receives a 'songs' prop which is an array of the liked songs to be displayed.
- It uses the 'useOnPlay' hook with the list of songs, which returns a function to handle the song playing operation.
- For each song in the 'songs' array, it renders a 'MediaItem' component and a 'LikeButton' component.
- The 'MediaItem' component is given an 'onClick' handler which calls the 'onPlay' function with the song's id.
- The 'LikeButton' component is given the song's id.
- If the user is not logged in, it redirects to the home page.
*/

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { Song } from "@/types";
import { useUser } from "@/hooks/useUser";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

interface LikedContentProps {
    songs: Song[];
};

const LikedContent: React.FC<LikedContentProps> = ({
    songs
}) => {
    const router = useRouter();
    const { isLoading, user } = useUser();

    // Function to handle song playing
    const onPlay = useOnPlay(songs);

    // Redirect to home page if user is not logged in
    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/');
        }
    }, [isLoading, user, router]);

    // If no songs are found, display a message
    if (songs.length === 0) {
        return (
            <div
                className="
          flex 
          flex-col 
          gap-y-2 
          w-full px-6 
          text-neutral-400
        "
            >
                You dont like any songs?
            </div>
        )
    }

    // If songs are found, display a list of songs with LikeButton
    return (
        <div className="flex flex-col gap-y-2 w-full p-6">
            {songs.map((song: any) => (
                <div
                    key={song.id}
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        <MediaItem onClick={(id) => onPlay(id)} data={song} />
                    </div>
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default LikedContent;
