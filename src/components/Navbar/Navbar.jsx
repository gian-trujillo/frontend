import { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";
import logo from "../../../public/skylens_adventures_logo.png"

function Navbar({ variant = 'home', isLoggedIn = false, onLogout}) {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [])

  const isSolidNavbar = scrolled || variant === 'admin';

  const linkClassName = `navbar__link ${ isSolidNavbar ? 'navbar__link_scrolled' : ''}`

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleLogout = () => {
    closeMenu();
    onLogout();
  }

    return (
        <div className={`navbar ${isSolidNavbar ? 'navbar__scrolled' : ''}`}>
          <div className="navbar__title">
            <img className='navbar__logo' src={logo} alt="Logo de Skylens Adventures - Servicios de fotografía" />
            {/* <p>Gian Trujillo</p> */}
          </div>
          <button type='button' className={`navbar__menu-button ${isMenuOpen ? 'navbar__menu-button_open' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Abrir menú de navegación" aria-expanded={isMenuOpen}>
            <span className="navbar__menu-line"></span>
            <span className="navbar__menu-line"></span>
            <span className="navbar__menu-line"></span>
          </button>
          <ul className={`navbar__nav ${isMenuOpen ? 'navbar__nav_open' : ''}`}>
            {variant === 'home' && (
              <>
              {isLoggedIn && (
                  <li className='navbar__link-holder'><NavLink to="/admin" className={linkClassName}>Admin</NavLink></li>
                )}
                <li className='navbar__link-holder'><a href="#about" className={linkClassName}>Sobre mí</a></li>
                <li className='navbar__link-holder'><a href="#gallery" className={linkClassName}>Galería</a></li>
                <li className='navbar__link-holder'><a href="#packages" className={linkClassName}>Paquetes</a></li>
                <li className='navbar__link-holder'><NavLink to="/contact" className={linkClassName}>Contacto</NavLink></li>
              </>
            )}

            {variant === 'admin' && (
              <>
                  <li className='navbar__link-holder'><NavLink to="/" className={linkClassName}>Inicio</NavLink></li>
                  <li className='navbar__link-holder'>
                    <button type='button' className={`${linkClassName} navbar__link_button`} onClick={handleLogout}>Cerrar sesión</button>
                  </li>
              </>
            )}
          </ul>
        </div>
    )
}

export default Navbar;