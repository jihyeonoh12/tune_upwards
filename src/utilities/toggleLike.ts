import { Liked, Collection } from '../types/index.js';
type SetFavorites = React.Dispatch<React.SetStateAction<Liked>>;


const toggleLike = (id : number, data: Collection, setFavorites: SetFavorites) => {
    setFavorites((prev : Liked) => {
      const updated = { ...prev };
  
      if (updated[id] && updated[id].liked) {
        delete updated[id]; 
      } else {
        updated[id] = {
          liked: !(prev[id]?.liked || false),
          detail: { ...data},
        };
      }
      localStorage.setItem('tune_upwards', JSON.stringify(updated));
      return updated;
    });
  };

  export default toggleLike;