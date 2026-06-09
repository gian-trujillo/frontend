import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import './MediaPopup.css';

import {
  getOptimizedImageUrl,
  getOptimizedVideoUrl,
  getResponsiveImageSrcSet,
} from '../../utils/cloudinary';


function MediaPopup({ selectedMedia, setSelectedMedia, mediaItems, onClose,}) {
  const [isMediaLoading, setIsMediaLoading] = useState(true);

  const currentMediaIndex = selectedMedia
    ? mediaItems.findIndex((item) => item._id === selectedMedia._id)
    : -1;

  const handleNextMedia = () => {
    if (!mediaItems.length || currentMediaIndex === -1 || isMediaLoading) {
      return;
    }

    const nextIndex = currentMediaIndex === mediaItems.length - 1 ? 0 : currentMediaIndex + 1;

    setIsMediaLoading(true);
    setSelectedMedia(mediaItems[nextIndex]);
  };

  const handlePreviousMedia = () => {
    if (!mediaItems.length || currentMediaIndex === -1 || isMediaLoading) {
      return;
    }

    const previousIndex = currentMediaIndex === 0 ? mediaItems.length - 1 : currentMediaIndex - 1;

    setIsMediaLoading(true);  
    setSelectedMedia(mediaItems[previousIndex]);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }

      if (e.key === 'ArrowRight') {
        handleNextMedia();
      }

      if (e.key === 'ArrowLeft') {
        handlePreviousMedia();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedMedia, currentMediaIndex, isMediaLoading]);

  if (!selectedMedia) {
    return null;
  }

  return createPortal(
    <div className="media-popup" onClick={onClose}>
      <div className="media-popup__content" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="media-popup__close"
          onClick={onClose}
        >
          ×
        </button>

        {mediaItems.length > 1 && (
          <>
            <button
              type="button"
              className="media-popup__nav media-popup__nav_left"
              onClick={handlePreviousMedia}
              disabled={isMediaLoading}
              aria-label="Previous media"
            >
              ‹
            </button>

            <button
              type="button"
              className="media-popup__nav media-popup__nav_right"
              onClick={handleNextMedia}
              disabled={isMediaLoading}
              aria-label="Next media"
            >
              ›
            </button>
          </>
        )}

        {isMediaLoading && (
          <div className="media-popup__loader">
            <span className="media-popup__spinner"></span>
            <p className="media-popup__loading-text">Cargando...</p>
          </div>
        )}

        {selectedMedia.mediaType === 'video' ? (
          <video
            key={selectedMedia._id}
            src={getOptimizedVideoUrl(selectedMedia.cloudinaryUrl, {
              width: 1400,
            })}
            className={`media-popup__media ${
              isMediaLoading ? 'media-popup__media_loading' : ''
            }`}
            controls
            autoPlay
            playsInline
            onLoadedData={() => setIsMediaLoading(false)}
            onCanPlay={() => setIsMediaLoading(false)}
          />
        ) : (
          <img
            key={selectedMedia._id}
            src={getOptimizedImageUrl(selectedMedia.cloudinaryUrl, {
              width: 1600,
              crop: 'limit',
            })}
            srcSet={getResponsiveImageSrcSet(selectedMedia.cloudinaryUrl, {
              widths: [768, 1024, 1400, 1600, 1800],
              crop: 'limit',
            })}
            sizes="(max-width: 768px) 100vw, 90vw"
            alt={selectedMedia.title || 'Fotografía profesional en Monterrey'}
            className={`media-popup__media ${
              isMediaLoading ? 'media-popup__media_loading' : ''
            }`}
            decoding="async"
            onLoad={() => setIsMediaLoading(false)}
          />
        )}
      </div>
    </div>,
    document.body,
  );
}

export default MediaPopup;