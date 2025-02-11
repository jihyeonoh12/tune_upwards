import { useEffect, useState, useContext, useRef } from 'react';
import { fetchSongs } from '../utilities/api.ts'
import { useParams } from 'react-router-dom';
import { Song, Collection } from '../types/index.js';
import { SongCard } from '../components/SongCard.js';
import AlbumContext from '../contexts/AlbumContext';
import toggleLike from "../utilities/toggleLike";
import noAlbumCover from "../assets/noAlbumCover.jpg"
import "../styles/AlbumDetail.css"


export const AlbumPage = () => {
    const { id } = useParams(); 
    const { favorites, setFavorites } = useContext(AlbumContext);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [currentTrack, setCurrentTrack] = useState("");
    const [album, setAlbum] = useState<Collection>({
        collectionName: '',
        artworkUrl60: '',
        artistName: '',
        primaryGenreName: '',
        collectionViewUrl: '',
        artistViewUrl: '',
        collectionId: 0,
        releaseDate: ''
    });
    const [imgSrc, setImgSrc] = useState(noAlbumCover);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [likedIcon, setLikedIcon] = useState(false);

    // const likedIcon = favorites[id] && favorites[id].liked;


    useEffect(() => {
        window.scrollTo(0, 0);

        const getSongs = async () => {
            try {
             setLoading(true);
              const response = await fetchSongs(id as string);
              setSongs(response.results);
              setAlbum(response.results[0]);
              setImgSrc((response.results[0].artworkUrl60).split("jpg/")[0] + 'jpg/400x400bb.jpg');

            } catch (err) {
                setError("Error Fetching Album Detail")
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getSongs()
    },[id])

    useEffect(() => {
        if(id) {
            setLikedIcon(favorites[parseInt(id)] && favorites[parseInt(id)].liked)
        }
    }, [favorites, id])

    const handleError = () => {
        setImgSrc(noAlbumCover);
    };

    const handleTrackClick = (track : string) => {
        if (audioRef.current) {
          audioRef.current.pause();
          setCurrentTrack(track);
          audioRef.current.load();
          audioRef.current.play();
        }
      };

    if(loading) return <div className='loading-box'><h1>Loading...</h1></div>
    if(error || songs.length === 0) return <div>{error}</div>
    
    return (
        <div className='container album-detail'>
            <div className='inner-container'>
                <img 
                width="400" height="400" 
                src={imgSrc} 
                alt={album.collectionName + '-album_cover'} 
                loading="lazy"
                onError={handleError}
                />
                <div className='text-box'>
                    <div>
                        <h5>{album.primaryGenreName}</h5>
                        <h2>{album.collectionName}</h2>
                        <h4>{album.artistName}</h4>
                        {/* <p>{album.copyright}</p> */}
                        <p>Released : {(album.releaseDate).split("T")[0]}</p>
                    </div>
                    <div className='button-box'>
                    <button className="btn like-btn" onClick={() => {toggleLike(parseInt(id as string) ,album, setFavorites)}} >
                        <h4 className={`text-${likedIcon ? 'danger' : 'dark'}`}>Like
                        <i className={`bi bi-heart${likedIcon ? '-fill' : ''}`}></i>
                        </h4>
                    </button>
                    <a className='link' href={album.collectionViewUrl} target="_blank">Go to iTunes</a>

                    </div>
                    <audio className='playbar' controls ref={audioRef}>
                    <source src={currentTrack} type="audio/mpeg" />
                    Your browser does not support the audio element.
                    </audio>
                </div>
                
            </div>
            <div className='container song-list'>
            {songs.map((song, index) => (
               <div>
                    {index !== 0 && (
                        <SongCard 
                        preview={song.previewUrl}
                        name={song.trackName}
                        artist={song.artistName}
                        handleTrackClick={handleTrackClick}
                        />
                )}
                </div>
            ))}
            </div>

        </div>
    )
}