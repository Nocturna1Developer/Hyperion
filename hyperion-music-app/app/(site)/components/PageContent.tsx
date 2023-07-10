/*
PageContent.tsx:

- This is a React Functional Component that displays a list of songs.
- The component uses a custom 'useOnPlay' hook to handle play events and a 'SongItem' component to display individual songs.

Details:

- The 'useOnPlay' hook accepts an array of songs and returns a function that plays the song when called.
- The 'SongItem' component displays an individual song and handles click events to play the song.
- The component accepts an array of songs as props.
- If no songs are available, it displays a message saying "No songs available."
- The song list is displayed in a responsive grid layout, which adapts to different screen sizes.
*/
"use client";

// Import required types and hooks
import { Song } from "@/types";
import useOnPlay from "@/hooks/useOnPlay";
import SongItem from "@/components/SongItem";

// Define the props this component will receive
interface PageContentProps {
    songs: Song[];
}

// Define the PageContent component
const PageContent: React.FC<PageContentProps> = ({
    songs
}) => {
    // useOnPlay hook accepts an array of songs and returns a function to handle song play events
    const onPlay = useOnPlay(songs);

    // When no songs are available, display a message
    if (songs.length === 0) {
        return (
            <div className="mt-4 text-neutral-400">
                No songs available.
            </div>
        )
    }

    // Render the list of songs
    return (
        <div
            // CSS classes are used to handle layout across different screen sizes
            className="
        grid 
        grid-cols-2 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8 
        gap-4 
        mt-4
      "
        >
            {songs.map((item) => (
                // Each SongItem component handles click events to play the song
                <SongItem
                    onClick={(id: string) => onPlay(id)}
                    key={item.id}
                    data={item}
                />
            ))}
        </div>
    );
}

export default PageContent;
