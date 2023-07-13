import React from 'react';
import '../Styles/productElement.css';

function ProductsHome(props) {

    return(
        <div className="ProductContainer">
            
            <div className="ProductImage">
                <img src={require(`../Images/productsImages/product${props.idProduct}/${props.idImage}.jpg`)} alt='imagen' />
            </div>
            <div className='ProductInfo'>
                <div className='ProductTitle'>
                    <h2>{props.productName}</h2>
                </div>
                <div className='ProductPrice'>
                    <h3>${props.productPrice}</h3>
                </div>
            </div>

            <button className='ProductButton'>{props.idUser}</button>
            
        </div>
    );
    

}

export default ProductsHome;