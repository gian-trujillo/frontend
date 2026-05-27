import { useState } from 'react';

import { sendContactForm } from '../../utils/api';

function Contact({ selectedPackage, onChange, inputRef, variant = 'home' }) {
    const [formValues, setFormValues] = useState({
        name: '',
        email: '',
        date: '',
        phone: '',
        address: '',
        details: '',
        eventType: '',
        guestCount: '',
        startTime: '',
        endTime: '',
        venueType: '',
        preferredContact: '',
        inspiration: '',
        budget: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [statusMessage, setStatusMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleFieldChange = (e) => {
        const { name, value } = e.target;

        if (statusMessage || errorMessage) {
            setStatusMessage('');
            setErrorMessage('');
        }

        setFormValues((currentValues) => ({
            ...currentValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        setStatusMessage('');
        setErrorMessage('');

        sendContactForm({
            ...formValues,
            selectedPackage,
            source: variant === 'full' ? 'Página de contacto' : 'Formulario de inicio',
        })
        .then(() => {
            setStatusMessage('Solicitud enviada correctamente.');
            setFormValues({
                name: '',
                email: '',
                date: '',
                phone: '',
                address: '',
                details: '',
                eventType: '',
                guestCount: '',
                startTime: '',
                endTime: '',
                venueType: '',
                preferredContact: '',
                inspiration: '',
                budget: '',
            });
        })
        .catch((err) => {
            setErrorMessage('No se pudo enviar la solicitud.');
            console.error(err);
        })
        .finally(() => {
            setIsSubmitting(false);
        });
    };

    const handlePackageChange = (e) => {
        if (statusMessage || errorMessage) {
            setStatusMessage('');
            setErrorMessage('');
        }

        onChange(e);
    }

    return (
        <section className="contact" id="contact">
            <div className={`contact__container ${variant === 'full' ? 'contact__container-full' : ''}`}>
                {variant === 'full' ? (
                    <div className="contact__page-head">
                        <p className="contact__page-eyebrow">Solicitud de reserva</p>
                        <h1 className="contact__page-title">
                            Cuéntame todos los detalles de <em>tu evento</em>.
                        </h1>
                        <p className="contact__page-subtitle">
                        Completa este formulario para preparar una propuesta más precisa. Entre más información compartas, mejor podré ayudarte con disponibilidad, cobertura y recomendaciones.
                        </p>
                    </div>
                ) : (
                    <div className="contact__info">
                        <div className="contact__eyebrow">
                            <p className="contact__eyebrow-number">04</p>
                            <span className="contact__eyebrow-line"></span>
                            <p className="contact__eyebrow-text">Contáctanos</p>
                        </div>
                        <h4 className="contact__title">Cuéntame <em className="contact__title-emphasis">tu evento</em>.</h4>
                        <p className="contact__subtitle">Respondo todos los mensajes en menos de 24 horas. Si tu fecha está cerca, escríbeme directo por WhatsApp.</p>
                        <div className="contact__info">
                            <div className="contact__info-grid">
                                <p className="contact__info-grid_title">Ubicación</p>
                                <p className="contact__info-grid_subtitle">Monterrey, Nuevo Leon</p>
                            </div>
                            <div className="contact__info-grid">
                                <p className="contact__info-grid_title">Telefono</p>
                                <p className="contact__info-grid_subtitle">+52 81 0000 0000</p>
                            </div>
                            <div className="contact__info-grid">
                                <p className="contact__info-grid_title">Correo electrónico</p>
                                <p className="contact__info-grid_subtitle">giantrujillo98@gmail.com</p>
                            </div>
                            <div className="contact__info-grid">
                                <p className="contact__info-grid_title">Horario</p>
                                <p className="contact__info-grid_subtitle">Lun — Sáb · 9:00 a 19:00</p>
                            </div>
                        </div>
                    </div>

                )}
                <form onSubmit={handleSubmit} className="contact__form">
                    <div className="contact__form-item">
                        <label htmlFor="name" className="contact__form-label">Nombre</label>
                        <input ref={inputRef} name='name' type="text" id="name" className="contact__form-input" placeholder="Tu nombre" value={formValues.name} onChange={handleFieldChange} required />
                    </div>
                    <div className="contact__form-item">
                        <label htmlFor="email" className="contact__form-label">Correo electrónico</label>
                        <input type="email" name='email' id="email" className="contact__form-input_email" placeholder="tu@email.com" value={formValues.email} onChange={handleFieldChange} required /> 
                    </div>
                    <div className="contact__form-item">
                        <label htmlFor="date" className="contact__form-label">Fecha del evento</label>
                        <input type="date" name='date' id="date" className="contact__form-input" value={formValues.date} onChange={handleFieldChange} />
                    </div>
                    <div className="contact__form-item">
                        <label htmlFor="phone" className="contact__form-label">Número telefónico</label>
                        <input type="tel" name='phone' id="phone" className="contact__form-input" placeholder="+52" value={formValues.phone} onChange={handleFieldChange} />
                    </div>
                    <div className="contact__form-item">
                        <label htmlFor="address" className="contact__form-label">Dirección del evento</label>
                        <input type="text" name='address' id="address" className="contact__form-input" placeholder="Ciudad, Salón" value={formValues.address} onChange={handleFieldChange} />
                    </div>
                    {variant === 'full' && (
                        <>
                            <div className="contact__form-item">
                                <label htmlFor="eventType" className="contact__form-label">
                                    Tipo de evento
                                </label>
                                <input
                                    type="text"
                                    name="eventType"
                                    id="eventType"
                                    className="contact__form-input"
                                    placeholder="Boda, XV años, sesión, evento corporativo..."
                                    value={formValues.eventType}
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="guestCount" className="contact__form-label">
                                    Número aproximado de invitados
                                </label>
                                <input
                                    type="number"
                                    name="guestCount"
                                    id="guestCount"
                                    className="contact__form-input"
                                    placeholder="Ej. 120"
                                    value={formValues.guestCount}
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="startTime" className="contact__form-label">
                                    Hora de inicio
                                </label>
                                <input
                                    type="time"
                                    name="startTime"
                                    id="startTime"
                                    className="contact__form-input"
                                    value={formValues.startTime}
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="endTime" className="contact__form-label">
                                    Hora aproximada de fin
                                </label>
                                <input
                                    type="time"
                                    name="endTime"
                                    id="endTime"
                                    className="contact__form-input"
                                    value={formValues.endTime}
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="venueType" className="contact__form-label">
                                    Tipo de locación
                                </label>
                                <select
                                    name="venueType"
                                    id="venueType"
                                    className="contact__form-input"
                                    value={formValues.venueType}
                                    onChange={handleFieldChange}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione una opción</option>
                                    <option value="Interior">Interior</option>
                                    <option value="Exterior">Exterior</option>
                                    <option value="Interior y exterior">Interior y exterior</option>
                                    <option value="Aún no definido">Aún no definido</option>
                                </select>
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="preferredContact" className="contact__form-label">
                                    Método de contacto preferido
                                </label>
                                <select
                                    name="preferredContact"
                                    id="preferredContact"
                                    className="contact__form-input"
                                    value={formValues.preferredContact}
                                    onChange={handleFieldChange}
                                    required
                                >
                                    <option value="" disabled hidden>Seleccione una opción</option>
                                    <option value="WhatsApp">WhatsApp</option>
                                    <option value="Correo electrónico">Correo electrónico</option>
                                    <option value="Llamada">Llamada</option>
                                </select>
                            </div>

                            <div className="contact__form-item">
                                <label htmlFor="budget" className="contact__form-label">
                                    Presupuesto aproximado
                                </label>
                                <input
                                    type="text"
                                    name="budget"
                                    id="budget"
                                    className="contact__form-input"
                                    placeholder="Ej. $5,000 - $10,000 MXN"
                                    value={formValues.budget}
                                    onChange={handleFieldChange}
                                />
                            </div>

                            <div className="contact__form-item contact__form-item--full">
                                <label htmlFor="inspiration" className="contact__form-label">
                                    Inspiración o estilo que buscas
                                </label>
                                <textarea
                                    name="inspiration"
                                    id="inspiration"
                                    className="contact__form-input contact__form-input_textarea"
                                    placeholder="Puedes mencionar referencias, estilo visual, mood, colores o tipo de entrega que quieres..."
                                    value={formValues.inspiration}
                                    onChange={handleFieldChange}
                                />
                            </div>
                        </>
                    )}
                    <div className="contact__form-item">
                        <label htmlFor="options" className="contact__form-label">Paquete de interés</label>
                        <select id="options" className="contact__form-input" value={selectedPackage} onChange={handlePackageChange} required>
                            <option value="" disabled hidden className="contact__form-option">Seleccione un paquete</option>
                            <option value="Sesión Fotos" className="contact__form-option">Sesión fotos</option>
                            <option value="Sesión Videos" className="contact__form-option">Sesión videos</option>
                            <option value="Fotos y videos" className="contact__form-option">Fotos y videos</option>
                            <option value="Cobertura total" className="contact__form-option">Cobertura total</option>
                            <option value="inseguro" className="contact__form-option">Aún no estoy seguro/a</option>
                        </select>
                    </div>
                    <div className="contact__form-item contact__form-item--full">
                        <label htmlFor="details" className="contact__form-label">Cuéntame sobre tu evento</label>
                        <textarea name="details" id="details" className="contact__form-input contact__form-input_textarea" placeholder="Tipo de evento, número de invitados, expectativas…" value={formValues.details} onChange={handleFieldChange}></textarea>
                    </div>

                    <div className="contact__form-feedback">
                        {statusMessage && (
                            <p className="contact__form-status contact__form-status_success">{statusMessage}</p>
                        )}

                        {errorMessage && (
                            <p className="contact__form-status contact__form-status_error">{errorMessage}</p>
                        )}
                    </div>
                    <button type="submit" className="contact__form-button" disabled={isSubmitting}>{isSubmitting ? 'Enviando...' : 'Enviar solicitud →'}</button>
                </form>
            </div>
        </section>
    )
}

export default Contact;