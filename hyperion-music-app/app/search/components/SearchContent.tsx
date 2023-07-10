/**
 * SearchContent.tsx:
 *
 * This is a React Functional Component that displays a list of songs returned by a search operation.
 * If no songs are found, it shows a message stating that no songs were found.
 * It uses two custom hooks: 'useOnPlay' to handle the song playing operation and a 'LikeButton' component to allow liking a song.
 * 
 * Details:
 * 
 * - The component receives a 'songs' prop which is an array of the songs to be displayed.
 * - It uses the 'useOnPlay' hook with the list of songs, which returns a function to handle the song playing operation.
 * - For each song in the 'songs' array, it renders a 'MediaItem' component and a 'LikeButton' component.
 * - The 'MediaItem' component is given an 'onClick' handler which calls the 'onPlay' function with the song's id.
 * - The 'LikeButton' component is given the song's id.
 */

"use client";

// Import necessary packages and custom types
import { Song } from "@/types";
import MediaItem from "@/components/MediaItem";
import LikeButton from "@/components/LikeButton";
import useOnPlay from "@/hooks/useOnPlay";

// Define the type of the props
interface SearchContentProps {
    songs: Song[];
}

// This is a functional component which takes a list of songs and displays them
const SearchContent: React.FC<SearchContentProps> = ({ songs }) => {
    // 'useOnPlay' is a custom hook that sets up the logic for playing the song
    const onPlay = useOnPlay(songs);

    // If there are no songs, display a message stating no songs were located
    if (songs.length === 0) {
        return (
            <div
                className="
                    flex 
                    flex-col 
                    gap-y-2 
                    w-full 
                    px-6 
                    text-neutral-400
                "
            >
                Sorry, no songs were located...
            </div>
        )
    }

    // If there are songs, map through each song and render a MediaItem and a LikeButton for each song
    return (
        <div className="flex flex-col gap-y-2 w-full px-6">
            {songs.map((song: Song) => (
                <div
                    key={song.id}  // Unique key for each song item
                    className="flex items-center gap-x-4 w-full"
                >
                    <div className="flex-1">
                        {/* When a MediaItem is clicked, the 'onPlay' function is called with the song's id */}
                        <MediaItem
                            onClick={(id: string) => onPlay(id)}
                            data={song}
                        />
                    </div>
                    {/* Render a LikeButton component for each song and pass the song's id to it */}
                    <LikeButton songId={song.id} />
                </div>
            ))}
        </div>
    );
}

export default SearchContent;