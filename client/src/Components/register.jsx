import '../Styles/register.css';


function Register() {
  return (
    <div className="App">
      <div className="App-header">
        <div>
         <h1>Register</h1>
         <input type="text" placeholder="name" className="name"/>
         <input type="text" placeholder="last name" className="lastname"/>
         <input type="text" placeholder="mail" className="name"/>
         <input type="text" placeholder="password" className="name"/>
        </div>

        <div clasName="register">
        <button><a href="#">Registrarte</a></button>

      </div>
      </div>    
    </div>
  );
}

export default Register;
