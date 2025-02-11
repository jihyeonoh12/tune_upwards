import { Album } from '../types/index.js';


export const sortAlbums = (albums : Album[], option: string) => {

return [...albums].sort((a, b) => {
    if (option === "Artist A-Z") {
      return a["im:artist"].label.localeCompare(b["im:artist"].label);
    } else if (option === "Artist Z-A") {
      return b["im:artist"].label.localeCompare(a["im:artist"].label);
    } else if (option === "Album A-Z") {
      return a["im:name"].label.localeCompare(b["im:name"].label);
    } else if (option === "Album Z-A") {
      return b["im:name"].label.localeCompare(a["im:name"].label);
    } else if (option === "Oldest") {
      return new Date(a["im:releaseDate"].attributes.label).getTime() - new Date(b["im:releaseDate"].attributes.label).getTime();
    } else if (option === "Newest") {
      return new Date(b["im:releaseDate"].attributes.label).getTime() - new Date(a["im:releaseDate"].attributes.label).getTime();
    } 
    return 0;
  });

  // return sortedList

}