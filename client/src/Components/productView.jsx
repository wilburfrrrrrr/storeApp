import React from 'react';
import '../Styles/productView.css';

function ProductView(props) {
    return(
        <div className='mainContainer'>
            <div className='infoProduct'>
                <div className='productImage'>
                    <img src={props.product.image} alt='productImage' />
                </div>

                <div className='priceContainer'>
                    <h2>Precio</h2>
                </div>

                <div>
                    
                </div>

            </div>

            <div className='descriptionProduct'>

            </div>

        </div>
    );
    

}

export default ProductView;