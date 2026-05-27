import Navbar from "../../components/Navbar/Navbar";
import AdminGalleryEditor from "../../components/AdminGalleryEditor/AdminGalleryEditor";
import AdminPackagesEditor from "../../components/AdminPackagesEditor/AdminPackagesEditor";
import AdminFilmsEditor from "../../components/AdminFilmsEditor/AdminFilmsEditor";

function Admin({ onLogout, isLoggedIn }) {
  return (
    <>
        <Navbar variant='admin' isLoggedIn={isLoggedIn} onLogout={onLogout} />
        <main className="admin">
          <div className="admin__container">
            <section className="admin__hero">
                <p className="admin__eyebrow">Panel privado</p>
                <h1 className="admin__title">Admin dashboard</h1>
                <p className="admin__subtitle">Edita las galerías, reemplaza imágenes o videos y actualiza los paquetes del sitio.</p>
            </section>

            <AdminGalleryEditor />
            <AdminFilmsEditor />
            <AdminPackagesEditor />
          </div>
          <div className="admin__footer">
            <p className="admin__footer-text">Gian Trujillo</p>
          </div>
        </main>
    </>
  );
}

export default Admin;