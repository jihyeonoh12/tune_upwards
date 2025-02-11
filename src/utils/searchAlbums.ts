import { Album } from '../types/index';

export const searchAlbums = (albums: Album[], searchInput: string) => {
    if (!searchInput.trim()) return []; 
    
    return albums.filter(
      (album) =>
        album["im:name"].label.toLowerCase().includes(searchInput.toLowerCase()) || 
        album["im:artist"].label.toLowerCase().includes(searchInput.toLowerCase()) 
    )
};
