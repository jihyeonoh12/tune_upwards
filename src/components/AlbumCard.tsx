import { Link } from "react-router-dom";

export const AlbumCard = ({
    id,
    image,
    name,
    artist,
    layout,
    releaseDate
} : {
    id?: string,
    image: string, 
    name: string,
    artist: string,
    layout: string,
    releaseDate?: string
}) => {

    if (!image) return <></>;


    return (
        <Link className={`flex-item card ${layout}`} to={`/album/${id}`}>
            <img src={image.split("jpg/")[0] + 'jpg/300x300bb.jpg'} alt="" />
            <div className="flex text-box">
                <div className="w-200">
                <p>{name}</p>
                <h4>{artist}</h4>
                </div>
                {releaseDate && (
                    <div className="date">{releaseDate}</div>
                )}
            </div>

        </Link>
    )
}