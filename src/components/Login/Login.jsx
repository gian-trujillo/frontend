import { NavLink } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login({ handleLogin, isSubmitting, errorMessage, clearError }) {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [showPassword, setShowPassword] = useState(false);

    const toggleVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        if (errorMessage) {
            clearError()
        }

        setData((currentValues) => ({
            ...currentValues,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        handleLogin(data);
    }

    return (
        <div className="login">
            <div className="login__main">
                <NavLink to='/' className="login__home-button">Home</NavLink>
                <h2 className="login__title">Inicia sesión</h2>
                <span className="login__line"></span>
                <form action="" className="login__form" onSubmit={handleSubmit}>
                    <input type="email" name="email" id="email" placeholder="Correo electrónico" className="login__field" value={data.email} onChange={handleChange} required />
                    <div className="login__password-holder">
                        <span className="login__password-icon" onClick={toggleVisibility}>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                        <input type={showPassword ? "text" : "password"} name="password" id="password" placeholder="Contraseña" className="login__field login__field-password" value={data.password} onChange={handleChange} required />
                    </div>
                    {errorMessage && (
                        <div className="login__tooltip">
                            <p className="login__error">{errorMessage}</p>
                        </div>
                    )}
                    <button className="login__button" type="submit" disabled={isSubmitting}>{isSubmitting ? 'Entrando...' : 'Inicia sesión'}</button>
                </form>
            </div>
            <div className="login__footer">
            <span className="login__line"></span>
                <p className="login__footer-text">Gian Trujillo</p>
            </div>
        </div>
    )
}

export default Login;