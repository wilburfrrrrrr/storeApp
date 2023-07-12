import React from 'react';
import '../Styles/productView.css';
import { useParams } from 'react-router-dom';
import  Data from '../data.json';
import { useState } from 'react';
import Header from './header';

function ProductView(props) {

    const idProduct = useParams();
    console.log(idProduct);

    const [data,setData] = useState(Data);

    let product = {};

   
    data.products.map((current) => {
        if (current.id == idProduct.id){
            product = {
                "id": current.id,
                "name": current.name,
                "price": current.price,
                "description": current.description,
                "amount": current.amount
            };
            console.log(product);
        }
    });
        
    return(

        <div className='mainContainer'>
            <div className='productContainer'>
                <div className='productImage'>
                    <img src={require(`../Images/productsImages/product${product.id}/1.jpg`)} alt='productImage' />
                </div>

                <div className='productInfo'>
                    <div className='productName'>
                        <h1>{product.name}</h1>
                    </div>
                    <div className='productPrice'>
                        <h2>{product.price}</h2>
                    </div>
                    <div className='productAmount'>
                        <h3>Disponibles: {product.amount}</h3>
                    </div>
                    <div className='productButton'>
                        <div></div>
                        <input type='number'/>
                        <button>Agregar al Carrito</button>
                    </div>

                </div>
            </div>

            <div className='productDescription'>
                    <p>{product.description}</p>
            </div>

        </div>
    );
    

}

export default ProductView;