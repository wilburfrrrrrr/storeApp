import '../Styles/register.css';
import React, {useState} from 'react'
import axios from 'axios'

const Register = () => {
  const [datos, setDatos] = useState({
    nombre: '',
    email: '',
    mensaje: ''
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
      nombre: datos.nombre,
      email: datos.email,
      mensaje: datos.mensaje
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
      nombre: '',
      email: '',
      mensaje: ''
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={datos.nombre}
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
        <label htmlFor="mensaje">Mensaje:</label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={datos.mensaje}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default Register;

