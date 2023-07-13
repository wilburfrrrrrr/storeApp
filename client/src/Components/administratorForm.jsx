//create a function to change administrator data, on change

import React, {useState} from 'react';

function AdministratorForm(admin) {

  const [formData, setFormData] = useState(admin.admin[0]);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    if (e && e.target) {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const toggleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <div className='adminData'>
      <form method='post'>
        <div>
          <label htmlFor='name'>Nombre</label>
          <input type='text' name='name' id='name' disabled value={formData.name} />
        </div>
        <div>
          <label htmlFor='email'>Email</label>
          <input type='email' name='email' id='email' value={formData.email} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor='password'>Contraseña</label>
          <input type='password' name='password' id='password' value={formData.password} onChange={handleInputChange} />
        </div>
        <div>
          <input type='checkbox' id='showPassword' checked={showPassword} onChange={toggleShowPassword} />
          <label htmlFor='showPassword'>Mostrar contraseña</label>
        </div>
        <div>
          <label htmlFor='phone'>Teléfono</label>
          <input type='tel' name='phone' id='phone' value={formData.phone} onChange={handleInputChange}/>
        </div>
        <div>
          <label htmlFor='address'>Dirección</label>
          <input type='text' name='address' id='address' value={formData.address} onChange={handleInputChange}/>
        </div>
        <button type='submit'>Editar</button>
      </form>
    </div>
  )
}

export default AdministratorForm;
        