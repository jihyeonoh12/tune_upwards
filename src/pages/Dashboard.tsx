import { useState, useEffect, useCallback, useContext } from 'react';
import { sortAlbums } from '../utils/sortAlbums';
import AlbumContext from '../contexts/AlbumContext';
import { AlbumLists } from '../components/AlbumLists';
import { HeroBanner } from '../components/HeroBanner';
import { Album } from '../types/index';

const Dashboard = () => {
    const { albums, error } = useContext(AlbumContext);
    const [sortedAlbumList, setSortedAlbumList] = useState<Album[]>([]);
    const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);
    const [offset, setOffset] = useState(10);
    const [searchInput, setSearchInput] = useState("");
    const [totalNumber, setTotalNumber] = useState(0);


    useEffect(() => {
        window.scrollTo(0, 0);

        if(albums.length !== 0) {
            setSortedAlbumList(albums);
            setVisibleAlbums(albums.slice(0, 10))
            setTotalNumber(albums.length);
        } 
    }, [albums])

    const handleSort = useCallback((option : string) => {
        setOffset(10);
        const sortedResult = option === "Most Popular" ? albums : sortAlbums(albums, option);
        setSortedAlbumList(sortedResult);
        setVisibleAlbums(sortedResult.slice(0, 10))
    }, [albums])

    const loadMore = useCallback(() => {
        //I decided to fetch all results and displaying only 10 at a time(imitaing fetch call)
        //Because iTunes RSS API does not support pagination and would need to fetch from 0 everytime
        setTimeout(() => {
            setVisibleAlbums((prev) => [...prev, ...sortedAlbumList.slice(prev.length, prev.length + 10)]);
            setOffset((prev) => prev + 10);
        }, 500);
      }, [sortedAlbumList])


    if(error) return <div className='error container'><h2>{error}</h2></div>
    
    return (
        <div className='dashboard'>
            <HeroBanner 
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            />
            <div className='dashboard-body'>
            <AlbumLists 
            visibleAlbums={visibleAlbums} 
            offset={offset} 
            totalNumber={totalNumber}
            loadMore={loadMore} 
            handleSort={handleSort}
            />
            </div>
   
        </div>
    )
}

export default Dashboard