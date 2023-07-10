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
        <Route path='/viewAdmin'/>
        <Route path='/viewUser'/>
        <Route path='/cart' element={<Cart />} />
        <Route path='/viewAdmin' element={<Stock />}/>
        <Route path='/admin' element={<Administrator />} />
        <Route path='/viewProduct' element={<ProductView />} />
        <Route path='/product/:id' element={<ProductView />}/>

      </Routes>
    </Router>
  );
}

export default App;