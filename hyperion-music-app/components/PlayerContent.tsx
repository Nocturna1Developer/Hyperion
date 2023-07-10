/*
PlayerContent.tsx:

- This is a React Functional Component that handles the state and logic of the media player's content.
- The component uses the 'usePlayer' hook for getting the playlist data and 'useSound' hook for handling the playback of the sound.

Details:

- The 'usePlayer' hook is used to access the playlist data, including the active song id and the list of all songs' ids.
- The 'useSound' hook is used to play, pause, and manage other sound events such as playback ended.
- The component receives 'song' and 'songUrl' as props.
- The 'song' prop is the data of the active song.
- The 'songUrl' prop is the URL of the active song's file.
- The state 'volume' is used to manage the volume of the player.
- The state 'isPlaying' is used to handle the playback state of the player.
- The 'onPlayNext' and 'onPlayPrevious' functions handle the logic for playing the next and previous songs respectively.
- The 'handlePlay' function toggles the playback state of the player.
- The 'toggleMute' function toggles the mute state of the player.

*/
"use client";

// Import necessary dependencies
import useSound from "use-sound";
import { useEffect, useState } from "react";
import { BsPauseFill, BsPlayFill } from "react-icons/bs";
import { HiSpeakerWave, HiSpeakerXMark } from "react-icons/hi2";
import { AiFillStepBackward, AiFillStepForward } from "react-icons/ai";

// Import custom types, hooks, and components
import { Song } from "@/types";
import usePlayer from "@/hooks/usePlayer";
import LikeButton from "./LikeButton";
import MediaItem from "./MediaItem";
import Slider from "./Slider";

// Define the props this component will receive
interface PlayerContentProps {
    song: Song;
    songUrl: string;
}

const PlayerContent: React.FC<PlayerContentProps> = ({
    song,
    songUrl
}) => {
    // Setup state and hooks
    const player = usePlayer();
    const [volume, setVolume] = useState(1);
    const [isPlaying, setIsPlaying] = useState(false);

    // Select appropriate icon based on current player state
    const Icon = isPlaying ? BsPauseFill : BsPlayFill;
    const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

    // Function to play the next song in the player
    const onPlayNext = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const nextSong = player.ids[currentIndex + 1];

        if (!nextSong) {
            return player.setId(player.ids[0]);
        }

        player.setId(nextSong);
    }

    // Function to play the previous song in the player
    const onPlayPrevious = () => {
        if (player.ids.length === 0) {
            return;
        }

        const currentIndex = player.ids.findIndex((id) => id === player.activeId);
        const previousSong = player.ids[currentIndex - 1];

        if (!previousSong) {
            return player.setId(player.ids[player.ids.length - 1]);
        }

        player.setId(previousSong);
    }

    // Setup sound with useSound hook
    const [play, { pause, sound }] = useSound(
        songUrl,
        {
            volume: volume,
            onplay: () => setIsPlaying(true),
            onend: () => {
                setIsPlaying(false);
                onPlayNext();
            },
            onpause: () => setIsPlaying(false),
            format: ['mp3']
        }
    );

    // Start playing the sound when the component is first rendered
    useEffect(() => {
        sound?.play();

        return () => {
            sound?.unload();
        }
    }, [sound]);

    // Function to handle play/pause click
    const handlePlay = () => {
        if (!isPlaying) {
            play();
        } else {
            pause();
        }
    }

    // Function to toggle mute/unmute
    const toggleMute = () => {
        if (volume === 0) {
            setVolume(1);
        } else {
            setVolume(0);
        }
    }

    return (
        <div className="grid grid-cols-2 md:grid-cols-3 h-full">
            <div className="flex w-full justify-start">
                <div className="flex items-center gap-x-4">
                    <MediaItem data={song} />
                    <LikeButton songId={song.id} />
                </div>
            </div>

            <div
                className="
            flex 
            md:hidden 
            col-auto 
            w-full 
            justify-end 
            items-center
          "
            >
                <div
                    onClick={handlePlay}
                    className="
              h-10
              w-10
              flex 
              items-center 
              justify-center 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
                >
                    <Icon size={30} className="text-black" />
                </div>
            </div>

            <div
                className="
            hidden
            h-full
            md:flex 
            justify-center 
            items-center 
            w-full 
            max-w-[722px] 
            gap-x-6
          "
            >
                <AiFillStepBackward
                    onClick={onPlayPrevious}
                    size={30}
                    className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
                />
                <div
                    onClick={handlePlay}
                    className="
              flex 
              items-center 
              justify-center
              h-10
              w-10 
              rounded-full 
              bg-white 
              p-1 
              cursor-pointer
            "
                >
                    <Icon size={30} className="text-black" />
                </div>
                <AiFillStepForward
                    onClick={onPlayNext}
                    size={30}
                    className="
              text-neutral-400 
              cursor-pointer 
              hover:text-white 
              transition
            "
                />
            </div>

            <div className="hidden md:flex w-full justify-end pr-2">
                <div className="flex items-center gap-x-2 w-[120px]">
                    <VolumeIcon
                        onClick={toggleMute}
                        className="cursor-pointer"
                        size={34}
                    />
                    <Slider
                        value={volume}
                        onChange={(value) => setVolume(value)}
                    />
                </div>
            </div>

        </div>
    );
}

export default PlayerContent;
