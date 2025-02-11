import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import noAlbumCover from "../assets/noAlbumCover.jpg"

export const AlbumCard = ({
    id,
    image,
    name,
    artist,
    layout,
    releaseDate
} : {
    id: number,
    image: string, 
    name: string,
    artist: string,
    layout: string,
    releaseDate?: string
}) => {
    const [imgScr, setImgScr] = useState(image.split("jpg/")[0] + 'jpg/300x300bb.jpg');

    const handleError = () => {
        setImgScr(noAlbumCover);
    };
    useEffect(() => {
        setImgScr(image.split("jpg/")[0] + 'jpg/300x300bb.jpg');
    }, [image])

    if (!image) return <></>;

    return (
        <Link className={`${layout} card`} to={`/album/${id}`}>

            <div className="album-card">
            <div className="album-card-inner">
                <div className="album-card-front">
                <img 
                width="300" height="300" 
                src={imgScr} 
                alt={name + '-album_cover'} 
                loading="lazy"
                onError={handleError}
                />
                </div>
                <div className="album-card-back">
                <div className="text-box">
                <div>
                <h4>{name}</h4>
                <p>{artist}</p>
                </div>
                {releaseDate && (
                    <h5>{releaseDate}</h5>
                )}
            </div>
                </div>
            </div>
            </div>

        </Link>
    )
}