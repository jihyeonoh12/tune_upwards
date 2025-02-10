const toggleLike = (id, data, setFavorites) => {
    setFavorites((prev) => {
      const updated = { ...prev };
  
      if (updated[id] && updated[id].liked) {
        delete updated[id]; 
      } else {
        updated[id] = {
          liked: !(prev[id]?.liked || false),
          detail: { ...data },
        };
      }
      localStorage.setItem('tune_upwards', JSON.stringify(updated));
      return updated;
    });
  };

  export default toggleLike;