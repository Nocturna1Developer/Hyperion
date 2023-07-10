/*
useOnPlay.tsx:

- This is a custom React hook that provides a function to handle the song playing operation.
- The hook checks if the user is authenticated and subscribed before allowing the song to play.

Details:

- The hook receives an array of 'songs' as an argument.
- It uses the 'usePlayer', 'useSubscribeModal', 'useAuthModal', and 'useUser' hooks to access the player state, subscription modal, authentication modal, and user state respectively.
- It returns a function 'onPlay' which takes a song id as an argument.
- When called, 'onPlay' first checks if the user is authenticated. If the user is not authenticated, it opens the authentication modal and returns.
- Then it checks if the user is subscribed. If the user is not subscribed, it opens the subscription modal and returns.
- If the user is both authenticated and subscribed, it sets the current song id in the player state, and the ids of all the songs in the 'songs' array in the player state.

*/

import { Song } from "@/types";

import usePlayer from "./usePlayer";
import useSubscribeModal from "./useSubscribeModal";
import useAuthModal from "./useAuthModal";
import { useUser } from "./useUser";

const useOnPlay = (songs: Song[]) => {
    const player = usePlayer();
    const subscribeModal = useSubscribeModal();
    const authModal = useAuthModal();
    const { subscription, user } = useUser();

    const onPlay = (id: string) => {
        // If user is not authenticated, open auth modal
        if (!user) {
            return authModal.onOpen();
        }

        // If user is not subscribed, open subscribe modal
        if (!subscription) {
            return subscribeModal.onOpen();
        }

        // Set current song id and list of song ids in the player state
        player.setId(id);
        player.setIds(songs.map((song) => song.id));
    }

    return onPlay;
};

export default useOnPlay;
