import { createContext, useState, useEffect, ReactNode } from 'react';
import {fetchTopItuneAlbums} from '../utilities/api.ts'
import { Album, Liked } from '../types/index.js';

interface AlbumContextType {
  albums : Album[],
  loading: boolean,
  setLoading: (prop: boolean) => void,
  favorites: Liked,
  setFavorites: (prop: Liked) => void,
  error: string
}

const defaultContext: AlbumContextType = {
  albums: [],
  loading: false,
  setLoading: () => {},
  favorites: {},
  setFavorites: () => {},
  error: '',
};

const AlbumContext = createContext<AlbumContextType>(defaultContext);

export const AlbumProvider = ({ children }: { children: ReactNode }) => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState<Liked>({});


  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('tune_upwards') || '{}');
    setFavorites(() => ({
    ...savedData
  }));

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
export default AlbumContext;