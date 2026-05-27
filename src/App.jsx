import { Routes, Route, useNavigate, Navigate  } from "react-router-dom";
import { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/Login/Login";
import Admin from "./pages/Admin/Admin";
import ContactPage from './pages/ContactPage/ContactPage'
import { login } from "./utils/api";
import { setToken, removeToken, getToken } from "./utils/tokens";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!getToken());
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedPackage, setSelectedPackage] = useState('');
  
  const navigate = useNavigate();

  const handleLogin = ({ email, password }) => {
    setErrorMessage('')
    setIsSubmitting(true);

    login({ email, password })
    .then((data) => {
      if (!data || !data.token) {
        throw new Error('No se recibio un token');
      }
      setToken(data.token);
      setIsLoggedIn(true);
      navigate('/admin', { replace: true });
    })
    .catch(() => {
      setErrorMessage('Credenciales no válidas');
    })
    .finally(() => {
      setIsSubmitting(false);
    });
  };

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    navigate('/login', { replace: true });
  }

  const  handleSelectChange = (e) => {
    setSelectedPackage(e.target.value)
  }

  return (
    
    <Routes>
      <Route path="/" element={<Home isLoggedIn={isLoggedIn} setSelectedPackage={setSelectedPackage} selectedPackage={selectedPackage} handleSelectChange={handleSelectChange} />} />
      <Route path="/contact" element={<ContactPage setSelectedPackage={setSelectedPackage} selectedPackage={selectedPackage} handleSelectChange={handleSelectChange} />} />
      <Route path="/login" element={
        isLoggedIn ? (<Navigate to='/admin' replace />) : (<Login handleLogin={handleLogin} isSubmitting={isSubmitting} errorMessage={errorMessage} clearError={() => setErrorMessage('')} />)
      } />
      <Route path="/admin" element={
        isLoggedIn ? (<Admin isLoggedIn={isLoggedIn} onLogout={handleLogout} />) : (<Navigate to='/login' replace />)
      } />
    </Routes>
    
  )
}

export default App
