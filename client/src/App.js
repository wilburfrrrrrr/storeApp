import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom'; 

//COMPONENTS IMPORT
import Header from './Components/header';
import Products from './Components/home';
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import ProductView from './Components/productView';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Cart from './Components/cart';
import Stock from './Components/stock';
import Administrator from './Components/administrator';
import Products2 from './Components/products2';



function App() {
  
  const [accessToken, setAccessToken] = useState('');

  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken');
    if (storedToken) {
      setAccessToken(storedToken);
    }
  }, []);

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
          <Route
          path="/Home/:id"
          element={
            accessToken ? (
              <>
                <Header />
                <div className="main-container">
                  <Products2 />
                  <h1>Ya estás registrado</h1>
                </div>
              </>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/viewAdmin'/>
        <Route path='/viewUser'/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewAdmin' element={<Stock />}/>
        <Route path='/admin' element={<Administrator />} />
        <Route path='/viewProduct' element={<ProductView />} />
        <Route path='/product/:id' element={<ProductView />}/>

        <Route path='/admin' element={<Administrator />}/>
      </Routes>
    </Router>
  );
}

export default App;
