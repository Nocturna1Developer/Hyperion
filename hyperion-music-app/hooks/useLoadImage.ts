/*
useLoadImage.tsx:

This hook is used to load the image associated with a song in the music library.
It uses the supabase client from '@supabase/auth-helpers-react' to interact with the supabase backend.
The hook takes a song object as an argument and extracts the image path from the song data.

Details:

The hook starts by getting a reference to the Supabase client using the useSupabaseClient() hook.
If the provided song is null, the hook will return null.
If a song object is provided, the hook uses the Supabase client to get the public URL of the song's associated image from the 'images' storage bucket in Supabase.
The URL is then returned for use by the caller.
This hook is useful when you need to display the images associated with the songs in a music library, like in a media player interface.
*/

import { useSupabaseClient } from "@supabase/auth-helpers-react";

import { Song } from "@/types";

const useLoadImage = (song: Song) => {
    // Acquire an instance of the Supabase client
    const supabaseClient = useSupabaseClient();

    // If there's no song, return null
    if (!song) {
        return null;
    }

    // Get the public URL of the song's associated image
    const { data: imageData } = supabaseClient
        .storage
        .from('images')
        .getPublicUrl(song.image_path);

    // Return the public URL for use by the caller
    return imageData.publicUrl;
};

export default useLoadImage;