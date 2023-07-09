import React from 'react';
import '../Styles/productElement.css';
import {Link} from 'react-router-dom';



function ProductElement(props) {
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

            <Link to={`/product/${props.idProduct}`} className='ProductLink'>
                <button className='ProductButton'>More Info</button>
            </Link>
            
            
        </div>
    );
    

}

export default ProductElement;