import React from "react";
import '../Styles/login.css';
import logo from '../Images/appImages/logo.jpeg';
import { useState } from 'react';
import {handleChange, handleSubmit} from '../Functions/loginFunctions';

const CompShowLogin = () => { // Se define el componente.

    const [datos, setDatos] = useState({
        name: '',
        password: ''
      });
    
      const handleChange = (e) => {
        setDatos({
          ...datos,
          [e.target.name]: e.target.value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes realizar acciones adicionales, como enviar los datos al servidor
    
        const formData = {
          name: datos.name,
          password: datos.password
        };
    
        axios.post('http://localhost:9000/login', formData)
        .then((response) => {
          console.log(response.data);
          // Puedes realizar acciones adicionales después de enviar los datos
        })
        .catch((error) => {
          console.error(error);
        });
    
        console.log(datos);
        // También puedes reiniciar los campos del formulario si es necesario
        setDatos({
          name: '',
          password: ''
        });
      };

    return ( // Estructura HTML del componente.
    <div className="container-login">
        <div className="container-logo-login">
            <img className="logo-login" alt='Imagen Logo' src={logo} />
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