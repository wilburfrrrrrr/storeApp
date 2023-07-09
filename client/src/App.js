import React from 'react';
import './App.css';
// import ProductElement from './Components/productElement';
import Register from './Components/Register';
import Login from './Components/Login';
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