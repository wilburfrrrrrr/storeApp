import React from 'react';
import '../Styles/header.css';
import { BsPerson, BsBag, BsFillArrowLeftCircleFill } from 'react-icons/bs';
import logo from '../Images/appImages/logo.jpeg'; // Importa la imagen

const Header = (props) => {
  return (
    <header className="container-header">

      <a href='/'>
        <div className="logo">
          <img src={logo} alt="Logo de la tienda" /> {/* Utiliza la imagen */}
        </div>
      </a>

      <div className="title">
        <a href='#'>THE LEGO GARAGE</a>
      </div>
      
        


      <div className="actions">
        <div className='nameMessage'>
          <h3>Bienvenido {props.idUser}!</h3>
        </div>

        <div className="link">
          <BsPerson size={30} />
        </div>
        <div className="link">
          <BsBag size={24} />
          <span className='item_total'>0</span>
        </div>
        <div className='link'>
          <BsFillArrowLeftCircleFill size={30} />
        </div>
      </div>
    </header>
  );
};

export default Header;