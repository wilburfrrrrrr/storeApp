import '../Styles/login.css';
import React, {useState} from 'react';
import logo from '../Images/appImages/logo.jpeg';
import { Link, useNavigate } from 'react-router-dom';

import axios from 'axios';

const CompShowLogin = () => { // Se define el componente.

    const [datos, setDatos] = useState({
        name: '',
        password: ''
      });
      
      const navigate = useNavigate();

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
          localStorage.setItem('accessToken', response.data.accessToken);
          console.log(response.data.accessToken);
          // Puedes realizar acciones adicionales después de enviar los datos
          if (response.data.validation){
            if (response.data.rol === 'user'){
              navigate(`/Home/${response.data.id}`);
            } else if (response.data.rol === 'admin'){
              navigate('/admin')
            }
          }else{
            navigate('/login')
          }
        
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
      }
    
    return ( // Estructura HTML deimport React from "react";
            <div className="container-login">
            <div className="container-logo-login">
                <img className="logo-login" alt='Imagen Logo' src={logo} />
            </div>

            <form onSubmit={handleSubmit}>
                <div className="titulo-login">
                    <h1>Login</h1>
                </div>
                <div className="container-input">
                    <div className="user">
                        <input className="input-login" name='name' type="text" placeholder="Ingrese su usuario..." value={datos.name} onChange={handleChange} required />
                    </div>
                    
                    <div className="password">
                        <input  className="input-login" name='password' type="password" placeholder="Ingrese su contraseña..." value={datos.password} onChange={handleChange} required />
                    </div>
                </div>

                <div className="container-submit">
                    <input type="submit" className="btn-submit" value="Entrar" />
                </div>
                <div className="register-link">
                  <Link to="/register" className='register'>
                    Crear una cuenta
                  </Link>
                </div>
            </form>
        </div>
    ); 
};
export default CompShowLogin; // Se exporta el componente
