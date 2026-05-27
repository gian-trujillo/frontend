function Packages({ onSelect, packages, isPackagesLoading, packagesError }) {

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-MX').format(price);
    }

    if (isPackagesLoading) {
        return (
            <section className="packages" id="packages">
                <div className="packages__container">
                    <p className="packages__head_text">Cargando paquetes...</p>
                </div>
            </section>
        );
    }

    if (packagesError) {
        return (
        <section className="packages" id="packages">
            <div className="packages__container">
                <p className="packages__head_text">No se pudieron cargar los paquetes.</p>
            </div>
        </section>
        );
    }    

    return (
        <section className="packages" id="packages">
            <div className="packages__container">
                <div className="packages__head">
                    <div className="packages__head-left">
                        <div className="packages__head-eyebrow">
                            <p className="packages__head-number">03</p>
                            <span className="packages__head-line"></span>
                            <p className="packages__head-topic">Paquetes</p>
                        </div>
                        <h2 className="packages__head-title">Servicios y <em className="packages__head-emphasis">tarifas</em>.</h2>
                    </div>
                    <p className="packages__head_text">Cuatro formatos pensados para distintos momentos. Todos los paquetes incluyen reunión previa, edición a color y entrega digital. Personalizable según fecha, locación y duración.</p>
                </div>
                <div className="packages__card-grid">
                    {packages.map((pkg) => (
                        <div className="packages__card" key={pkg._id}>
                            <div className="packages__card-name">
                                <p className="packages__card-label">{pkg.label}</p>
                                <h4 className="packages__card-title">{pkg.title}</h4>
                                <p className="packages__card-subtitle">{pkg.subtitle}</p>
                            </div>
                            <p className="packages__card-price">
                                <em className="packages__card-currency">{pkg.currency}</em> {formatPrice(pkg.price)} <em className="packages__card-emphasis">{pkg.priceNote}</em>
                            </p>
                            <ul className="packages__card-details">
                                {pkg.details.map((detail) => (
                                    <li className="packages__card-item" key={detail}>{detail}</li>
                                ))}
                            </ul>
                            <button className="packages__card-button" onClick={() => onSelect(pkg.selectValue)}>{pkg.buttonText}</button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Packages;