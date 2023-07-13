import mysql from "mysql"
import { alertMail } from "./mails.js"
import Stripe from 'stripe'
import jwt from 'jsonwebtoken';

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

export const addCar = (req, res) => {
	const query = 'SELECT * FROM products WHERE name = ?';
	const queryReserve = 'UPDATE products SET minStock = ? WHERE id = ?';
	let nameProduct = req;
	let productObj = {};
	
	db.query(query, nameProduct)
	.then(result => {
	  if (result.length > 0){
		  productObj = {
			id      : result[0].id,
			name    : result[0].name,
			amount  : result[0].amount,
			price   : result[0].price,
			minStock: result[0].amount - 1
		  }
		  db.query(queryReserve, [productObj.amount, productObj.id])
		  .then(() => {console.log('Producto reservado')})
		  .catch(() => {console.error('Error en la reserva del producto, problemas de acceso')})
		}
		purchaseList.push(productObj);
	}).catch( error => {
	  throw error;
	}
	)
  }


  

const checkInventory = (stock, req, res) => {
//   const minStock = db.query('SELECT minStock FROM products WHERE id = ?', )
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