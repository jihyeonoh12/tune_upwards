import { useNavigate } from 'react-router-dom';
import '../styles/HeroBanner.css'

export const HeroBanner = ({searchInput, setSearchInput} : { searchInput: string, setSearchInput: (prop: string) => void}) => {
    const navigate = useNavigate();


   const handleSearch = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    navigate({
        pathname: '/search/',
        search: `?input=${encodeURIComponent(searchInput.trim())}`,
      });
   }
   
    return (
        <div className="hero-banner">
            {/* <div className="layer-bg"> */}
            <div className="text-box">
                <div className="content">
                <h1 className="title">
                    iTunes Top Albums
                </h1>
                <p>Find Your Next Favorite Album</p>
                </div>
                    <form className="search-form" onSubmit={(e) => handleSearch(e)}>
                        <input type="text" placeholder="Search album, artist..." onChange={(e) => setSearchInput(e.target.value)}/>
                        <button className='btn'>Search</button>
                    </form>
            </div>
            {/* </div> */}
        </div>
    )
}