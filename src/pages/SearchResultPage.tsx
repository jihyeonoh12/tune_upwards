import { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { searchAlbums } from '../utilities/searchAlbums';
import AlbumContext from '../contexts/AlbumContext';
import { AlbumCard } from "../components/AlbumCard";
import { Album } from '../types/index.js';

export const SearchResultPage = () => {
    const location = useLocation();
    const { albums } = useContext(AlbumContext);
    const [filteredAlbums, setFilteredAlbums] = useState<Album[]>([]);
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const input = searchParams.get('input')|| '';

        if(input) {
        setSearchInput(input);

        const result = searchAlbums(albums, input);
          setFilteredAlbums(result);
        } else {
          setFilteredAlbums([]);
        }
      }, [location.search, albums]);
    
    return (
    <div className='container lg search-page'>
      {filteredAlbums.length === 0 ? (
        <div className='text-box'>
           <h1>No matches were found</h1>
           <p>Please try other inputs</p>
        </div>
      ) : (
        <div className='text-box'>
          <h1>Search result for...</h1>
          <p>{searchInput}</p>
        </div>
      )}
        <div className='album-lists'>
          <div className='flex'>
          {filteredAlbums.map((album) => (
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
        </div>
    </div>
    )
}