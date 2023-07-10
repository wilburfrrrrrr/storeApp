import React from 'react';
import '../Styles/header.css';
import { BsPerson, BsBag } from 'react-icons/bs';
import logo from '../Images/appImages/logo.jpeg'; // Importa la imagen

const Header = () => {
  return (
    <header className="container-header">

      <a href='/'>
        <div className="logo">
          <img src={logo} alt="Logo de la tienda" /> {/* Utiliza la imagen */}
        </div>
      </a>

      <a href='#'>
        <div className="title">Página de tienda</div>
      </a>

      <div className="actions">
        <div className="link">
          <BsPerson size={30} />
        </div>
        <div className="link">
          <BsBag size={24} />
          <span className='item_total'>0</span>
        </div>
      </div>
    </header>
  );
};

export default Header;