import { useRef, useEffect } from 'react';
import { Album } from "../types";
import { AlbumCard } from "./AlbumCard";
import "../styles/AlbumLists.css"


export const AlbumLists = ({
    title, 
    albums, 
    offset, 
    loadMore,
    handleSort,
} : {
    title: string, 
    albums: Album[], 
    offset:number, 
    loadMore:() => void,
    handleSort:(prop: string) => void
}) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const selectOptions = ["Default", "Newest", "Oldest", "Artist A-Z", "Artist Z-A", 'Album A-Z', "Album Z-A"]

    useEffect(() => {
        const target = observerRef.current;
        if (!target) return;
    
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
                loadMore();
            }
          },
          { threshold: 1.0 }
        );
        observer.observe(target);
        
        if(offset === 100) {
            observer.disconnect();
        }
        return () => observer.disconnect(); 
      }, [albums, loadMore, offset]);


    if(albums.length === 0) <></>;

    return (
        <div className="album-lists container">
            <div className='title-box'>
             <h4>{title}</h4>
             <select onChange={(e) => handleSort((e.target.value))}>
               {selectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
               ))}
               
             </select>
             </div>
            <div className="">
            {albums.map((album) => (
                <AlbumCard 
                id={album.id.attributes["im:id"]}
                image={album['im:image'][2].label} 
                name={album['im:name'].label}
                artist={album['im:artist'].label}
                releaseDate={album['im:releaseDate'].attributes.label}
                layout={'album'}
                />
            ))}
            </div>
            { offset < 60 ? (
            <div ref={observerRef} className=''>
                <h2>Loading...</h2>
            </div>
            ) : (
                <button>
                    Scroll to Top
                </button>
            )}            
        </div>
    )
}

