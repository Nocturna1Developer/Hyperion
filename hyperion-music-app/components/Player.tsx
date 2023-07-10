/*
Player.tsx:

- This is a React Functional Component that handles the player state and renders the 'PlayerContent' component.
- The component uses the 'usePlayer', 'useGetSongById', and 'useLoadSongUrl' hooks to get the current song and its URL.

Details:

- The 'usePlayer' hook is used to access the player state, including the active song id.
- The 'useGetSongById' hook is used to fetch the active song data using its id.
- The 'useLoadSongUrl' hook is used to get the URL of the active song.
- The 'PlayerContent' component is rendered with the song data and URL as props.

*/

"use client";

import usePlayer from "@/hooks/usePlayer";
import useLoadSongUrl from "@/hooks/useLoadSongUrl";
import useGetSongById from "@/hooks/useGetSongById";

import PlayerContent from "./PlayerContent";

const Player = () => {
    const player = usePlayer();
    const { song } = useGetSongById(player.activeId);

    const songUrl = useLoadSongUrl(song!);

    // If the song or the song's URL doesn't exist or there is no active song, do not render the component
    if (!song || !songUrl || !player.activeId) {
        return null;
    }

    return (
        <div
            className="
        fixed 
        bottom-0 
        bg-black 
        w-full 
        py-2 
        h-[80px] 
        px-4
      "
        >
            <PlayerContent key={songUrl} song={song} songUrl={songUrl} />
        </div>
    );
}

export default Player;
