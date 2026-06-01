import { NavLink } from 'react-router-dom';
import Contact from "../../components/Contact/Contact"

function ContactPage({ selectedPackage, handleSelectChange, nameInputRef }) {

    return (
        <main className="contact__page">
            <NavLink to='/' className="contact__page_home-button">Inicio</NavLink>
            <Contact variant="full" selectedPackage={selectedPackage} onChange={handleSelectChange} inputRef={nameInputRef} />
        </main>
    )
}

export default ContactPage;