function Discover({ galleryButtons, setActiveGallery, activeGallery }) {
    
    const handleButtonClick = (gallery) => {
        const galleryPanel = document.getElementById('panel');
        if (activeGallery) {
            setActiveGallery(gallery);
            galleryPanel.scrollIntoView({ behavior: 'smooth' })
            return;
        }
        
        if (galleryPanel) {
            galleryPanel.scrollIntoView({ behavior: 'smooth' })
        } 

        setTimeout(()  => {
            setActiveGallery(gallery)
        }, 350)
    }

    return (
        <section className="discover" id="gallery">
            <div className="discover__container">
                <div className="discover__info">
                    <div className="discover__info_eyebrow">
                        <span className="discover__info_line--large"></span>
                        <p className="discover__info_number">02</p>
                        <span className="discover__info_line--small"></span>
                        <p className="discover__info_text">Galeria</p>
                        <span className="discover__info_line--large"></span>
                    </div>
                    <h2 className="discover__info_title">Descubre <span className="discover__info_emphasis">mi trabajo</span>.</h2>
                    <p className="discover__info_subtitle">Selecciona una categoría para abrir la galería. Cada colección reúne fotografía y video reciente.</p>
                </div>
                <div className="discover__buttons">
                    {galleryButtons.map((button) => (
                        <button key={button.title} className={`discover__button ${activeGallery === button.title ? 'discover__button--active' : ''}`} onClick={() => handleButtonClick(button.title)}>
                            <div className='discover__button_info'>
                            <p className="discover__button_label">{button.label}</p>
                            <p className="discover__button_title">{button.title}</p>
                            <p className="discover__button_sign">↗</p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>
            <div className="discover__invisible-container" id="panel"></div>
        </section>

    )
}

export default Discover;