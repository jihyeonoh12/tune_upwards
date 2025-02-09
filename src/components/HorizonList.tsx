import { Link } from "react-router-dom";

import { AlbumCard } from "./AlbumCard"
import { useContext } from "react";
import { AlbumContext } from '../contexts/AlbumContext';
import '../styles/HorizontalList.css'


export const HorizonList = ({title} : {title: string}) => {
    const { favorites } = useContext(AlbumContext);

    if(Object.keys(favorites).length === 0) <></>;

    return (
        <div className="container">
            <div className="title-box">
                <h4>
                {title}{
                title === 'Your Favorites ' && (
                    <i className="bi bi-heart-fill"></i>
                )}</h4>
                {Object.keys(favorites).length > 4 && (
                    <Link className="btn" to={'/favorites'} >
                        View More
                    </Link>
                )}
        

            </div>
            <div className="flex">
            {Object.values(favorites).slice(0, 5).map((content) => (
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