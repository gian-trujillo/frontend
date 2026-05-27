import nikon from '../../images/nikon.png';
import drone from '../../images/drone.png';
import weebill from '../../images/weebill.png';
import aftereffects from '../../images/aftereffects.png';
import davinci from '../../images/davinci.png';
import lightroom from '../../images/lightroom.png';

function About() {
    return (
        <section className="about" id='about'>
            <div className='about__container'>
                <div className="about__info">
                    <div className="about__info_eyebrow">
                        <p className='about__info_number'>01</p>
                        <span className="about__info_line"></span>
                        <p className="about__info_topic">Acerca de mí</p>
                    </div>
                    <h2 className="about__info_title">Una mirada honesta <br />detrás del <em className="about__info_emphasis">lente</em>.</h2>
                    <p className="about__info_intro">Mi nombre es Gian Trujillo.<br />Documento los días que no querrás olvidar.</p>
                    <p className="about__info_text">Compre mi primera cámara, empecé a practicar y desde entonces va creciendo el amor al arte. Empece fotografiando a mis amigos y nunca me detuve. Hoy, trabajo con gente que tienen una historia por contar; una historia con peso, luz adecuada y tiempo bien usado.</p>
                    <p className="about__info_text">Asi quieras fotografiar una salida al parque, o la boda de tus sueños, puedo ayudarte a capturar esos momentos tan especiales. Cada sesión se cubre de manera profesional, edición y color en RAW y entraga en alta resolución. Disponible para viajar dentro del area metropolitana de Monterrey.</p>
                    <div className='about__info_software_container'>
                        <div className='about__info_software-card'>
                            <img src={davinci} alt="logo de davinci resolve" className='about__info_software' />
                            <p className='about__info_software-name'>Davinci Resolve</p>
                        </div>
                        <div className='about__info_software-card'>
                            <img src={lightroom} alt="logo de davinci resolve" className='about__info_software' />
                            <p className='about__info_software-name'>Lightroom</p>
                        </div>
                        <div className='about__info_software-card'>
                            <img src={aftereffects} alt="logo de davinci resolve" className='about__info_software' />
                            <p className='about__info_software-name'>After Effects</p>
                        </div>
                    </div>
                </div>
                <div className="about__tools">
                    <div className="about__tools_card">
                        <p className='about__tools-card-label'>i-</p>
                        <div className='about__tools_image-container'>
                            <img src={nikon} alt="Imagen de un Nikon Z5" className="about__tools_image" />
                        </div>
                        <div className="about__tools_image-description">
                            <h4 className="about__tools_image-title">Nikon Z5</h4>
                            <p className='about__tools_image-text'>24.3 MP full-frame mirrorless · 4K UHD · Detección de ojos para enfoque automatico</p>
                        </div>
                    </div>
                    <div className="about__tools_card">
                        <p className='about__tools-card-label'>ii-</p>
                        <div className='about__tools_image-container'>
                            <img src={drone} alt="Imagen de un Nikon Z5" className="about__tools_image" />
                        </div>
                        <div className="about__tools_image-description">
                            <h4 className="about__tools_image-title">DJI Air 3</h4>
                            <p className='about__tools_image-text'>Cámara Gran Angular y Telecámara Media de 48 MP · Vídeo 4K/60 fps HDR · Foto: 12 MP y 48 MP en ambas cámaras</p>
                        </div>
                    </div>
                    <div className="about__tools_card">
                        <p className='about__tools-card-label'>iii-</p>
                        <div className='about__tools_image-container'>
                            <img src={weebill} alt="Imagen de un Nikon Z5" className="about__tools_image" />
                        </div>
                        <div className="about__tools_image-description">
                            <h4 className="about__tools_image-title">Weebill 3</h4>
                            <p className='about__tools_image-text'>Estabilizador de tres ejes · Luz LED incorporada con temperatura de color ajustable</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        
    )
}

export default About;