import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

//COMPONENTS IMPORT
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import Cart from './Components/cart';
import Stock from './Components/stock';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewAdmin' element={<Stock />}/>
      </Routes>
    </Router>
  );
}

export default App;