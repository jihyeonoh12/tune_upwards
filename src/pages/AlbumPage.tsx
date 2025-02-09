import { useEffect, useState, useContext } from 'react';
import { fetchSongs } from '../utilities/api.js'
import { useParams } from 'react-router-dom';
import { Song, Collection } from '../types/index.js';
import { SongCard } from '../components/SongCard.js';
import { AlbumContext } from '../contexts/AlbumContext';
import toggleLike from "../utilities/toggleLike";


export const AlbumPage = () => {
    const { id } = useParams(); 
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

    const { favorites, setFavorites } = useContext(AlbumContext);
    const likedIcon = favorites[id] && favorites[id].liked;


    useEffect(() => {
        const getSongs = async () => {
            try {
             setLoading(true);
              const response = await fetchSongs(id);
              setSongs(response.results);
              setAlbum(response.results[0]);
            } catch (err) {
                setError("Error Fetching Album Detail")
                console.error(err);
            } finally {
                setLoading(false);
            }
        }
        getSongs()
    },[id])

    console.log('favorites');

    console.log(favorites);

    if(loading) return <div>Loading...</div>
    if(error || songs.length === 0) return <div>{error}</div>
    
    return (
        <div>
            <div>
                <img src={(album.artworkUrl60).split("jpg/")[0] + 'jpg/1000x1000bb.jpg'} alt="" />
                <h2>{album.collectionName}</h2>
               
                <button className="like-btn" onClick={() => {toggleLike(id ,album, setFavorites)}} >
                    <h4 className={`text-${likedIcon ? 'danger' : 'dark'}`}>
                    <i className={`bi bi-heart${likedIcon ? '-fill' : ''}`}></i>
                    </h4>
                </button>
                
            </div>
            {songs.map((song, index) => (
                <div>
                    {index !== 0 && (
                    <div>
                        <SongCard 
                        preview={song.previewUrl}
                        name={song.trackName}
                        artist={song.artistName}
                        />
                    </div>
                )}
                </div>
            ))}
        </div>
    )
}