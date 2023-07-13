import React from 'react';
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom';
import '../Styles/cart.css';
import productImg from '../Images/productsImages/product1/1.jpg';

function CartItem() {
  axios.get('localhost:9000/purchase');
  return (
    <div className='item'>
      <div className='itemImage'>
        <img src={productImg} alt='product' />
      </div>
      <div className='itemInfo'>
        <h2>Product</h2>
        <p className='itemQty'>Qty: 1</p>
        <p className='itemPrice'>9.99</p>
        <button className='itemRemove'>Quitar</button>
      </div>
    </div>
  )
}

function Cart() {
  const handleButtonPress = async () => {
    const formData = {
      line_items: [
        {
          price_data: {
            product_data: {
              name: 'Carrito de productos',
              description: 'Cobro por productos en el carrito',
            },
            currency: 'usd',
            unit_amount: 20000, //200.00
          },
          quantity: 1
        }
      ]
    }
    try {
      axios.post('http://localhost:9000/checkout', formData)
        .then(res => {
          console.log(res.data.result);
          if(res.data.result) {
            window.location.href = res.data.result.url;
          }
        })
    } catch (error) {
      console.error(error);
    }
  };

  // axios.post('http://localhost:9000/checkout', formData)
  //   .then(res => {
  //     console.log(res.result)
  //   })
  return (
    <>
      <h1 className='cartTitle'>Shopping Cart</h1>
      <div className='cart'>
        <div className='cartItems'>
          <CartItem />
          {/* <CartItem /> */}
        </div>
        <div className='cartTotal'>
          <p className='cartTotalTitle'>Total:</p>
          <p className='cartTotalPrice'>$9.99</p>
          <button onClick={handleButtonPress}>Pagar</button>
        </div>
      </div>
    </>
  )
}

export default Cart