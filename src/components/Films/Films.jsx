import { useEffect, useState } from 'react';

import { getFilms } from '../../utils/api';

import './Films.css';

function Films() {
  const [films, setFilms] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getFilms()
      .then((data) => {
        setFilms(data);
        setErrorMessage('');
      })
      .catch((err) => {
        console.error(err);
        setErrorMessage('No se pudieron cargar los videos.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const landscapeFilms = films.filter(
    (film) => film.orientation === 'landscape',
  );

  const portraitFilm = films.find(
    (film) => film.orientation === 'portrait',
  );

  if (isLoading) {
    return (
      <section className="films" id="films">
        <div className="films__container">
          <p className="films__loading">Cargando videos...</p>
        </div>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section className="films" id="films">
        <div className="films__container">
          <p className="films__error">{errorMessage}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="films" id="films">
      <div className="films__container">
        <div className="films__head">
          <div className="films__head-left">
            <p className="films__eyebrow-text">Videos</p>

            <h2 className="films__title">
              Edición en <em className="films__title-emphasis">movimiento</em>.
            </h2>
          </div>

          <p className="films__subtitle">
            Videos cortos con edición cuidada, ritmo visual y color cinematográfico para mostrar mi estilo detrás de cámara.
          </p>
        </div>

        <div className="films__grid">
          <div className="films__landscape-column">
            {landscapeFilms.map((film) => (
              <article className="films__card films__card_landscape" key={film._id}>
                <div className="films__video-wrap films__video-wrap_landscape">
                  <iframe
                    className="films__video"
                    src={film.embedUrl}
                    title={film.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                  />
                </div>

                <div className="films__card-info">
                  <h3 className="films__card-title">{film.title}</h3>
                  <p className="films__card-description">{film.description}</p>
                </div>
              </article>
            ))}
          </div>

          {portraitFilm && (
            <article className="films__card films__card_portrait" key={portraitFilm._id}>
              <div className="films__video-wrap films__video-wrap_portrait">
                <iframe
                  className="films__video"
                  src={portraitFilm.embedUrl}
                  title={portraitFilm.title}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>

              <div className="films__card-info">
                <h3 className="films__card-title">{portraitFilm.title}</h3>
                <p className="films__card-description">{portraitFilm.description}</p>
              </div>
            </article>
          )}
        </div>
      </div>
    </section>
  );
}

export default Films;