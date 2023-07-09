import React from 'react';
import './App.css';
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import Cart from './Components/cart';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/' element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default App;