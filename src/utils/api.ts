const API_URL = process.env.NODE_ENV === "development"
  ? "http://localhost:3031/api/" 
  : "https://tune-upwards.onrender.com/api/"


const fetchTopItuneAlbums = async () => {
    try {
        const response = await fetch(`${API_URL}us/rss/topalbums/limit=100/json`)
        if(!response.ok) throw new Error("error fetching iTune data");
        const results = await response.json();
        return results;

    } catch (err) {
        console.error(err);
    }
}

const fetchSongs = async (albumId : string) => {
    try {  
        const response = await fetch(`${API_URL}lookup?id=${albumId}&entity=song`);
        if(!response.ok) throw new Error("error fetching song preview");

        const data = await response.json();

        return data;
    } catch (error) {
        console.error("Error fetching songs:", error);
    }
}

export { fetchTopItuneAlbums, fetchSongs };