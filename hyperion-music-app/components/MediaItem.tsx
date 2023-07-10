/*
MediaItem.tsx:

This is a React Functional Component representing an individual media item, such as a song or podcast.
It uses two custom hooks: 'useLoadImage' to load the image of the media item, and 'usePlayer' to control the playback of the media item.
It also receives a 'data' prop which is the information about the media item, and an optional 'onClick' callback function.
When the media item is clicked, if an 'onClick' callback is provided, it is executed with the media item's id. If not, the 'setId' method from the 'usePlayer' hook is called with the media item's id.

Details:

The 'useLoadImage' hook is used to fetch the URL of the media item's image.
The 'usePlayer' hook is used to get the player object, which allows controlling the playback of the media item.
If the 'onClick' callback function is provided, it is executed with the media item's id when the media item is clicked.
If the 'onClick' callback function is not provided, the 'setId' method from the 'usePlayer' hook is called with the media item's id when the media item is clicked.
The media item's image, title, and author are displayed.
*/

import Image from "next/image";
import useLoadImage from "@/hooks/useLoadImage";
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";

interface MediaItemProps {
    data: Song;
    onClick?: (id: string) => void;
}

const MediaItem: React.FC<MediaItemProps> = ({
    data,
    onClick,
}) => {
    const imageUrl = useLoadImage(data);
    const player = usePlayer();

    const handleClick = () => {
        if (onClick) {
            return onClick(data.id);
        }

        return player.setId(data.id);
    };

    return (
        <div
            onClick={handleClick}
            className="
        flex 
        items-center 
        gap-x-3 
        cursor-pointer 
        hover:bg-neutral-800/50 
        w-full 
        p-2 
        rounded-md
      "
        >
            <div
                className="
          relative 
          rounded-md 
          min-h-[48px] 
          min-w-[48px] 
          overflow-hidden
        "
            >
                <Image
                    fill
                    src={imageUrl || "/images/music-placeholder.png"}
                    alt="MediaItem"
                    className="object-cover"
                />
            </div>
            <div className="flex flex-col gap-y-1 overflow-hidden">
                <p className="text-white truncate">{data.title}</p>
                <p className="text-neutral-400 text-sm truncate">
                    By {data.author}
                </p>
            </div>
        </div>
    );
}

export default MediaItem;
