import './App.css';

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
import Home from './Components/products2';

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
        <Route path='/home' element={  
        <>
          <Header />
          <div className='main-container'>
            <Home />
            <h1>Ya estas registrado</h1>
          </div>
        </> } />
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