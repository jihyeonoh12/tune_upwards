export const SongCard = ({
    preview,
    name,
    artist,
    handleTrackClick,
} : {
    preview: string, 
    name: string,
    artist: string,
    handleTrackClick: (prop: string) => void
}) => {

    if (!name) return <></>;

    return (
        <div className="song-card" key={"song-" + name}>
            <div className="text">
                <h4>{name}</h4>
                <p>{artist}</p>
            </div>
            <button className="sub_btn" onClick={() => handleTrackClick(preview)}>Play Preview <i className="bi bi-play-circle"></i></button>
        </div>
    )
}