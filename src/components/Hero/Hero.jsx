function Hero() {
    return (
        <section className="hero">
            <div className="hero__content">
                <div className="hero__eyebrow">
                    <span className="hero__line_horizontal"></span>
                    <p className="hero__eyebrow-text">Monterrey, México · Nuevo León</p>
                    <span className="hero__line_horizontal"></span>
                </div>
                <h1 className="hero__title">Fotografía y videografía para <em className="hero__title_emphasis">bodas, XV años</em> y eventos formales.</h1>
                <p className="hero__subtitle">Soy Gian Trujillo, fotógrafo y videógrafo profesional con base en Monterrey. Capturo los momentos que merecen quedarse — con precisión, paciencia y una mirada cinematográfica.</p>
            </div>
            <div className="hero__base">
                <p className="hero__base_text">Fotografía</p>
                <div className="hero__base_center">
                    <span className="hero__base_text">desliza</span>
                    <span className="hero__line_vertical"></span>
                </div>
                <p className="hero__base_text">2026</p>
            </div>
        </section>
    )
}

export default Hero;