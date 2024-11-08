// GalleryRow.js
import React, { useState, useEffect } from 'react';
import Modal from './Modal';

function GalleryRow({ title, images, darkMode }) {
  const [startIndex, setStartIndex] = useState(0);
  const [visibleImages, setVisibleImages] = useState(4);
  const [selectedImage, setSelectedImage] = useState(null);

  const updateVisibleImages = () => {
    setVisibleImages(window.innerWidth > 800 ? 4 : 2);
  };

  useEffect(() => {
    updateVisibleImages();
    window.addEventListener('resize', updateVisibleImages);
    return () => window.removeEventListener('resize', updateVisibleImages);
  }, []);

  const slideNext = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const slidePrev = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const displayedImages = images.slice(startIndex, startIndex + visibleImages);

  return (
    <div className="gallery-row">
      {!title.includes('search') && <h2>{title}</h2>}
      <div className="image-slider">
        <button className="slide-btn prev" onClick={slidePrev}>&#10094;</button>
        <div className="image-wrapper">
          {displayedImages.map((img, idx) => (
            <div
              key={idx}
              className={`image-card ${darkMode ? 'dark-card' : ''}`}
              onClick={() => setSelectedImage(img)}
            >
              <img src={img.src} alt={img.title} className="gallery-image" />
              <div className="image-info">
                <h3>{img.title}</h3>
                <p>Date: {img.date}</p>
                <p>Time: {img.time}</p>
              </div>
              <div className="hover-info">
                <p>Size: {img.size}</p>
                <p>Type: {img.type}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="slide-btn next" onClick={slideNext}>&#10095;</button>
      </div>

      {/* Modal Popup */}
      <Modal
        isOpen={!!selectedImage}
        image={selectedImage}
        onClose={() => setSelectedImage(null)}
        darkMode={darkMode}
      />
    </div>
  );
}

export default GalleryRow;