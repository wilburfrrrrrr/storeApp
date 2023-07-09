import './App.css';
import Header from './Components/header';
import Products from './Components/products';
// import ProductElement from './Components/productElement';
import Register from './Components/register';
import Login from './Components/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

function App() {
  return (
    <Router>
      <Routes>

      {/* borrar para merge */}

      <Route path='/' element={  
        <>
          <Header />         

          <div className='main-container'>
            <Products />
          </div>
        </> 

      } />

      {/* borrar para merge */}

        {/* <Route path='/' element={<home/>} /> */}
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/viewAdmin'/>
        <Route path='/viewUser'/>
      </Routes>
    </Router>
  );
}

export default App;