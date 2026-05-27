import { useEffect, useState } from 'react';

import {
  getPackages,
  updatePackage,
} from '../../utils/api';

import './AdminPackagesEditor.css';

function AdminPackagesEditor() {
  const [packages, setPackages] = useState([]);
  const [editingPackages, setEditingPackages] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [savingPackageId, setSavingPackageId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        getPackages()
        .then((data) => {
            setPackages(data);

            const editableData = data.reduce((acc, pkg) => {
                acc[pkg._id] = {
                    label: pkg.label,
                    title: pkg.title,
                    subtitle: pkg.subtitle,
                    price: pkg.price,
                    currency: pkg.currency,
                    priceNote: pkg.priceNote,
                    details: pkg.details,
                    buttonText: pkg.buttonText,
                    selectValue: pkg.selectValue,
                };

                return acc;
            }, {});

            setEditingPackages(editableData);
            setErrorMessage('');
        })
        .catch((err) => {
            console.error(err);
            setErrorMessage('No se pudieron cargar los paquetes.');
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    const formatPrice = (price) =>
        new Intl.NumberFormat('es-MX').format(price || 0);

    const handleFieldChange = (packageId, field, value) => {
        setEditingPackages((currentPackages) => ({
            ...currentPackages,
            [packageId]: {
                ...currentPackages[packageId],
                [field]: value,
            },
        }));
    };

    const handleDetailChange = (packageId, index, value) => {
        setEditingPackages((currentPackages) => {
            const currentDetails = currentPackages[packageId].details || [];
            const updatedDetails = currentDetails.map((detail, detailIndex) =>
                detailIndex === index ? value : detail,
            );

            return {
                ...currentPackages,
                [packageId]: {
                    ...currentPackages[packageId],
                    details: updatedDetails,
                },
            };
        });
    };

    const handleSave = (packageId) => {
        const currentPackage = editingPackages[packageId];

        if (!currentPackage) {
            return;
        }

        const cleanDetails = currentPackage.details
        .map((detail) => detail.trim())
        .filter(Boolean);

        if (cleanDetails.length < 1 || cleanDetails.length > 5) {
            setErrorMessage('Cada paquete debe tener entre 1 y 5 detalles.');
            return;
        }

        setSavingPackageId(packageId);
        setStatusMessage('');
        setErrorMessage('');
        const cleanPrice = Number(currentPackage.price);

        if (Number.isNaN(cleanPrice) || cleanPrice < 0) {
            setErrorMessage('El precio debe ser un número válido.');
            return;
        }

        updatePackage(packageId, {
            ...currentPackage,
            price: cleanPrice,
            details: cleanDetails,
        })
        .then((updatedPackage) => {
            setPackages((currentPackages) =>
                currentPackages.map((pkg) =>
                    pkg._id === updatedPackage._id ? updatedPackage : pkg,
                ),
            );

            setEditingPackages((currentPackages) => ({
                ...currentPackages,
                [updatedPackage._id]: {
                    label: updatedPackage.label,
                    title: updatedPackage.title,
                    subtitle: updatedPackage.subtitle,
                    price: updatedPackage.price,
                    currency: updatedPackage.currency,
                    priceNote: updatedPackage.priceNote,
                    details: updatedPackage.details,
                    buttonText: updatedPackage.buttonText,
                    selectValue: updatedPackage.selectValue,
                },
            }));

            setStatusMessage('Paquete actualizado correctamente.');
        })
        .catch((err) => {
            console.error(err)
            setErrorMessage('No se pudo actualizar el paquete.');
        })
        .finally(() => {
            setSavingPackageId('');
        });
    };

    const handleAddDetail = (packageId) => {
        setEditingPackages((currentPackages) => {
            const currentDetails = currentPackages[packageId].details || [];

            if (currentDetails.length >= 5) {
                setErrorMessage('Cada paquete puede tener máximo 5 detalles.');
                return currentPackages;
            }

            return {
                ...currentPackages,
                [packageId]: {
                    ...currentPackages[packageId],
                    details: [...currentDetails, ''],
                },
            };
        });
    };

    const handleRemoveDetail = (packageId, index) => {
        setEditingPackages((currentPackages) => {
            const currentDetails = currentPackages[packageId].details || [];

            if (currentDetails.length <= 1) {
                setErrorMessage('Cada paquete debe tener al menos 1 detalle.');
                return currentPackages;
            }

            const updatedDetails = currentDetails.filter(
                (_, detailIndex) => detailIndex !== index,
            );

            return {
                ...currentPackages,
                [packageId]: {
                    ...currentPackages[packageId],
                    details: updatedDetails,
                },
            };
        });
    };


    if (isLoading) {
        return (
            <section className="admin__panel">
                <p className="admin__placeholder">Cargando editor de paquetes...</p>
            </section>
        );
    }

    return (
        <section className="admin__panel admin__packages">
            <div className="admin__panel-head">
                <p className="admin__section-label">03</p>
                <span className="admin__section-line"></span>
                <h2 className="admin__section-title">Editar paquetes</h2>
            </div>

            <p className="admin__placeholder">Edita el texto, precio y detalles de cada paquete. Mantén los textos cortos para conservar el diseño.</p>

            {statusMessage && (
                <p className="admin__packages_status admin__packages_status_success">{statusMessage}</p>
            )}

            {errorMessage && (
                <p className="admin__packages_status admin__packages_status_error">{errorMessage}</p>
            )}

            <div className="admin__packages_card-grid">
                {packages.map((pkg) => {
                    const editablePackage = editingPackages[pkg._id];

                    if (!editablePackage) {
                        return null;
                    }

                    return (
                        <article className="admin__packages_card" key={pkg._id}>
                            <div className="admin__packages_preview">
                                <div className="packages__card-name">
                                    <p className="packages__card-label">{editablePackage.label}</p>
                                    <h4 className="packages__card-title">{editablePackage.title}</h4>
                                    <p className="packages__card-subtitle">{editablePackage.subtitle}</p>
                                </div>

                                <p className="packages__card-price">
                                    <em className="packages__card-currency">
                                        {editablePackage.currency}
                                    </em>{' '}
                                    {formatPrice(editablePackage.price)}{' '}
                                    <em className="packages__card-emphasis">
                                        {editablePackage.priceNote}
                                    </em>
                                </p>

                                <ul className="packages__card-details">
                                    {editablePackage.details.map((detail, index) => (
                                        <li className="packages__card-item" key={`${pkg._id}-${index}`}>
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <form className="admin__packages_form" onSubmit={(e) => {
                                e.preventDefault();
                                handleSave(pkg._id);
                            }}>
                                <div className="admin__packages_field-row">
                                    <label className="admin__packages_field">
                                        Label
                                        <input
                                        type="text"
                                        maxLength="6"
                                        value={editablePackage.label}
                                        onChange={(e) =>
                                            handleFieldChange(pkg._id, 'label', e.target.value)
                                        }
                                        />
                                    </label>

                                    <label className="admin__packages_field">
                                        Precio
                                        <input
                                        type="number"
                                        min="0"
                                        value={editablePackage.price}
                                        onChange={(e) =>
                                            handleFieldChange(pkg._id, 'price', e.target.value)
                                        }
                                        />
                                    </label>
                                </div>

                                <label className="admin__packages_field">
                                    Título
                                    <input
                                        type="text"
                                        maxLength="35"
                                        value={editablePackage.title}
                                        onChange={(e) =>
                                        handleFieldChange(pkg._id, 'title', e.target.value)
                                        }
                                    />
                                </label>

                                <label className="admin__packages_field">
                                    Subtítulo
                                    <input
                                        type="text"
                                        maxLength="40"
                                        value={editablePackage.subtitle}
                                        onChange={(e) =>
                                        handleFieldChange(pkg._id, 'subtitle', e.target.value)
                                        }
                                    />
                                </label>

                                <div className="admin__packages_field-row">
                                    <label className="admin__packages_field">
                                        Moneda
                                        <input
                                        type="text"
                                        maxLength="6"
                                        value={editablePackage.currency}
                                        onChange={(e) =>
                                            handleFieldChange(pkg._id, 'currency', e.target.value)
                                        }
                                        />
                                    </label>

                                    <label className="admin__packages_field">
                                        Nota
                                        <input
                                        type="text"
                                        maxLength="20"
                                        value={editablePackage.priceNote}
                                        onChange={(e) =>
                                            handleFieldChange(pkg._id, 'priceNote', e.target.value)
                                        }
                                        />
                                    </label>
                                </div>

                                <label className="admin__packages_field">
                                    Valor del formulario
                                    <input
                                        type="text"
                                        maxLength="40"
                                        value={editablePackage.selectValue}
                                        onChange={(e) =>
                                        handleFieldChange(pkg._id, 'selectValue', e.target.value)
                                        }
                                    />
                                </label>

                                <label className="admin__packages_field">
                                    Texto del botón
                                    <input
                                        type="text"
                                        maxLength="20"
                                        value={editablePackage.buttonText}
                                        onChange={(e) =>
                                        handleFieldChange(pkg._id, 'buttonText', e.target.value)
                                        }
                                    />
                                </label>

                                <div className="admin__packages_details-editor">
                                    <div className="admin__packages_details-head">
                                        <p className="admin__packages_details-title">Detalles</p>

                                        <button
                                        type="button"
                                        className="admin__packages_details-add"
                                        onClick={() => handleAddDetail(pkg._id)}
                                        disabled={editablePackage.details.length >= 5}
                                        >
                                        + Agregar
                                        </button>
                                    </div>

                                    {editablePackage.details.map((detail, index) => (
                                        <div
                                            className="admin__packages_detail-row"
                                            key={`${pkg._id}-detail-input-${index}`}
                                        >
                                            <input
                                                type="text"
                                                maxLength="60"
                                                value={detail}
                                                onChange={(e) =>
                                                handleDetailChange(pkg._id, index, e.target.value)
                                                }
                                            />

                                            <button
                                                type="button"
                                                className="admin__packages_detail-remove"
                                                onClick={() => handleRemoveDetail(pkg._id, index)}
                                                disabled={editablePackage.details.length <= 1}
                                            >
                                                ×
                                            </button>
                                        </div>
                                    ))}

                                    <p className="admin__packages_details-note">
                                        Máximo 5 detalles por paquete.
                                    </p>
                                </div>

                                <button
                                    className="admin__packages_save-button"
                                    type="submit"
                                    disabled={savingPackageId === pkg._id}
                                >
                                    {savingPackageId === pkg._id ? 'Guardando...' : 'Guardar cambios'}
                                </button>
                            </form>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}

export default AdminPackagesEditor;