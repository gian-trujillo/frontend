import { useEffect, useState } from "react"
import { getOptimizedImageUrl, getOptimizedVideoUrl } from "../../utils/cloudinary";
import MediaPopup from "../MediaPopup/MediaPopup";

function Gallery({ setActiveGallery, activeGallery, galleryItems, galleryButtons, isGalleryLoading, galleryError }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedMedia, setSelectedMedia] = useState(null);

    useEffect(() => {
        const animationFrame = requestAnimationFrame(() => {
            setIsOpen(true);
        })

        return () => cancelAnimationFrame(animationFrame);
    }, [])

        const handleOpenPopup = (item) => {
        setSelectedMedia(item);
    };

    const handleClosePopup = () => {
        setSelectedMedia(null);
    };


    const handleClose = () => {
        const discoverSection = document.getElementById('gallery')
        setIsOpen(false);
        setTimeout(() => {
            setActiveGallery(null);
        }, 900);

        setTimeout(() => {
            discoverSection.scrollIntoView({ behavior: 'smooth' })
        }, 500); 
    }

    const currentGalleryInfo = galleryButtons.find(
        (button) => button.title === activeGallery
    )

    const currentGalleryItems = galleryItems.filter(
        (item) => item.category ===activeGallery
    )

    const slotOrder = [
        'top-left-large',
        'normal-1',
        'normal-2',
        'top-right-large',
        'normal-3',
        'normal-4',
    ];

    const getItemBySlot = (slot) => {
        return currentGalleryItems.find((item) => item.layoutSlot === slot);
    }

    const popupMediaItems = slotOrder
    .map((slot) => getItemBySlot(slot))
    .filter((item) => item && !item.isEmpty && item.cloudinaryUrl);

    const getImageWidthBySlot = (slot) => {
        if (slot === 'top-left-large') return 1400;
        if (slot === 'top-right-large') return 900;
        return 700;
    };


    const renderMedia = (item, className = '', slot = '') => {
        if (!item || item.isEmpty || !item.cloudinaryUrl) {
            return (
                <div className={`discover__gallery-photo discover__gallery-photo_empty ${className}`}>
                    <p className="discover__gallery-photo_empty-text">Próximamente</p>
                </div>
            )
        }

        if (item.mediaType === 'video') {
            return (
                <video
                    src={getOptimizedVideoUrl(item.cloudinaryUrl, { width: getImageWidthBySlot(slot) })}
                    className={`discover__gallery-photo ${className}`}
                    controls
                    muted
                    playsInline
                    preload="metadata"
                    onClick={() => handleOpenPopup(item)}
                />
            );
        };

        return (
            <img
                src={getOptimizedImageUrl(item.cloudinaryUrl, { width: getImageWidthBySlot(slot) })}
                alt={item.title || activeGallery}
                className={`discover__gallery-photo ${className}`}
                loading="lazy"
                decoding="async"
                onClick={() => handleOpenPopup(item)}
            />
        )
    }

    if (isGalleryLoading) {
        return (
            <div className={`discover__gallery ${isOpen ? 'discover__gallery--open' : ''}`}>
                <div className="discover__gallery-container">
                    <p className="discover__gallery-info_text">Cargando galería...</p>
                </div>
            </div>
        );
    }

      if (galleryError) {
        return (
            <div className={`discover__gallery ${isOpen ? 'discover__gallery--open' : ''}`}>
                <div className="discover__gallery-container">
                    <p className="discover__gallery-info_text">No se pudo cargar la galería.</p>
                    <button className="discover__gallery-info_button" onClick={handleClose}>
                        cerrar galeria
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`discover__gallery ${isOpen ? 'discover__gallery--open' : ''}`}>
            <div className='discover__gallery-container'>
                <div className='discover__gallery-head'>
                    <div className='discover__gallery-eyebrow'>
                        <div className='discover__gallery-eyebrow_details'>
                            <span className='discover__gallery-eyebrow_line'></span>
                            <p className='discover__gallery-eyebrow_text'>Colección <span className='discover__gallery-title_emphasis'>{currentGalleryInfo?.label}</span></p>
                        </div>
                        <h3 className='discover__gallery-title'>{activeGallery}</h3>
                    </div>
                    <div className='discover__gallery-info'>
                        <p className='discover__gallery-info_text'>{currentGalleryInfo?.info}</p>
                        <button className='discover__gallery-info_button' onClick={handleClose}>cerrar galeria</button>
                    </div>
                </div>
                <div className='discover__gallery-photos'>
                    <div className='discover__gallery-grid_left'>
                        {renderMedia(getItemBySlot('top-left-large'), 'discover__gallery-photo_ls', 'top-left-large')}
                        {renderMedia(getItemBySlot('normal-1'))}
                        {renderMedia(getItemBySlot('normal-2'))}
                    </div>
                    <div className='discover__gallery-grid_right'>
                        {renderMedia(getItemBySlot('top-right-large'), 'discover__gallery-photo_tall', 'top-right-large')}
                        {renderMedia(getItemBySlot('normal-3'))}
                        {renderMedia(getItemBySlot('normal-4'))}
                    </div>
                </div>
            </div>
            {selectedMedia && (
                <MediaPopup selectedMedia={selectedMedia} setSelectedMedia={setSelectedMedia} mediaItems={popupMediaItems} onClose={handleClosePopup} />
            )}
        </div>
    )
}

export default Gallery;