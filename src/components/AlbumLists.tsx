import { useRef, useEffect } from 'react';
import { Album } from "../types";
import { AlbumCard } from "./AlbumCard";
import "../styles/AlbumLists.css"


export const AlbumLists = ({
    visibleAlbums, 
    offset, 
    totalNumber,
    loadMore,
    handleSort,
} : {
    visibleAlbums: Album[], 
    offset: number, 
    totalNumber: number,
    loadMore:() => void,
    handleSort:(prop: string) => void
}) => {
    const observerRef = useRef<HTMLDivElement | null>(null);
    const selectOptions = ["Most Popular", "Newest", "Oldest", "Artist A-Z", "Artist Z-A", 'Album A-Z', "Album Z-A"]

    useEffect(() => {
        const target = observerRef.current;
        if (!target) return;
    
        const observer = new IntersectionObserver(
          (entries) => {
            if (entries[0].isIntersecting) {
                console.log('test');
                loadMore();
            }
          },
          { threshold: 0.3 }
        );
        observer.observe(target);
        
        if(offset === 100) {
            observer.disconnect();
        }
        return () => observer.disconnect(); 
      }, [loadMore, offset, visibleAlbums]);

      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      };

    if(visibleAlbums.length === 0) return <div className='album-lists loading'>Loading...</div>

    return (
        <div className="album-lists">
            <div className='custom-select'>
             <select className='sort' onChange={(e) => handleSort((e.target.value))}>
               {selectOptions.map((option) => (
                    <option key={option} value={option}>{option}</option>
               ))}
               
             </select>
             </div>
            <div className="grid">
            {visibleAlbums.map((album) => (
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
            { offset < totalNumber ? (
            <div ref={observerRef} className='loading-box'>
                <h2>Loading...</h2>
            </div>
            ) : (
                <div className='loading-box'>
                <button className='btn' onClick={scrollToTop}>
                    Scroll to Top
                </button>
                </div>
            )}            
        </div>
    )
}

