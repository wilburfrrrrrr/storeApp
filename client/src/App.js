import './Styles/App.css';
//import CompShowLogin from './Components/login';
import ProductElement from './Components/productElement';
import Register from './Components/register';

function App() {
  return (
    <div className="App">
      {/* <CompShowLogin />  This show the login*/}
    {/* <ProductElement
      productImage='1' 
      productName='PRUEBA'
      productPrice='500'
      idProduct='1'
      idImage='1'
      /> */}
      <Register />
    </div>
  );
}

export default App;
