import React from 'react';
import '../Styles/productView.css';
import { useParams } from 'react-router-dom';
import  Data from '../data.json';

function ProductView(props) {
    const {idProduct} = useParams();

    

    return(
        <div className='mainContainer'>
            <div className='productContainer'>
                <div className='productImage'>
                    <img src={require('../Images/productsImages/product1/2.jpg')} alt='productImage' />
                </div>

                <div className='productInfo'>
                    <div className='productName'>
                        <h1>Nombre del Producto</h1>
                    </div>
                    <div className='productPrice'>
                        <h2>Precio</h2>
                    </div>
                    <div className='productAmount'>
                        <h3>CantDisponible</h3>
                    </div>
                    <div className='productButton'>
                        <div></div>
                        <input type='number'/>
                        <button>Agregar al Carrito</button>
                    </div>

                </div>
            </div>

            <div className='productDescription'>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio quasi corrupti itaque possimus iste eum enim dolor rerum quis voluptas, ea doloremque, vitae laboriosam voluptates sequi. Placeat totam unde neque. Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis omnis eos corporis eaque fuga a sed maxime labore mollitia magni dolorum asperiores ea quod aut voluptate, quo officia iusto laborum. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad nostrum repellendus nulla tempore rerum, ipsum sequi soluta optio aliquid aperiam, nihil aut consequatur non dolore reprehenderit delectus aspernatur ut accusantium! Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia enim odit, placeat commodi ad inventore ipsam facere dolorum ipsum voluptatibus culpa quo aperiam tenetur sapiente quis nobis blanditiis. Cumque, magnam?</p>
            </div>

        </div>
    );
    

}

export default ProductView;