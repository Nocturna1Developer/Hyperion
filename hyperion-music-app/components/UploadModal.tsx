/*
UploadModal.tsx:

- The UploadModal component is a dialog box that allows users to upload a song.
- It uses Zustand to manage the state of the modal's visibility.
- It uses the Supabase client from the context to interact with the Supabase storage and database.
- It uses the react-hook-form library to manage the form state and perform form validation.
- When a user submits the form, the component uploads the selected song and image to Supabase storage and then adds a new record to the 'songs' table in the Supabase database with the details of the uploaded song and the paths to the uploaded song and image files.
*/

"use client";

import uniqid from "uniqid";
import React, { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

import useUploadModal from '@/hooks/useUploadModal';
import { useUser } from "@/hooks/useUser";

import Modal from './Modal';
import Input from './Input';
import Button from './Button';

const UploadModal = () => {
    // State for loading
    const [isLoading, setIsLoading] = useState(false);

    // Hook to control modal state
    const uploadModal = useUploadModal();

    // Supabase client for database operations
    const supabaseClient = useSupabaseClient();

    // User state
    const { user } = useUser();

    // Router for navigation
    const router = useRouter();

    // React Hook Form setup
    const {
        register,
        handleSubmit,
        reset,
    } = useForm<FieldValues>({
        defaultValues: {
            author: '',
            title: '',
            song: null,
            image: null,
        }
    });

    // Handle close
    const onChange = (open: boolean) => {
        if (!open) {
            reset();
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) => {
        try {
            setIsLoading(true);

            const imageFile = values.image?.[0];
            const songFile = values.song?.[0];

            if (!imageFile || !songFile || !user) {
                toast.error('Missing fields')
                return;
            }

            const uniqueID = uniqid();

            // Upload song
            const {
                data: songData,
                error: songError
            } = await supabaseClient
                .storage
                .from('songs')
                .upload(`song-${values.title}-${uniqueID}`, songFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (songError) {
                setIsLoading(false);
                return toast.error('Failed song upload');
            }

            // Upload image
            const {
                data: imageData,
                error: imageError
            } = await supabaseClient
                .storage
                .from('images')
                .upload(`image-${values.title}-${uniqueID}`, imageFile, {
                    cacheControl: '3600',
                    upsert: false
                });

            if (imageError) {
                setIsLoading(false);
                return toast.error('Failed image upload');
            }


            // Create record 
            const { error: supabaseError } = await supabaseClient
                .from('songs')
                .insert({
                    user_id: user.id,
                    title: values.title,
                    author: values.author,
                    image_path: imageData.path,
                    song_path: songData.path
                });

            if (supabaseError) {
                return toast.error(supabaseError.message);
            }

            router.refresh();
            setIsLoading(false);
            toast.success('Song created!');
            reset();
            uploadModal.onClose();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    // Component render
    return (
        <Modal
            title="Add a song"
            description="Upload an mp3 file"
            isOpen={uploadModal.isOpen}
            onChange={onChange}
        >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-y-4"
            >
                {/* Input field for song title */}
                <Input
                    id="title"
                    disabled={isLoading}
                    {...register('title', { required: true })}
                    placeholder="Song title"
                />

                {/* Input field for song author */}
                <Input
                    id="author"
                    disabled={isLoading}
                    {...register('author', { required: true })}
                    placeholder="Song author"
                />

                {/* Input for song file selection */}
                <div>
                    <div className="pb-1">
                        Select a song file
                    </div>
                    <Input
                        placeholder="test"
                        disabled={isLoading}
                        type="file"
                        accept=".mp3"
                        id="song"
                        {...register('song', { required: true })}
                    />
                </div>

                {/* Input for image selection */}
                <div>
                    <div className="pb-1">
                        Select an image
                    </div>
                    <Input
                        placeholder="test"
                        disabled={isLoading}
                        type="file"
                        accept="image/*"
                        id="image"
                        {...register('image', { required: true })}
                    />
                </div>

                {/* Submit button */}
                <Button disabled={isLoading} type="submit">
                    Create
                </Button>
            </form>
        </Modal>
    );
}

export default UploadModal;
