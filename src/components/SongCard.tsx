import { useRef } from 'react';
import { useAudio } from '../contexts/AudioContext';

export const SongCard = ({
    preview,
    name,
    artist
} : {
    preview: string, 
    name: string,
    artist: string
}) => {
    const { playAudio } = useAudio();
    const audioRef = useRef(null);
  
    const handlePlay = () => {
      playAudio(audioRef.current);
    };

    if (!name) return <></>;

    return (
        <div className="song-card">
            <div className="text">
                <h4>{name}</h4>
                <p>{artist}</p>
            </div>
            <audio 
            controls
            ref={audioRef}
            onPlay={handlePlay}
             >
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    )
}