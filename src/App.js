// App.js
import React, { useState } from 'react';
import './Gallery.css';
import ImageData from './ImageData';
import GalleryRow from './GalleryRow';
import { FaSearch, FaSun, FaMoon } from 'react-icons/fa';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filteredImages = ImageData.map(category => ({
    ...category,
    images: category.images.filter(img =>
      img.title.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  })).filter(category => category.images.length > 0 || !searchTerm);

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <h1 className="gallery-title"><i className="fa-solid fa-photo-film"></i> Kathir's Image Gallery</h1>
      <header className="header">
        <div className="search-container">
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`search-bar ${darkMode ? 'dark-search-bar' : ''}`}
          />
        </div>
        <button className="dark-mode-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <FaSun /> : <FaMoon />}
          {darkMode ? ' Light Mode' : ' Dark Mode'}
        </button>
      </header>

      <div className="gallery">
        {filteredImages.length > 0 ? (
          filteredImages.map((category, index) => (
            <GalleryRow key={index} title={category.title} images={category.images} darkMode={darkMode} />
          ))
        ) : (
          <p className={`no-results ${darkMode ? 'dark-no-results' : ''}`}>No Results Found</p>
        )}
      </div>
      <div className="Footer"></div>
    </div>
  );
}

export default App;