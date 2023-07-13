import React from 'react';
import '../Styles/cart.css';
import productImg from '../Images/productsImages/product1/1.jpg';
import axios from 'axios';

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
)}

function Cart() {
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
                <button>Pagar</button>
            </div>
        </div>
    </>
  )
}

export default Cart