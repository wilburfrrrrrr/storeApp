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



export const addCar = async (req, res) => {
  const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
	const querySelect           = 'SELECT * FROM products WHERE name = ?';
	const queryReserve          = 'UPDATE products SET amount = ? WHERE id = ?';
  const queryVerifyCar        = 'SELECT * FROM userCar WHERE userId = ?';
  const queryInsertCar        = 'INSERT INTO userCar (userId, date) VALUES (?, ?)';
  const queryVerifyProduct    = 'SELECT * FROM purchaseList WHERE carId = ? and productId = ?';
  const queryIncreaseProduct  = 'UPDATE purchaseList SET amount = ? WHERE carId = ? and productId = ?';
  const queryAddProduct       = 'INSERT INTO purchaseList (carId, productId, amount) VALUES (?, ?, ?)';

  db.query(queryVerifyCar, userId)
  .then(carAssigned => {
    if (carAssigned.length == 0){
      db.queryInsertCar(queryInsertCar, [userId, curdate()])
      .then((carInserted) => {
        console.log("Carro asignado a usuario")
        db.query(querySelect, )////////////////////////////////////////////////////////////////////??
        .then((productSelected) => {
          db.query(queryReserve, [productSelected[0].id, productSelected[0].amount - 1])
          .then(console.log("Producto reservado"))
          .catch(console.error("Error al realizar la reserva"))
          db.query(queryVerifyProduct, [carInserted.insertId, productSelected[0].id])
          .then((listResult) => {
            if(listResult.result == 0){
              db.query(queryAddProduct, [carInserted.insertId, productSelected[0].id, 1])
              .catch(console.error("Error al modificar la lista de compra"))
            }else{
              db.query(queryIncreaseProduct, [listResult[0].amount + 1, carInserted.insertId, productSelected[0].id])
            }
          })
          .catch(console.error("Error al buscar el producto en la lista de compras"))
        })
        .catch(console.error("Error al acceder al producto"))
      })
      .catch(console.error("Error al asignar carro a usuario"))
    }else{
      db.query(querySelect, )////////////////////////////////////////////////////////////////////??
        .then((productSelected) => {
          db.query(queryReserve, [productSelected[0].id, productSelected[0].amount - 1])
          .then(console.log("Producto reservado"))
          .catch(console.error("Error al realizar la reserva"))
          db.query(queryVerifyProduct, [carAssigned.insertId, productSelected[0].id])
          .then((listResult) => {
            if(listResult.result == 0){
              db.query(queryAddProduct, [carAssigned.insertId, productSelected[0].id, 1])
              .catch(console.error("Error al modificar la lista de compra"))
            }else{
              db.query(queryIncreaseProduct, [listResult[0].amount + 1, carAssigned.insertId, productSelected[0].id])
            }
          })
          .catch(console.error("Error al buscar el producto en el carrito de compras"))
        })
        .catch(console.error("Error al acceder al producto"))
    }
  },
  )
  .catch(console.error("Error al acceder al registro de carros de compra"))
}


export const removeCar = (req, res) => {
	const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
	const querySelect           = 'SELECT * FROM products WHERE name = ?';
	const queryReserve          = 'UPDATE products SET amount = ? WHERE id = ?';
  const queryVerifyCar        = 'SELECT * FROM userCar WHERE userId = ?';
  const queryVerifyProduct    = 'SELECT * FROM purchaseList WHERE carId = ? and productId = ?';
  const queryDecreaseProduct  = 'UPDATE purchaseList SET amount = ? WHERE carId = ? and productId = ?';
  const queryRemoveCar        = 'DELETE FROM purchaseList WHERE carId = ? and productId = ?';

  db.query(queryVerifyCar, userId)
  .then(carAssigned => {
    db.query(querySelect, ) ////////////////////////////////////////////////////////////////////??
    .then(productSelected => {
      db.query(queryReserve, [productSelected[0].amount + 1, productSelected[0].id])
      .then(console.log("Reserva anulada"))
      .catch(console.error("Error al acceder a la reserva"))
      db.query(queryVerifyProduct, [carAssigned.insertId, productSelected[0].id])
      .then(listResult => {
        if (listResult[0].amount > 1){
          db.query(queryDecreaseProduct, [listResult[0].amount + 1, carAssigned.insertId, productSelected[0].id])
          .catch(console.error("Error al modificar el carrito de compras"))
        }else{
          db.query(queryRemoveCar, [carAssigned.insertId, productSelected[0].id])
        }
      })
      .catch(console.error("Error al acceder a la lista de productos"))
    })
    .catch(console.error("Error al acceder al producto"))
  })
  .catch(console.error("Error al acceder al registro de carros de compra"))
}
  

