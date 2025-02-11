import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AlbumProvider } from './contexts/AlbumContext';
import Dashboard from './pages/Dashboard';
import { AlbumPage } from './pages/AlbumPage';
import { SearchResultPage } from "./pages/SearchResultPage";
import { FavoritesPage } from "./pages/FavoritesPage";
import Navbar from "./components/Navbar";
import './App.css'

function App() {

  return (
    <AlbumProvider>
      <Router>
      <Navbar />
        <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/album/:id" element={<AlbumPage />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />

        </Routes>
      </Router>
    </AlbumProvider>

  )
}

export default App
