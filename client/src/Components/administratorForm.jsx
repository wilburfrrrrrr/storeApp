function AdministratorForm(admin) {
    return(
    <form method='post'>
      <div>
        <label htmlFor='name'>Nombre</label>
        <input type='text' name='name' id='name' disabled value={admin[0].name} />
      </div>
      <div>
        <label htmlFor='email'>Email</label>
        <input type='email' name='email' id='email' value={admin[0].email} />
      </div>
      <div>
        <label htmlFor='password'>Contraseña</label>
        <input type='password' name='password' id='password' value={admin[0].password} />
      </div>
      <div>
        <label htmlFor='phone'>Teléfono</label>
        <input type='tel' name='phone' id='phone' value={admin[0].phone} />
      </div>
      <div>
        <label htmlFor='address'>Dirección</label>
        <input type='text' name='address' id='address' value={admin[0].address} />
      </div>
      <button type='submit'>Editar</button>
    </form>
  )}

export default AdministratorForm;