const checkInventory = (productId) => {
  const queryAmount   = 'SELECT amount FROM products WHERE id = ?';
  const queryMinStack = 'SELECT minStock FROM products WHERE id = ?';
  // const minStock = db.query('SELECT minStock FROM products WHERE id = ?', )
  db.query(queryMinStack, productId)
  .then((productAmount) => {
    db.query(queryAmount, productId)
    .then((result) => {
      if (result <= productAmount){
        alertMail();
      }
    })
    .catch(console.error("Error al acceder al stock del producto"))
  })
  .catch(console.error("Error al acceder al stock del producto"));
}

export const calculatePrice = (req, res) => {
  let prices = 0;
  const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
  const queryCount      = 'SELECT * FROM purchaseList WHERE carId = ?';
  // const queryPrice      = 'SELECT price FROM products WHERE id = ?';
  const queryVerifyCar  = 'SELECT * FROM userCar WHERE userId = ?';


  db.query(queryVerifyCar, userId)
  .then(carAssigned =>{
    db.query(queryCount, carAssigned.insertId)
    .then(products => {
      for(let idCount = 0; idCount < products.length; idCount++){
        price += products[idCount].price;
        checkInventory(products[idCount].productId);
      }
    })
    .catch(console.error("Error al acceder a los productos del carrito"))
  })
  .catch(console.error("Error al acceder a la lista de compras"))
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
  const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
  const queryVerifyCar      = 'SELECT * FROM userCar WHERE userId = ?';
  const querySelectProducts = 'SELECT * FROM purchaseList WHERE carId = ?';
  const queryTruncate       = 'DELETE FROM purchaseList WHERE carId = ?';
	const queryCancelReserve  = 'UPDATE products SET amount = ? WHERE id = ?';
  
  db.query(queryVerifyCar, userId)
  .then(carAssigned => {
    db.query(querySelectProducts, carAssigned.insertId)
    .then(products => {
      for(let idCount = 0; idCount < products.length; idCount++){
        db.query(queryCancelReserve, [products[idCount].amount + 1, products[idCount].id])
        .catch("Error al cancelar la reserva")
      }
      db.query(queryTruncate, carAssigned.insertId)
      .then(console.log("Lista de compras eliminada"))
      .catch(console.error("Error al limpiar la lista de compras"))
    })
    .catch(console.error("Error al acceder a los productos"))
  })
  .catch(console.error("Error al acceder al carrito de compras"))
}
  
export const cleanPurchaseList = (req, res) => {
  const token   = localStorage.getItem('accessToken');
  const userId  = token.id;
  const queryVerifyCar  = 'SELECT * FROM userCar WHERE userId = ?';
  const queryTruncate   = 'DELETE FROM purchaseList WHERE carId = ?'
  db.query(queryVerifyCar, userId)
  .then(carAssigned => {
    db.query(queryTruncate, carAssigned.insertId)
    .then(console.log("Carrito eliminado con exito"))
    .catch(console.error("Error al limpiar el carrito de compras"))
  })
  .catch(console.error("Error al acceder al carrito de compras"))
  
}