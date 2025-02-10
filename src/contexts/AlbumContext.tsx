import { createContext, useState, useEffect, ReactNode } from 'react';
import {fetchTopItuneAlbums} from '../utilities/api.js'
import { Album, Liked } from '../types/index.js';


export const AlbumContext = createContext();

export const AlbumProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<Liked>({});


  useEffect(() => {
    const savedData = localStorage.getItem('tune_upwards') ? JSON.parse(localStorage.getItem('tune_upwards')) : {};
    setFavorites(savedData);

    const fetchData = async () => {
        try {
            setLoading(true);
            const results = await fetchTopItuneAlbums();
            if(results.feed.entry) {
                setAlbums(results.feed.entry);
            }
        } catch(error) {
            setError("Error Fetching Data");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }
    fetchData();
  }, []);

  return (
    <AlbumContext.Provider value={{ albums, loading, setLoading, favorites, setFavorites, error }}>
      {children}
    </AlbumContext.Provider>
  );
};
