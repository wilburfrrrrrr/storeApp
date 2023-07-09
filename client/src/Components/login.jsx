import React from "react";
import '../Styles/login.css';

const CompShowLogin = () => { // Se define el componente.

    return ( // Estructura HTML del componente.
    <div className="container-login">
        <div className="container-logo-login">
            <img className="logo-login" alt='Imagen Logo' src={require("../Images/appImages/Logo.jpeg")} />
        </div>

        <form method="post">
            <div className="titulo-login">
                <h1>Login</h1>
            </div>
            <div className="container-input">
                <div className="user">
                    <input  type="text" placeholder="Ingrese su usuario..." required />
                </div>
                
                <div className="password">
                    <input  className="input-login" type="password" placeholder="Ingrese su contraseña..." required />
                </div>
            </div>

            <div className="container-submit">
                <input type="submit" className="btn-submit" value="Entrar" />
            </div>
            <div className="register-link">
                <span className="register" > Crear una cuenta</span>
            </div>
        </form>
    </div>
    )
}
export default CompShowLogin; // Se exporta el componente