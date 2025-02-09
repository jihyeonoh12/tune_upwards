export const SongCard = ({
    preview,
    name,
    artist
} : {
    preview: string, 
    name: string,
    artist: string
}) => {
    if (!name) return <></>;

    return (
        <div className="flex">
            <div className="">
                <h4>{name}</h4>
                <p>{artist}</p>
            </div>
            <audio controls>
            <source src={preview} type="audio/mpeg" />
            Your browser does not support the audio element.
            </audio>
        </div>
    )
}