import { useEffect, useState } from 'react';

import { getGallery, replaceGalleryMedia, deleteGalleryItem } from '../../utils/api';

const galleryButtons = [
  {
    label: 'I',
    title: 'Eventos',
  },
  {
    label: 'II',
    title: 'Retratos',
  },
  {
    label: 'III',
    title: 'Paisajes',
  },
  {
    label: 'IV',
    title: 'Drone',
  },
];

const layoutSlots = [
  {
    id: 'top-left-large',
    label: 'Foto grande izquierda',
    slotClassName: 'admin__gallery_slot_large',
    mediaClassName: 'admin__gallery_media_left-large',
  },
  {
    id: 'normal-1',
    label: 'Foto normal 1',
    slotClassName: '',
    mediaClassName: '',
  },
  {
    id: 'normal-2',
    label: 'Foto normal 2',
    slotClassName: '',
    mediaClassName: '',
  },
  {
    id: 'top-right-large',
    label: 'Foto grande derecha',
    slotClassName: 'admin__gallery_slot_large',
    mediaClassName: 'admin__gallery_media_right-large',
  },
  {
    id: 'normal-3',
    label: 'Foto normal 3',
    slotClassName: '',
    mediaClassName: '',
  },
  {
    id: 'normal-4',
    label: 'Foto normal 4',
    slotClassName: '',
    mediaClassName: '',
  },
];

