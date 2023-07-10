import '../Styles/products.css';
import ProductElement from './productElement2'

import Data from '../products.json';

import '../Styles/products.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';


const Products2 = () => {
    const {id} = useParams();
    const [data, setData] = useState(Data);
    console.log(id);

    return ( // Estructura HTML del componente.
    data.products.map ( product => (
        <div className='item'>
        <ProductElement 
            productName= {product.name}
            productPrice= {product.price}
            idProduct= {product.id}
            idImage= "1"
            idUser = {id}
        />
        </div>
   )) 
);
}



export default Products2; // Se exporta el componente    
