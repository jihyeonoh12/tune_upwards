import { useContext } from 'react';
import AlbumContext from '../contexts/AlbumContext';
import { AlbumCard } from "../components/AlbumCard"
import "../styles/AlbumLists.css"

export const FavoritesPage = () => {
    const { favorites } = useContext(AlbumContext);

    if(Object.keys(favorites).length === 0) <></>;
    return (
        <div className="favorite-page container lg">
            {Object.keys(favorites).length === 0 ? (
                <h1>Start adding albums you love</h1>
            ) : (
                <h1>Your Top Tunes</h1>
            )}
           
            <div className="album-lists">
                <div className='flex'>
            {Object.values(favorites).map((content) => (
                <AlbumCard 
                id={content.detail.collectionId}
                name={content.detail.collectionName}
                image={content.detail.artworkUrl60} 
                artist={content.detail.artistName}
                layout={'album'}
                />
            ))}
            </div>
            </div>
        </div>
    )
}