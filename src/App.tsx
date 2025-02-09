// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import './App.css'
// import SignIn from './pages/SignIn'
import Dashboard from './pages/Dashboard';
import {AlbumPage} from './pages/AlbumPage';
import { SearchResultPage } from "./pages/SearchResultPage";
import { AlbumProvider } from './contexts/AlbumContext';
import { FavoritesPage } from "./pages/FavoritesPage";


function App() {

  return (
    <AlbumProvider>
      <Router>
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
