/*
SongItem.tsx:

- The SongItem component is used to display individual songs in a list format.
- It uses the useLoadImage hook to get the URL for the song's image.
- A PlayButton component is also included for each song.

Details:

- The component takes a Song object and an onClick handler as props.
- It starts by using the useLoadImage hook to get the URL of the song's associated image.
- The onClick handler is called with the song's id when the SongItem is clicked.
- The image for the song is displayed with a placeholder image in case the actual image cannot be loaded.
- Information about the song, like the title and author, is also displayed.
- A PlayButton is included and positioned at the bottom-right corner of each SongItem.

This component can be used in any music-related application where individual songs need to be displayed in a list format.
*/

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import PlayButton from "./PlayButton";

interface SongItemProps {
    data: Song;
    onClick: (id: string) => void;
}

const SongItem: React.FC<SongItemProps> = ({ data, onClick }) => {
    // Use the custom hook to get the image URL
    const imagePath = useLoadImage(data);

    return (
        <div
            onClick={() => onClick(data.id)}
            className="relative group flex flex-col items-center justify-center rounded-md overflow-hidden gap-x-4 bg-neutral-400/5 cursor-pointer hover:bg-neutral-400/10 transition p-3"
        >
            {/* Image container */}
            <div className="relative aspect-square w-full h-full rounded-md overflow-hidden">
                {/* Display the song's image or a placeholder if the image doesn't load */}
                <Image
                    className="object-cover"
                    src={imagePath || '/images/music-placeholder.png'}
                    fill
                    alt="Image"
                />
            </div>
            {/* Song details container */}
            <div className="flex flex-col items-start w-full pt-4 gap-y-1">
                {/* Display the song's title */}
                <p className="font-semibold truncate w-full">{data.title}</p>
                {/* Display the song's author */}
                <p className="text-neutral-400 text-sm pb-4 w-full truncate">By {data.author}</p>
            </div>
            {/* Play button container */}
            <div className="absolute bottom-24 right-5">
                {/* Display the Play button */}
                <PlayButton />
            </div>
        </div>
    );
};

export default SongItem;