import '../Styles/register.css';
import React, {useState} from 'react'
import logo from '../Images/appImages/logo.jpeg';
import axios from 'axios'

const Register = () => {
  const [datos, setDatos] = useState({
    name: '',
    email: '',
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
      email: datos.email,
      password: datos.password
    };

    axios.post('http://localhost:9000/register', formData)
    .then((response) => {
      const data = response.data;
      const validation = response.validation
      console.log(response.data);
      // Puedes realizar acciones adicionales después de enviar los datos
      console.log(validation);
    })
    .catch((error) => {
      console.error(error);
    });

    console.log(datos);
    // También puedes reiniciar los campos del formulario si es necesario
    setDatos({
      name: '',
      email: '',
      password: ''
    });
  };

  return (
    <div className="container-register">
      <div className="container-logo-login">
        <img className="logo-login" alt='Imagen Logo' src={logo} />
      </div>

    <form className="formulario" onSubmit={handleSubmit}>
      <div className="titulo-register">
        <h1>Register</h1>
      </div>


    <div className="container-inp">
      <div>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={datos.name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={datos.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={datos.password}
          onChange={handleChange}
          required
        />
      </div>

      </div>
      <div className="boton">
      <button className="btm-submit" type="submit">Enviar</button>
      </div>
    </form>
    </div>
  );
};

export default Register;
