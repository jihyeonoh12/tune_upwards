import { useEffect, useState, useContext } from 'react';
import { fetchSongs } from '../utilities/api.js'
import { useParams } from 'react-router-dom';
import { Song, Collection } from '../types/index.js';
import { SongCard } from '../components/SongCard.js';
import { AlbumContext } from '../contexts/AlbumContext';
import toggleLike from "../utilities/toggleLike";
import { AudioProvider } from '../contexts/AudioContext.js';
import noAlbumCover from "../assets/noAlbumCover.jpg"


import "../styles/AlbumDetail.css"


export const AlbumPage = () => {
    const { id } = useParams(); 
    const { favorites, setFavorites } = useContext(AlbumContext);
    const [songs, setSongs] = useState<Song[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [album, setAlbum] = useState<Collection>({
        collectionName: '',
        artworkUrl60: '',
        artistName: '',
        primaryGenreName: '',
        collectionViewUrl: '',
        artistViewUrl: ''
    });

    const [imgSrc, setImgSrc] = useState((album.artworkUrl60).split("jpg/")[0] + 'jpg/400x400bb.jpg');

    const likedIcon = favorites[id] && favorites[id].liked;


    useEffect(() => {
        window.scrollTo(0, 0);

        const getSongs = async () => {
            try {
             setLoading(true);
              const response = await fetchSongs(id);
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


    const handleError = () => {
        setImgSrc(noAlbumCover);
    };

    if(loading) return <div className='loading-box'><h1>Loading...</h1></div>
    if(error || songs.length === 0) return <div>{error}</div>
    
    return (
        <div className='container album-detail'>
            <div className='inner-container'>
                <img 
                src={imgSrc} 
                alt={album.collectionName + '-album_cover'} 
                loading="lazy"
                onError={handleError}
                />
                <div className='text-box'>
                    <div>
                    <h5>Genre : {album.primaryGenreName}</h5>

                    <h2>{album.collectionName}</h2>
                    <h4>{album.artistName}</h4>
                    <p>{album.copyright}</p>
                    <p>Released : {(album.releaseDate).split("T")[0]}</p>

                        
                    <a className='link' href={album.collectionViewUrl}>Go to iTunes</a>
                    </div>
                    <button className="btn like-btn" onClick={() => {toggleLike(id ,album, setFavorites)}} >
                        <h4 className={`text-${likedIcon ? 'danger' : 'dark'}`}>Like
                        <i className={`bi bi-heart${likedIcon ? '-fill' : ''}`}></i>
                        </h4>
                    </button>
                </div>
                
            </div>
            <div className='container song-list'>
            <AudioProvider>
            {songs.map((song, index) => (
               <div>
                    {index !== 0 && (

                        <SongCard 
                        preview={song.previewUrl}
                        name={song.trackName}
                        artist={song.artistName}
                        />

                )}
                </div>
            ))}
            </AudioProvider>
            </div>

        </div>
    )
}