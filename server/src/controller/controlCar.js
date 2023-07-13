import mysql from "mysql"
import { alertMail } from "./mails.js"
import Stripe from 'stripe'
import jwt from 'jsonwebtoken';
import { query } from "express";

// se agrega tabla de carrito y lista de productos
// campos para carrito -> id del carrito, id del usuario FK, fecha de creacion
// lista de productos -> id del proceso, id del carrito, id del producto, cantidad
/*
CREATE TABLE IF NOT EXISTS userCar(
  id PK
  userId FK
  date
);

CREATE TABLE IF NOT EXISTS puchaseList(
  id
  carId
  productId
  amount
);


id = req.id
queryCarOpen 
queryVerifyUser 'SELECT'
*/

const stripeSecret = "sk_test_51NS4P4KVzQlPajzBoWrdb25nCwhexkdZe8E1qvNIDGOaEEEvqxzzomsGg8pcGwkazZRrMyhcvWLbhiMpPl5pgHhd00S8mgl93p"
const purchaseList = new Array;
const stripe = new Stripe(stripeSecret)
const db = mysql.createConnection({
  host    : "localhost",
  user    : "root",
  password: "contraseña12345",
  database: "theStore",
});

//Esperar que se crea la tabla usuario-carrito

// export const loadUsersCar = (req, res) => {
// 	const queryProducts = 'SELECT * FROM '
// }

export const addCar = async (req, res) => {
  const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
	const querySelect           = 'SELECT * FROM products WHERE name = ?';
	const queryReserve          = 'UPDATE products SET amount = ? WHERE id = ?';
  const queryVerifyCar        = 'SELECT * FROM userCar WHERE userId = ?';
  const queryInsertCar        = 'INSERT INTO userCar (userId, date) VALUES (?, ?)';
  const queryVerifyProduct    = 'SELECT * FROM purchaseList WHERE productId = ?';
  const queryIncreaseProduct  = 'UPDATE purchaseList SET amount = ? WHERE productId = ?';
  const queryAddProduct       = 'INSERT INTO purchaseList (id, carId, productId, amount) VALUES (?, ?, ?, ?)';
  const queryAddCar           = 'INSERT INTO ';

  db.query(queryVerifyCar, userId)
  .then(result => {
    if (result.length == 0){
      db.queryInsertCar(queryInsertCar, [userId, curdate()])
      .then(() => {
        console.log("Carro asignado a usuario")
      })
      .catch(console.error("Error al asignar carro a usuario"))
    }
  },
    db.query(querySelect, )
    .then(results => {

    })
    .catch(console.error("Error al buscar el producto en el inventario"))
  )
  .catch(console.error("Error al acceder al registro de carros"))
  

  
  
  

}


export const removeCar = (req, res) => {
	const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
	const querySelect           = 'SELECT * FROM products WHERE name = ?';
	const queryReserve          = 'UPDATE products SET minStock = ? WHERE id = ?';
  const queryVerifyCar        = 'SELECT * FROM userCar WHERE userId = ?';
  const queryInsertCar        = 'INSERT INTO userCar (id, userId, date) VALUES (?, ?, ?)';
  const queryVerifyProduct    = 'SELECT * FROM purchaseList WHERE productId = ?';
  const queryIncreaseProduct  = 'UPDATE purchaseList SET amount = ? WHERE productId = ?';
  const queryAddCar           = 'INSERT INTO purchaseList (id, carId, productId, amount) VALUES (?, ?, ?, ?)';
}
  

const checkInventory = (stock, req, res) => {
  const queryAmount = 'SELECT amount FROM products WHERE id = ?';
  const queryMinStack = 'SELECT minStock FROM products WHERE id = ?';
  // const minStock = db.query('SELECT minStock FROM products WHERE id = ?', )
  const minStock = 5, maxStock = 30;
  // const stock = product.minStock;
  if (stock >= maxStock || stock <= minStock){
    alertMail();
  }
  
}

export const calculatePrice = (req, res) => {
  let prices = 0;
  
  for(let countPos = 0; countPos < purchaseList.length; countPos++){
    prices += purchaseList[countPos].price;
    checkInventory(purchaseList[countPos].minStock);
  }
  return prices;
}


// export const createSession = async (req, res) => {
// 	const data = req.body;
// 	// console.log(data);
// 	const line_items = data.line_items;
// 	// console.log(items);
// 	// const prueba = {
// 	//   items,
// 	//   mode: 'payment',
// 	//   success_url: 'http://localhost:9000/success',
// 	//   cancel_url: 'http://localhost:9000/cancel',
// 	// }
// 	// console.log(prueba);
// 	const session = await stripe.checkout.sessions.create({
// 	  line_items,
// 	  mode: 'payment',
// 	  success_url: 'http://localhost:9000/success',
// 	  cancel_url: 'http://localhost:9000/cancel',
// 	})
// 	res.json({result:session})
//   }

export const createSession = async (req, res) => {
  let price = calculatePrice() / 40;
  const session = await stripe.checkout.sessions.create({
    line_items: [
      {
        price_data: {
          product_data: {
            name: 'Carrito de productos',
            description: 'Cobro por productos en el carrito',
          },
          currency: 'usd',
          unit_amount: price, //200.00
        },
        quantity: 1
      }
    ],
    mode: 'payment',
    success_url: 'http://localhost:9000/success',
    cancel_url: 'http://localhost:9000/cancel',
  })
  return res.json(session)
}

export const cancelPurchaseList = (req, res) => {
	let countPos = 0;
	const query = 'UPDATE products SET minStock = ? WHERE id = ?';
  
	while(countPos < purchaseList.length){
	  db.query(query, [purchaseList[countPos].minStock + 1, purchaseList[countPos].id])
	  .then(console.log('Reserva anulada correctamente'))
	  .catch(console.error('Error al acceder a la reserva'))
	  purchaseList.pop();
	  countPos++;
	}
  }
  
  export const cleanPurchaseList = (req, res) => {
	let countPos = 0;
	while(countPos < purchaseList.length){
	  purchaseList.pop();
	  countPos++;
	}
  }