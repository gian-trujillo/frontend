import { useState, useRef, useEffect } from 'react';
import { getGallery, getPackages } from '../utils/api';
import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Hero/Hero"
import About from "../components/About/About"
import Discover from "../components/Discover/Discover"
import Packages from "../components/Packages/Packages"
import Contact from "../components/Contact/Contact"
import Footer from "../components/Footer/Footer"
import Gallery from '../components/Gallery/Gallery';
import Films from '../components/Films/Films';

function Home({ isLoggedIn, setSelectedPackage, selectedPackage, handleSelectChange }) {
    const [activeGallery, setActiveGallery] = useState(null);
    const [galleryItems, setGalleryItems] = useState([]);
    const [isGalleryLoading, setIsGalleryLoading] = useState(true);
    const [galleryError, setGalleryError] = useState('');
    const nameInputRef = useRef(null);
    const [packages, setPackages] = useState([]);
    const [isPackagesLoading, setIsPackagesLoading] = useState(true);
    const [packagesError, setPackagesError] = useState('');

    const galleryButtons = [
        {
        label: 'I',
        title: 'Eventos',
        info: 'Cobertura para bodas, XV años y celebraciones donde cada detalle importa. Capturo momentos reales, emociones y ambientes para que tu evento se vea elegante, natural y memorable.',
        },
        {
        label: 'II',
        title: 'Retratos',
        info: 'Sesiones pensadas para mostrar tu personalidad con una estética cuidada y dirección visual. Ideal para fotos personales, contenido profesional, redes sociales o simplemente para verte bien en una imagen que sí te represente.',
        },
        {
        label: 'III',
        title: 'Paisajes',
        info: 'Fotografía de aventura, montaña y espacios naturales con una mirada cinematográfica. También puedo acompañarte en rutas, hikes o experiencias al aire libre para documentar tu historia en escenarios únicos.',
        },
        {
        label: 'IV',
        title: 'Drone',
        info: 'Tomas aéreas para mostrar propiedades, eventos, locaciones o contenido desde una perspectiva más impactante. Ideal para crear imágenes dinámicas, profesionales y diferentes a lo que se logra desde el suelo.',
        },
    ];

    const handleButtonClick = (pkg) => {
        const contactSection = document.getElementById('contact');
        setSelectedPackage(pkg);
        if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
            setTimeout(() => {
            if (nameInputRef.current) {
              nameInputRef.current.focus();
            }
          }, 600);  
        }
    }

    useEffect(() => {
      getGallery()
        .then((data) => {
          setGalleryItems(data);
        })
        .catch((err) => {
          setGalleryError(err);
        })
        .finally(() => {
          setIsGalleryLoading(false);
        });
    }, []);

    useEffect(() => {
      getPackages()
        .then((data) => {
          setPackages(data);
          setPackagesError('');
        })
        .catch((err) => {
          setPackagesError(err);
        })
        .finally(() => {
          setIsPackagesLoading(false);
        });
    }, []);
    
    return (
        <>
          <Navbar variant='home' isLoggedIn={isLoggedIn} />
          <Hero />
          <About />
          <Discover galleryButtons={galleryButtons} setActiveGallery={setActiveGallery} activeGallery={activeGallery} />
          {activeGallery && <Gallery setActiveGallery={setActiveGallery} activeGallery={activeGallery} galleryItems={galleryItems} galleryButtons={galleryButtons} isGalleryLoading={isGalleryLoading} galleryError={galleryError} />}
          <Films />
          <Packages onSelect={handleButtonClick} packages={packages} isPackagesLoading={isPackagesLoading} packagesError={packagesError} />
          <Contact onChange={handleSelectChange} selectedPackage={selectedPackage} inputRef={nameInputRef} />
          <Footer />
        </>
    )
}

export default Home;