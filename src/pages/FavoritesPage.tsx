import { useState, useEffect, useCallback, useContext } from 'react';
import { AlbumContext } from '../contexts/AlbumContext';
import { AlbumCard } from "../components/AlbumCard"


export const FavoritesPage = () => {
    const { favorites } = useContext(AlbumContext);

    if(Object.keys(favorites).length === 0) <></>;
    return (
        <div className="container">
            <div className="flex">
            {Object.values(favorites).map((content) => (
                <AlbumCard 
                id={content.detail.collectionId}
                name={content.detail.collectionName}
                image={content.detail.artworkUrl60} 
                artist={content.detail.artistName}
                layout="horizontal"
                />
            ))}
            </div>
        </div>
    )
}