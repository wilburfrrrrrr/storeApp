import React from 'react';
import './Styles/App.css';
//import CompShowLogin from './Components/login';
import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
