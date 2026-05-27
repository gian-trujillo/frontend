import { useEffect, useState } from 'react';

import {
  getFilms,
  updateFilm,
} from '../../utils/api';

import './AdminFilmsEditor.css';

function AdminFilmsEditor() {
    const [films, setFilms] = useState([]);
    const [editingFilms, setEditingFilms] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [savingFilmId, setSavingFilmId] = useState('');
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getFilms()
        .then((data) => {
            setFilms(data);

            const editableData = data.reduce((acc, film) => {
            acc[film._id] = {
                title: film.title,
                description: film.description,
                embedUrl: film.embedUrl,
            };

            return acc;
            }, {});

            setEditingFilms(editableData);
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

    const handleFieldChange = (filmId, field, value) => {
        setEditingFilms((currentFilms) => ({
            ...currentFilms,
            [filmId]: {
                ...currentFilms[filmId],
                [field]: value,
        },
        }));
    };

    const handleSave = (filmId) => {
        const currentFilm = editingFilms[filmId];

        if (!currentFilm) {
            return;
        }

        if (!currentFilm.title.trim()) {
            setErrorMessage('El título no puede estar vacío.');
            return;
        }

        if (!currentFilm.description.trim()) {
            setErrorMessage('La descripción no puede estar vacía.');
            return;
        }

        if (!currentFilm.embedUrl.trim()) {
            setErrorMessage('El enlace del video no puede estar vacío.');
            return;
        }

        setSavingFilmId(filmId);
        setStatusMessage('');
        setErrorMessage('');

        updateFilm(filmId, {
            title: currentFilm.title.trim(),
            description: currentFilm.description.trim(),
            embedUrl: currentFilm.embedUrl.trim(),
        })
        .then((updatedFilm) => {
            setFilms((currentFilms) =>
                currentFilms.map((film) =>
                    film._id === updatedFilm._id ? updatedFilm : film,
                ),
            );

            setEditingFilms((currentFilms) => ({
                ...currentFilms,
                [updatedFilm._id]: {
                    title: updatedFilm.title,
                    description: updatedFilm.description,
                    embedUrl: updatedFilm.embedUrl,
                },
            }));

            setStatusMessage('Video actualizado correctamente.');
        })
        .catch((err) => {
            console.error(err);
            setErrorMessage('No se pudo actualizar el video.');
        })
        .finally(() => {
            setSavingFilmId('');
        });
    };

    if (isLoading) {
        return (
        <section className="admin__panel">
            <p className="admin__placeholder">Cargando editor de videos...</p>
        </section>
        );
    }

    return (
        <section className="admin__panel admin-films">
            <div className="admin__panel-head">
                <p className="admin__section-label">02</p>
                <span className="admin__section-line"></span>
                <h2 className="admin__section-title">Editar videos</h2>
            </div>

            <p className="admin__placeholder">Actualiza el título, descripción y enlace de YouTube de cada video. Puedes pegar enlaces normales de YouTube, Shorts o enlaces embed.</p>

            {statusMessage && (
                <p className="admin-films__status admin-films__status_success">{statusMessage}</p>
            )}

            {errorMessage && (
                <p className="admin-films__status admin-films__status_error">{errorMessage}</p>
            )}

            <div className="admin-films__grid">
                {films.map((film) => {
                const editableFilm = editingFilms[film._id];

                if (!editableFilm) {
                    return null;
                }

                return (
                    <article className="admin-films__card" key={film._id}>
                        <div className="admin-films__preview">
                            <div
                            className={`admin-films__video-wrap ${
                                film.orientation === 'portrait'
                                ? 'admin-films__video-wrap_portrait'
                                : 'admin-films__video-wrap_landscape'
                            }`}
                            >
                            <iframe
                                className="admin-films__video"
                                src={film.embedUrl}
                                title={film.title}
                                loading="lazy"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                referrerPolicy="strict-origin-when-cross-origin"
                                allowFullScreen
                            />
                            </div>

                            <div className="admin-films__preview-info">
                                <p className="admin-films__label">Video {film.label}</p>
                                <h3 className="admin-films__title">{film.title}</h3>
                                <p className="admin-films__description">{film.description}</p>
                                <p className="admin-films__orientation">Layout: {film.orientation === 'portrait' ? 'Vertical' : 'Horizontal'}</p>
                            </div>
                        </div>

                        <form
                            className="admin-films__form"
                            onSubmit={(e) => {
                            e.preventDefault();
                            handleSave(film._id);
                            }}
                        >
                            <label className="admin-films__field">
                                Título
                                <input
                                    type="text"
                                    maxLength="60"
                                    value={editableFilm.title}
                                    onChange={(e) =>
                                    handleFieldChange(film._id, 'title', e.target.value)
                                    }
                                />
                            </label>

                            <label className="admin-films__field">
                                Descripción
                                <textarea
                                    maxLength="180"
                                    value={editableFilm.description}
                                    onChange={(e) =>
                                    handleFieldChange(film._id, 'description', e.target.value)
                                    }
                                />
                            </label>

                            <label className="admin-films__field">
                                URL de YouTube
                                <input
                                    type="url"
                                    value={editableFilm.embedUrl}
                                    onChange={(e) =>
                                    handleFieldChange(film._id, 'embedUrl', e.target.value)
                                    }
                                />
                            </label>

                        <button
                        className="admin-films__save-button"
                        type="submit"
                        disabled={savingFilmId === film._id}
                        >
                            {savingFilmId === film._id ? 'Guardando...' : 'Guardar video'}
                        </button>
                        </form>
                    </article>
                );
                })}
            </div>
        </section>
    );
}

export default AdminFilmsEditor;