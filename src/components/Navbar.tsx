import { Link } from 'react-router-dom';
import { useContext } from "react";
import { AlbumContext } from '../contexts/AlbumContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { favorites } = useContext(AlbumContext);

  return (
    <nav className="navbar">
    <div className='container-lg'>
        <Link className='home' to="/">TuneUpwards</Link>
      {Object.keys(favorites).length > 0 && (
           <Link to="/favorites">Favorites</Link>
      )}
    </div>
    </nav>

  );
};

export default Navbar;
