// Modal.js
import React from 'react';
import './Modal.css';

function Modal({ isOpen, image, onClose, darkMode }) {
  if (!isOpen) return null;

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = image.src;
    link.download = image.title;
    link.click();
  };

  return (
    <div className={`modal-overlay ${darkMode ? 'dark-overlay' : ''}`} onClick={onClose}>
      <div className={`modal-content ${darkMode ? 'dark-content' : ''}`} onClick={(e) => e.stopPropagation()}>
        <img src={image.src} alt={image.title} className="modal-image" />
        <div className="modal-details">
          <h2>{image.title}</h2>
          <p>Date: {image.date}</p>
          <p>Time: {image.time}</p>
          <p>Size: {image.size}</p>
          <p>Type: {image.type}</p>
        </div>
        <button className="download-button" onClick={downloadImage}>Download</button>
        <button className="close-button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
