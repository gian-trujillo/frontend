import { useEffect, useMemo, useState } from 'react';

import {
  getPromotions,
  createPromotion,
  updatePromotion,
  deletePromotion,
  replacePromotionImage,
  deletePromotionImage,
} from '../../utils/api';

import './AdminPromotionsEditor.css';

const initialFormValues = {
  title: '',
  subtitle: '',
  description: '',
  badgeText: '',
  buttonText: 'Enviar mensaje',
  startsAt: '',
  durationDays: '7',
  isActive: true,
  imageAlt: '',
};

function AdminPromotionsEditor() {
  const [promotions, setPromotions] = useState([]);
  const [editingPromotionId, setEditingPromotionId] = useState(null);
  const [formValues, setFormValues] = useState(initialFormValues);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const resetMessages = () => {
    if (statusMessage || errorMessage) {
      setStatusMessage('');
      setErrorMessage('');
    }
  };

  const loadPromotions = () => {
    setIsLoading(true);

    return getPromotions()
      .then((data) => {
        setPromotions(data);
        setErrorMessage('');
      })
      .catch((err) => {
        setErrorMessage(err || 'No se pudieron cargar las promociones.');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    let isMounted = true;

    getPromotions()
      .then((data) => {
        if (!isMounted) {
          return;
        }

        setPromotions(data);
        setErrorMessage('');
      })
      .catch((err) => {
        if (!isMounted) {
          return;
        }

        setErrorMessage(err || 'No se pudieron cargar las promociones.');
      })
      .finally(() => {
        if (!isMounted) {
          return;
        }

        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const getPromotionStatus = (promotion) => {
    const now = new Date();
    const startsAt = new Date(promotion.startsAt);
    const endsAt = new Date(promotion.endsAt);

    if (!promotion.isActive) {
      return 'Desactivada';
    }

    if (now < startsAt) {
      return 'Programada';
    }

    if (now >= endsAt) {
      return 'Expirada';
    }

    return 'Activa';
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('es-MX', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(date));
  };

  const calculatedEndDate = useMemo(() => {
    const durationNumber = Number(formValues.durationDays);

    if (!durationNumber || durationNumber < 1) {
      return '';
    }

    const startDate = formValues.startsAt
      ? new Date(`${formValues.startsAt}T00:00:00`)
      : new Date();

    const endDate = new Date(startDate);
    endDate.setDate(endDate.getDate() + durationNumber);

    return formatDate(endDate);
  }, [formValues.startsAt, formValues.durationDays]);

  const handleFieldChange = (e) => {
    const { name, value, type, checked } = e.target;

    resetMessages();

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleImageChange = (e) => {
    resetMessages();

    const file = e.target.files[0];

    if (!file) {
      setSelectedImage(null);
      return;
    }

    setSelectedImage(file);
  };

  const handleEditClick = (promotion) => {
    resetMessages();

    setEditingPromotionId(promotion._id);
    setSelectedImage(null);

    setFormValues({
      title: promotion.title || '',
      subtitle: promotion.subtitle || '',
      description: promotion.description || '',
      badgeText: promotion.badgeText || '',
      buttonText: promotion.buttonText || 'Enviar mensaje',
      startsAt: promotion.startsAt ? promotion.startsAt.slice(0, 10) : '',
      durationDays: String(promotion.durationDays || 7),
      isActive: Boolean(promotion.isActive),
      imageAlt: promotion.imageAlt || '',
    });
  };

  const handleCancelEdit = () => {
    resetMessages();

    setEditingPromotionId(null);
    setSelectedImage(null);
    setFormValues(initialFormValues);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSaving(true);
    setStatusMessage('');
    setErrorMessage('');

    const payload = {
      title: formValues.title,
      subtitle: formValues.subtitle,
      description: formValues.description,
      badgeText: formValues.badgeText,
      buttonText: formValues.buttonText,
      durationDays: Number(formValues.durationDays),
      isActive: formValues.isActive,
      imageAlt: formValues.imageAlt,
    };

    if (formValues.startsAt) {
      payload.startsAt = formValues.startsAt;
    }

    const request = editingPromotionId
      ? updatePromotion(editingPromotionId, payload)
      : createPromotion(payload);

    request
      .then((savedPromotion) => {
        if (!selectedImage) {
          return savedPromotion;
        }

        return replacePromotionImage(savedPromotion._id, selectedImage);
      })
      .then(() => loadPromotions())
      .then(() => {
        setStatusMessage(editingPromotionId ? 'Promoción actualizada.' : 'Promoción creada.');
        setEditingPromotionId(null);
        setSelectedImage(null);
        setFormValues(initialFormValues);
      })
      .catch((err) => {
        setErrorMessage(err || 'No se pudo guardar la promoción.');
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleDeletePromotion = (promotionId) => {
    setIsSaving(true);
    setStatusMessage('');
    setErrorMessage('');

    deletePromotion(promotionId)
      .then(() => loadPromotions())
      .then(() => {
        setStatusMessage('Promoción eliminada.');
        if (editingPromotionId === promotionId) {
          setEditingPromotionId(null);
          setFormValues(initialFormValues);
          setSelectedImage(null);
        }
      })
      .catch((err) => {
        setErrorMessage(err || 'No se pudo eliminar la promoción.');
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  const handleRemoveImage = (promotionId) => {
    setIsSaving(true);
    setStatusMessage('');
    setErrorMessage('');

    deletePromotionImage(promotionId)
      .then(() => loadPromotions())
      .then(() => {
        setStatusMessage('Imagen eliminada.');
      })
      .catch((err) => {
        setErrorMessage(err || 'No se pudo eliminar la imagen.');
      })
      .finally(() => {
        setIsSaving(false);
      });
  };

  return (
    <section className="admin__panel admin__promotions">
      <div className="admin__panel-head">
        <span className="admin__section-line"></span>
        <p className="admin__section-label">Promociones</p>
        <span className="admin__section-line"></span>
      </div>

      <h2 className="admin__section-title admin__promotions-title">Promociones del sitio</h2>

      <p className="admin__placeholder">
        Crea promociones temporales para mostrar en la página principal. Las imágenes se eliminan del servidor cuando la promoción expira.
      </p>

      {statusMessage && (
        <p className="admin__promotions-status admin__promotions-status_success">{statusMessage}</p>
      )}

      {errorMessage && (
        <p className="admin__promotions-status admin__promotions-status_error">{errorMessage}</p>
      )}

      <div className="admin__promotions-layout">
        <form className="admin__promotions-form" onSubmit={handleSubmit}>
          <h3 className="admin__promotions-form-title">
            {editingPromotionId ? 'Editar promoción' : 'Crear promoción'}
          </h3>

          <label className="admin__promotions-label">
            Título
            <input
              className="admin__promotions-input"
              type="text"
              name="title"
              value={formValues.title}
              onChange={handleFieldChange}
              required
              maxLength="80"
            />
          </label>

          <label className="admin__promotions-label">
            Subtítulo
            <input
              className="admin__promotions-input"
              type="text"
              name="subtitle"
              value={formValues.subtitle}
              onChange={handleFieldChange}
              required
              maxLength="140"
            />
          </label>

          <label className="admin__promotions-label">
            Descripción opcional
            <textarea
              className="admin__promotions-input admin__promotions-textarea"
              name="description"
              value={formValues.description}
              onChange={handleFieldChange}
              maxLength="300"
            />
          </label>

          <label className="admin__promotions-label">
            Badge opcional
            <input
              className="admin__promotions-input"
              type="text"
              name="badgeText"
              value={formValues.badgeText}
              onChange={handleFieldChange}
              maxLength="30"
              placeholder="Ej. -20%, Promo, Solo junio"
            />
          </label>

          <label className="admin__promotions-label">
            Texto del botón
            <input
              className="admin__promotions-input"
              type="text"
              name="buttonText"
              value={formValues.buttonText}
              onChange={handleFieldChange}
              maxLength="40"
            />
          </label>

          <div className="admin__promotions-row">
            <label className="admin__promotions-label">
              Fecha de inicio opcional
              <input
                className="admin__promotions-input"
                type="date"
                name="startsAt"
                value={formValues.startsAt}
                onChange={handleFieldChange}
              />
            </label>

            <label className="admin__promotions-label">
              Duración en días
              <input
                className="admin__promotions-input"
                type="number"
                name="durationDays"
                min="1"
                max="365"
                value={formValues.durationDays}
                onChange={handleFieldChange}
                required
              />
            </label>
          </div>

          {calculatedEndDate && (
            <p className="admin__promotions-preview-date">
              Visible hasta: {calculatedEndDate}
            </p>
          )}

          <label className="admin__promotions-label">
            Texto alternativo de imagen
            <input
              className="admin__promotions-input"
              type="text"
              name="imageAlt"
              value={formValues.imageAlt}
              onChange={handleFieldChange}
              maxLength="120"
            />
          </label>

          <label className="admin__promotions-label">
            Imagen opcional
            <input
              className="admin__promotions-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleImageChange}
            />
          </label>

          {selectedImage && (
            <p className="admin__promotions-file-name">
              Imagen seleccionada: {selectedImage.name}
            </p>
          )}

          <label className="admin__promotions-checkbox">
            <input
              type="checkbox"
              name="isActive"
              checked={formValues.isActive}
              onChange={handleFieldChange}
            />
            Promoción activa
          </label>

          <div className="admin__promotions-actions">
            <button className="admin__promotions-button" type="submit" disabled={isSaving}>
              {isSaving ? 'Guardando...' : editingPromotionId ? 'Guardar cambios' : 'Crear promoción'}
            </button>

            {editingPromotionId && (
              <button
                className="admin__promotions-button admin__promotions-button_secondary"
                type="button"
                onClick={handleCancelEdit}
                disabled={isSaving}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>

        <div className="admin__promotions-list">
          <h3 className="admin__promotions-form-title">Promociones guardadas</h3>

          {isLoading ? (
            <p className="admin__placeholder">Cargando promociones...</p>
          ) : promotions.length === 0 ? (
            <p className="admin__placeholder">Aún no hay promociones.</p>
          ) : (
            promotions.map((promotion) => (
              <article className="admin__promotions-card" key={promotion._id}>
                <div className="admin__promotions-card-info">
                  <p className="admin__promotions-card-status">{getPromotionStatus(promotion)}</p>
                  <h4 className="admin__promotions-card-title">{promotion.title}</h4>
                  <p className="admin__promotions-card-date">
                    Hasta: {formatDate(promotion.endsAt)}
                  </p>

                  {promotion.imageUrl ? (
                    <img
                      className="admin__promotions-card-image"
                      src={promotion.imageUrl}
                      alt={promotion.imageAlt || promotion.title}
                    />
                  ) : (
                    <p className="admin__promotions-card-no-image">Sin imagen</p>
                  )}

                  {promotion.imageDeletedAt && (
                    <p className="admin__promotions-card-note">
                      Imagen eliminada automáticamente al expirar.
                    </p>
                  )}
                </div>

                <div className="admin__promotions-card-actions">
                  <button
                    className="admin__promotions-small-button"
                    type="button"
                    onClick={() => handleEditClick(promotion)}
                    disabled={isSaving}
                  >
                    Editar
                  </button>

                  {promotion.imageUrl && (
                    <button
                      className="admin__promotions-small-button admin__promotions-small-button_danger"
                      type="button"
                      onClick={() => handleRemoveImage(promotion._id)}
                      disabled={isSaving}
                    >
                      Quitar imagen
                    </button>
                  )}

                  <button
                    className="admin__promotions-small-button admin__promotions-small-button_danger"
                    type="button"
                    onClick={() => handleDeletePromotion(promotion._id)}
                    disabled={isSaving}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default AdminPromotionsEditor;