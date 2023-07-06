/*
Library.tsx:

- The Library component renders the user's music library. 
- It uses various hooks to handle user authentication, subscription, upload modal, and song playback.
- Icons are imported from 'react-icons'.

Details:

- It receives a list of 'songs' as props.
- useUser() hook is used to get the current user and their subscription status.
- useUploadModal(), useAuthModal(), and useSubscribeModal() hooks are used to handle opening the corresponding modals.
- useOnPlay() hook is used to handle the play action of a song.
- When the add icon is clicked, different modals are opened based on whether the user is logged in or subscribed.
- For each song in the user's library, a MediaItem component is rendered with an onClick event handler to play the song.

*/

"use client";

import { TbPlaylist } from "react-icons/tb";
import { AiOutlinePlus } from "react-icons/ai";

import { Song } from "@/types";
import useUploadModal from "@/hooks/useUploadModal";
import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";
import useSubscribeModal from "@/hooks/useSubscribeModal";
import useOnPlay from "@/hooks/useOnPlay";

import MediaItem from "./MediaItem";

interface LibraryProps {
    songs: Song[]; // Array of songs in the user's library
}

const Library: React.FC<LibraryProps> = ({
    songs
}) => {
    const { user, subscription } = useUser(); // Get current user and their subscription status
    const uploadModal = useUploadModal(); // Hook to handle opening the upload modal
    const authModal = useAuthModal(); // Hook to handle opening the auth modal
    const subscribeModal = useSubscribeModal(); // Hook to handle opening the subscription modal

    const onPlay = useOnPlay(songs); // Hook to handle the play action of a song

    // Function to handle the click event on the add icon
    const onClick = () => {
        if (!user) {
            return authModal.onOpen();
        }

        if (!subscription) {
            return subscribeModal.onOpen();
        }

        return uploadModal.onOpen();
    }

    // Render user's library
    return (
        <div className="flex flex-col">
            <div className="flex items-center justify-between px-5 pt-4">
                <div className="inline-flex items-center gap-x-2">
                    <TbPlaylist className="text-neutral-400" size={26} />
                    <p className="text-neutral-400 font-medium text-md">
                        Your Library
                    </p>
                </div>
                <AiOutlinePlus
                    onClick={onClick}
                    size={20}
                    className="
            text-neutral-400 
            cursor-pointer 
            hover:text-white 
            transition
          "
                />
            </div>
            <div className="flex flex-col gap-y-2 mt-4 px-3">
                {songs.map((item) => (
                    <MediaItem
                        onClick={(id: string) => onPlay(id)}
                        key={item.id}
                        data={item}
                    />
                ))}
            </div>
        </div>
    );
}

export default Library;
