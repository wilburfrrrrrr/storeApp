import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

//COMPONENTS IMPORT
import Header from './Components/header';
import Products from './Components/products';
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import Cart from './Components/cart';
import Stock from './Components/stock';
import Administrator from './Components/administrator';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={  
          <>
            <Header />
            <div className='main-container'>
              <Products />
            </div>
          </> } />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewAdmin' element={<Stock />}/>
        <Route path='/admin' element={<Administrator />} />
      </Routes>
    </Router>
  );
}

export default App;