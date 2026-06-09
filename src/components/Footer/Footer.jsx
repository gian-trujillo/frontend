import instagram from '../../images/instagram.svg'
import email from '../../images/email.svg'
import tiktok from '../../images/tiktok.svg'

function Footer() {
    return (
        <section className="footer">
            <div className='footer__grid'>
                <div className='footer__grid-heading'>
                    <h4 className='footer__grid-title'>Skylens Adventures</h4>
                    <p className='footer__grid-subtitle'>Fotografía y videografía profesional para bodas, XV años y eventos formales en Monterrey y todo México.</p>
                </div>
                <div className='footer__grid-list'>
                    <h5 className='footer__list-title'>sitio</h5>
                    <ul className='footer__list'>
                        <li className='footer__list-item'><a href="#about" className='footer__base-link'>Acerca de mí</a></li>
                        <li className='footer__list-item'><a href="#discover" className='footer__base-link'>Galería</a></li>
                        <li className='footer__list-item'><a href="#packages" className='footer__base-link'>Paquetes</a></li>
                        <li className='footer__list-item'><a href="#contact" className='footer__base-link'>Contacto</a></li>
                    </ul>
                </div>
                <div className='footer__grid-list'>
                    <h5 className='footer__list-title'>Servicios</h5>
                    <ul className='footer__list'>
                        <li className='footer__list-item'>Sesión fotos</li>
                        <li className='footer__list-item'>Sesión videos</li>
                        <li className='footer__list-item'>Fotos y videos</li>
                        <li className='footer__list-item'>Cobertura total</li>
                    </ul>
                </div>
                <div className='footer__grid-list footer__grid-contact'>
                    <h5 className='footer__list-title'>Contacto</h5>
                    <ul className='footer__list'>
                        <li className='footer__list-item'>Monterrey, NL</li>
                        <li className='footer__list-item'><a href="https://wa.me/528120197769?text=Hola%20Gian,%20me%20gustaría%20recibir%20información%20sobre%20tus%20servicios." className="footer__base-link">+52 81 2019 7769</a></li>
                        <li className='footer__list-item'><a href="mailto:skylensadventures@gmail.com?subject=Cotización%20para%20evento&body=Hola,%20me%20gustaría%20recibir%20información%20sobre%20tus%20servicios." className="footer__base-link">skylensadventures@gmail.com</a></li>
                    </ul>
                </div>
            </div>
            <div className='footer__base'>
                <p className='footer__base-text'>© 2026 Skylens Adventures · Todos los derechos reservados</p>
                <div className='footer__base-icons'>
                    <a className="footer__base-icon-link" href="https://www.instagram.com/skylens_adventures/" target='_blank' rel="noopener noreferrer" aria-label="Abrir Instagram de Gian Trujillo"><img src={instagram} alt="Icono de Instagram" className='footer__base-icon' /></a>
                    <a className="footer__base-icon-link" href="mailto:skylensadventures@gmail.com?subject=Cotización%20para%20evento&body=Hola%20Gian,%20me%20gustaría%20recibir%20información%20sobre%20tus%20servicios."><img src={email} alt="icono de correo electronico" className='footer__base-icon' /></a>
                    <a className="footer__base-icon-link" href="https://www.tiktok.com/@big_dawg_g" target='_blank' rel="noopener noreferrer" aria-label="Abrir Tiktok de Gian Trujillo"><img src={tiktok} alt="Icono de tiktok" className='footer__base-icon' /></a>
                </div>
            </div>
        </section>
    )
}

export default Footer;