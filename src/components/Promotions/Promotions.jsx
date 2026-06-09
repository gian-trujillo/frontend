function Promotions({
  promotions,
  isPromotionsLoading,
  promotionsError,
}) {
  const phoneNumber = '528120197769';

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getWhatsappUrl = (promotion) => {
    const message = `Hola, me interesa la promoción de ${promotion.title}`;

    return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
  };

  if (isPromotionsLoading || promotionsError || !promotions.length) {
    return null;
  }

  return (
    <section className="promotions" id="promotions">
      <div className="promotions__container">
        <div className="promotions__head">
          <div className="promotions__head-left">
            <div className="promotions__eyebrow">
              <p className="promotions__eyebrow-number">03</p>
              <span className="promotions__eyebrow-line"></span>
              <p className="promotions__eyebrow-text">Promociones</p>
            </div>

            <h2 className="promotions__title">
              Promociones <em className="promotions__title-emphasis">vigentes</em>.
            </h2>
          </div>

          <p className="promotions__intro">
            Ofertas por tiempo limitado para sesiones, eventos y coberturas seleccionadas.
          </p>
        </div>

        <div className={`promotions__grid ${promotions.length === 1 ? 'promotions__grid_single' : ''}`}>
          {promotions.map((promotion) => (
            <article
              className={`promotions__card ${promotion.imageUrl ? 'promotions__card_with-image' : 'promotions__card_no-image'}`}
              key={promotion._id}
            >
              {promotion.badgeText && (
                <p className="promotions__badge">{promotion.badgeText}</p>
              )}

              <div className="promotions__content">
                <p className="promotions__label">Promoción especial</p>

                <h3 className="promotions__card-title">{promotion.title}</h3>

                <p className="promotions__subtitle">{promotion.subtitle}</p>

                {promotion.description && (
                  <p className="promotions__description">{promotion.description}</p>
                )}

                <p className="promotions__expiration">
                  Válida hasta el {formatDate(promotion.endsAt)}
                </p>

                <a
                  className="promotions__button"
                  href={getWhatsappUrl(promotion)}
                  target="_blank"
                  rel="noreferrer"
                >
                  {promotion.buttonText || 'Enviar mensaje'} →
                </a>
              </div>

              {promotion.imageUrl && (
                <div className="promotions__image-wrap">
                  <img
                    className="promotions__image"
                    src={promotion.imageUrl}
                    alt={promotion.imageAlt || promotion.title}
                    loading="lazy"
                  />
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Promotions;