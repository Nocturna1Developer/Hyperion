/*
useLoadSongUrl.tsx:

- This is a custom React hook that retrieves the public URL of a given song from the Supabase storage.
- It uses the 'useSupabaseClient' hook from the '@supabase/auth-helpers-react' library to access the Supabase client.

Details:

- The hook receives a 'song' object as an argument, which should contain the path of the song in the Supabase storage ('song.song_path').
- If the 'song' object is null or undefined, the hook returns an empty string.
- The hook uses the 'getPublicUrl' method from the Supabase client's storage API to retrieve the public URL of the song.
- The hook returns the public URL of the song.
*/

import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Song } from "@/types";

const useLoadSongUrl = (song: Song) => {
    const supabaseClient = useSupabaseClient();

    // If song is not provided, return an empty string
    if (!song) {
        return '';
    }

    // Fetch the public URL of the song from Supabase storage
    const { data: songData } = supabaseClient
        .storage
        .from('songs')
        .getPublicUrl(song.song_path);

    // Return the public URL of the song
    return songData.publicUrl;
};

export default useLoadSongUrl;
