import { useState, useEffect, useCallback, useContext } from 'react';
import { HorizonList } from '../components/HorizonList.js';
import { AlbumLists } from '../components/AlbumLists.js';
import { HeroBanner } from '../components/HeroBanner.js';
import { Album } from '../types/index.js';
import { sortAlbums } from '../utilities/sortAlbums.js';
import { AlbumContext } from '../contexts/AlbumContext';

import "../styles/Dashboard.css"

const Dashboard = () => {
    const { albums, favorites, loading, error } = useContext(AlbumContext);
    const [sortedAlbumList, setSortedAlbumList] = useState<Album[]>([]);
    const [visibleAlbums, setVisibleAlbums] = useState<Album[]>([]);
    const [offset, setOffset] = useState(10);
    const [searchInput, setSearchInput] = useState("");


    useEffect(() => {
        if(albums.length !== 0) {
            setSortedAlbumList(albums);
            setVisibleAlbums(albums.slice(0, 10))
        } 
    }, [albums])

    const handleSort =  (option : string) => {
        setOffset(10);

        const sortedResult = option === "Default" ? albums : sortAlbums(albums, option);
        setSortedAlbumList(sortedResult);
        setVisibleAlbums(sortedResult.slice(0, 10))
    }

    const loadMore = useCallback(() => {
        //I decided to fetch all results and displaying only 10 at a time(imitaing fetch call)
        //Because iTunes RSS API does not support pagination and would need to fetch from 0 everytime
        setTimeout(() => {
            setVisibleAlbums((prev) => [...prev, ...sortedAlbumList.slice(prev.length, prev.length + 10)]);
            setOffset((prev) => prev + 10);
        }, 500);
      }, [sortedAlbumList])


    if(loading) return <div>Loading...</div>
    if(error) return <div>{error}</div>
    
    return (
        <div className='dashboard'>
            <HeroBanner 
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            />
            <div className='dashboard-body'>
                {Object.keys(favorites).length > 0 && (
            <HorizonList title={"Your Favorites "} />

                 )} 
            <AlbumLists 
            title={"Top Album List"} 
            albums={visibleAlbums} 
            offset={offset} 
            loadMore={loadMore} 
            handleSort={handleSort}/>
            </div>
   
        </div>
    )
}

export default Dashboard