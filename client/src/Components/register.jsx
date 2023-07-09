import '../Styles/register.css';
import React, {useState} from 'react'
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
      email: '',
      password: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
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
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={datos.password}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Register;

