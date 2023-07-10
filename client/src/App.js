import React from 'react';
import './App.css';

//COMPONENTS IMPORT
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import ProductView from './Components/productView';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Cart from './Components/cart';
import Stock from './Components/stock';

function App() {
  return (
    <Router>
      <Routes>
        {/* <Route path='/' element={<Home />} /> */}
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/viewAdmin'/>
        <Route path='/viewUser'/>
        {/* <Route path='/viewProduct' element={<ProductView/>} /> */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewAdmin' element={<Stock />}/>
      </Routes>
      {/* <ProductView /> */}
    </Router>
  );
}

export default App;