function AdminGalleryEditor() {
  const [activeCategory, setActiveCategory] = useState('Eventos');
  const [galleryItems, setGalleryItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [replacingSlot, setReplacingSlot] = useState('');
  const [deletingSlot, setDeletingSlot] = useState('');

  useEffect(() => {
    getGallery()
      .then((data) => {
        setGalleryItems(data);
        setErrorMessage('');
      })
      .catch(() => {
        setErrorMessage('No se pudo cargar la galería.');
      })
      .finally(() => {
        setIsLoading(false);
      });
    }, []);

    const currentGalleryItems = galleryItems.filter(
        (item) => item.category === activeCategory,
    );

    const getItemBySlot = (slot) =>
        currentGalleryItems.find((item) => item.layoutSlot === slot);

    const updateItemInState = (updatedItem) => {
        setGalleryItems((currentItems) =>
            currentItems.map((item) =>
                item._id === updatedItem._id ? updatedItem : item,
            ),
        );
    };

    const handleReplace = (slot, currentItem, file) => {
        if (!file) {
            return;
        }

        const mediaType = file.type.startsWith('video') ? 'video' : 'image';

        // if (file.size > 90) {
            //investigar como hacerlo
            //hacer un console.log de file, investigar si hay size, cortar el flujo aqui si es mayor a 90mb con return.
            //return;
        // }

        const title = currentItem?.title || `${activeCategory} ${slot}`;

        setReplacingSlot(slot);
        setStatusMessage('');
        setErrorMessage('');

        replaceGalleryMedia({
            file,
            title,
            category: activeCategory,
            mediaType,
            layoutSlot: slot,
        })
        .then((updatedItem) => {
            updateItemInState(updatedItem);
            setStatusMessage('Archivo reemplazado correctamente.');
        })
        .catch((err) => {
            console.error(err)
            setErrorMessage('No se pudo reemplazar el archivo.');
        })
        .finally(() => {
            setReplacingSlot('');
        });
    };

    const handleDelete = (slot, currentItem) => {
        if (!currentItem || currentItem.isEmpty || !currentItem.cloudinaryUrl) {
            setErrorMessage('Este espacio ya está vacío.');
            return;
        }

        setDeletingSlot(slot);
        setStatusMessage('');
        setErrorMessage('');

        deleteGalleryItem(currentItem._id)
            .then((updatedItem) => {
            updateItemInState(updatedItem);
            setStatusMessage('Archivo eliminado correctamente.');
            })
            .catch((err) => {
            console.error(err);
            setErrorMessage('No se pudo eliminar el archivo.');
            })
            .finally(() => {
            setDeletingSlot('');
            });
    };

    const renderMedia = (item, className = '') => {
        if (!item || item.isEmpty || !item.cloudinaryUrl) {
            return (
                <div className={`admin__gallery_media admin__gallery_media_empty ${className}`}>
                    <p className="admin__gallery_empty-text">Slot vacío</p>
                </div>
            );
        }

        if (item.mediaType === 'video') {
            return (
                <video
                src={item.cloudinaryUrl}
                className={`admin__gallery_media ${className}`}
                controls
                muted
                playsInline
                />
            );
        }

        return (
            <img
                src={item.cloudinaryUrl}
                alt={item.title}
                className={`admin__gallery_media ${className}`}
            />
        );
    };

    if (isLoading) {
        return (
            <section className="admin__panel">
                <p className="admin__placeholder">Cargando editor de galería...</p>
            </section>
        );
    }

    return (
        <section className="admin__panel admin__gallery">
            <div className="admin__panel-head">
                <p className="admin__section-label">01</p>
                <span className='admin__section-line'></span>
                <h2 className="admin__section-title">Editar galerías</h2>
            </div>

            <p className="admin__placeholder">Selecciona una categoría y reemplaza el imagen o video de cada espacio.</p>

            <div className="admin__gallery_buttons">
                {galleryButtons.map((button) => (
                <button
                    key={button.title}
                    type="button"
                    className={`admin__gallery_button ${
                    activeCategory === button.title ? 'admin__gallery_button_active' : ''
                    }`}
                    onClick={() => setActiveCategory(button.title)}
                >
                    <p className="admin__gallery_button-label">{button.label}</p>
                    <p className='admin__gallery_button-title'>{button.title}</p>
                    <p className='admin__gallery_button-sign'>↗</p>
                </button>
                ))}
            </div>

            {statusMessage && (
                <p className="admin__gallery_status admin__gallery_status_success">{statusMessage}</p>
            )}

            {errorMessage && (
                <p className="admin__gallery_status admin__gallery_status_error">{errorMessage}</p>
            )}

            <div className="admin__gallery_layout">
                <div className="admin__gallery_grid admin__gallery_grid_left">
                    {layoutSlots.slice(0, 3).map((slot) => {
                        const item = getItemBySlot(slot.id);

                        return (
                        <div className={`admin__gallery_slot ${slot.slotClassName}`} key={slot.id}>
                            {renderMedia(item, slot.mediaClassName)}

                            <div className="admin__gallery_slot-controls">
                                <div className="admin__gallery_slot-actions">
                                    <label className="admin__gallery_replace-button">
                                        {replacingSlot === slot.id ? 'Reemplazando...' : 'Reemplazar'}
                                        <input
                                            type="file"
                                            accept="image/*,video/*"
                                            className="admin__gallery_file-input"
                                            disabled={replacingSlot === slot.id}
                                            onChange={(e) => {
                                                handleReplace(slot.id, item, e.target.files[0]);
                                                e.target.value = '';
                                        }}
                                        />
                                    </label>
                                    <button type='button' className="admin__gallery_delete-button" disabled={ deletingSlot === slot.id || replacingSlot === slot.id || !item || item.isEmpty || !item.cloudinaryUrl } onClick={() => handleDelete(slot.id, item)}>
                                        {deletingSlot === slot.id ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </div>

                            </div>
                        </div>
                        );
                    })}
                </div>

                <div className="admin__gallery_grid admin__gallery_grid_right">
                    {layoutSlots.slice(3).map((slot) => {
                        const item = getItemBySlot(slot.id);
                        return (
                        <div className={`admin__gallery_slot ${slot.slotClassName}`} key={slot.id}>
                            {renderMedia(item, slot.mediaClassName)}

                            <div className="admin__gallery_slot-controls">
                                <div className="admin__gallery_slot-actions">
                                    <label className="admin__gallery_replace-button">
                                        {replacingSlot === slot.id ? 'Reemplazando...' : 'Reemplazar'}
                                        <input
                                        type="file"
                                        accept="image/*,video/*"
                                        className="admin__gallery_file-input"
                                        disabled={replacingSlot === slot.id}
                                        onChange={(e) => {
                                            handleReplace(slot.id, item, e.target.files[0]);
                                            e.target.value = '';
                                        }}
                                        />
                                    </label>
                                    <button type='button' className="admin__gallery_delete-button" disabled={ deletingSlot === slot.id || replacingSlot === slot.id || !item || item.isEmpty || !item.cloudinaryUrl } onClick={() => handleDelete(slot.id, item)}>
                                        {deletingSlot === slot.id ? 'Eliminando...' : 'Eliminar'}
                                    </button>
                                </div>

                            </div>
                        </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

export default AdminGalleryEditor;