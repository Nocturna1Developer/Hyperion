/**
 * LikeButton.tsx:
 *
 * This is a React Functional Component that allows users to like and unlike a song.
 * The component uses the user's context and session context to track and modify the liked songs.
 * 
 * Details:
 * 
 * - The component receives a 'songId' prop which is the id of the song.
 * - It uses the 'useUser' hook to get the current user and the 'useSessionContext' to get the Supabase client.
 * - It uses the 'useEffect' hook to fetch the user's liked songs when the component is rendered.
 * - When the like button is clicked, the component checks if the user is authenticated. If not, it shows the authentication modal.
 * - If the user is authenticated, it adds or removes the song from the user's liked songs based on the current like state.
 * - After the like operation, it refreshes the page to show the updated like state.
 */

"use client";

// Necessary imports
import { useEffect, useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useSessionContext } from "@supabase/auth-helpers-react";

import { useUser } from "@/hooks/useUser";
import useAuthModal from "@/hooks/useAuthModal";

// Define the props interface for LikeButton component
interface LikeButtonProps {
    songId: string;
};

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
    const router = useRouter();
    const { supabaseClient } = useSessionContext();
    const authModal = useAuthModal();
    const { user } = useUser();

    // State to track if the song is liked by the user
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        // Fetch the liked songs of the user if the user is authenticated
        if (user?.id) {
            const fetchData = async () => {
                const { data, error } = await supabaseClient
                    .from('liked_songs')
                    .select('*')
                    .eq('user_id', user.id)
                    .eq('song_id', songId)
                    .single();

                if (!error && data) {
                    setIsLiked(true);
                }
            };

            fetchData();
        }
    }, [songId, supabaseClient, user?.id]);

    // Choose the appropriate icon based on the like state
    const Icon = isLiked ? AiFillHeart : AiOutlineHeart;

    const handleLike = async () => {
        // Check if the user is authenticated
        if (!user) {
            // If not, show the authentication modal
            return authModal.onOpen();
        }

        // Perform the appropriate like operation based on the current like state
        if (isLiked) {
            const { error } = await supabaseClient
                .from('liked_songs')
                .delete()
                .eq('user_id', user.id)
                .eq('song_id', songId);

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(false);
            }
        } else {
            const { error } = await supabaseClient
                .from('liked_songs')
                .insert({
                    song_id: songId,
                    user_id: user.id,
                });

            if (error) {
                toast.error(error.message);
            } else {
                setIsLiked(true);
                toast.success('Success');
            }
        }

        // Refresh the page to show the updated like state
        // router.refresh();
    };

    return (
        <button
            className="cursor-pointer hover:opacity-75 transition"
            onClick={handleLike}
        >
            <Icon color={isLiked ? '#4B0082' : 'white'} size={25} />
        </button>
    );
};

export default LikeButton;
