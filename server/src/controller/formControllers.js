import mysql from "mysql"
import { alertMail } from "./mails.js"
import Stripe from 'stripe'
import jwt from 'jsonwebtoken';

const purchaseList = new Array;
const stripeSecret = "sk_test_51NS4P4KVzQlPajzBoWrdb25nCwhexkdZe8E1qvNIDGOaEEEvqxzzomsGg8pcGwkazZRrMyhcvWLbhiMpPl5pgHhd00S8mgl93p"

const stripe = new Stripe(stripeSecret)

const secretWord = "mami"


const db = mysql.createConnection({
  host: "berfinp9tsh1k6yqu993-mysql.services.clever-cloud.com",
  user: "unspl4l656azvazq",
  password: "xIAGTQgUi7ZLBygCXJh",
  database: "berfinp9tsh1k6yqu993",
  port: "20379"
});


export const createSession = async (req, res) => {
  const data = req.body;
  // console.log(data);
  const line_items = data.line_items;
  // console.log(items);
  // const prueba = {
  //   items,
  //   mode: 'payment',
  //   success_url: 'http://localhost:9000/success',
  //   cancel_url: 'http://localhost:9000/cancel',
  // }
  // console.log(prueba);
  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    success_url: 'http://localhost:9000/success',
    cancel_url: 'http://localhost:9000/cancel',
  })
  res.json({result:session})
}

// export const createSession = async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     line_items: [
//       {
//         price_data: {
//           product_data: {
//             name: 'Carrito de productos',
//             description: 'Cobro por productos en el carrito',
//           },
//           currency: 'usd',
//           unit_amount: 20000, //200.00
//         },
//         quantity: 1
//       }
//     ],
//     mode: 'payment',
//     success_url: 'http://localhost:9000/success',
//     cancel_url: 'http://localhost:9000/cancel',
//   })
//   return res.json({result:session})
// }

function generateAccessToken(user) {
  return jwt.sign(user, secretWord, { expiresIn: '100m' })
}

export const login = (req, res) => {
  const requestData = req.body;
  const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
  const query2 = 'SELECT * FROM administrators WHERE name = ? AND password = ?';
  const values = [requestData.name, requestData.password];
  console.log(requestData);

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la consulta', err);
      res.status(500).json({ error: 'Error al verificar las credenciales' });
    } else {
      if (results.length > 0) {
        const user = { username: requestData.name }

        const accesToken = generateAccessToken(user);

        //res.header('authorization', accesToken).json({
        //message: 'Usuario autenticado',
        //token: accesToken
        //})

        // Almacena el token en el localStorage

        res.json({ message: 'Credenciales válidas', validation: true, rol: 'user', id: results[0].id, accesToken });
      } else {
        // Si no se encuentran resultados en la primera consulta, hacer otra consulta en otra tabla

        db.query(query2, values, (err2, results2) => {
          if (err2) {
            console.error('Error al ejecutar la segunda consulta', err2);
            res.status(500).json({ error: 'Error al verificar las credenciales' });
          } else {
            if (results2.length > 0) {
              const admin = { username: requestData.name }

              const accesTokenAdmin = generateAccessToken(admin);

              res.json({ message: 'Credenciales válidas para administrador', validation: true, rol: 'admin', id: results2[0].id, accesTokenAdmin });
            } else {
              res.status(401).json({ error: 'Credenciales inválidas' });
            }
          }
        });
      }
    }
  });
}

export const sigin = (req, res) => {
  const requesData = req.body
  const query = 'INSERT INTO users (name, email, password) VALUES (?,?,?)';
  const values = [requesData.name, requesData.email, requesData.password];
  console.log(requesData);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al insertar el registro:', err);
      res.status(500).json({ error: 'Error al insertar el registro en la base de datos' });
    } else {
      console.log('Registro insertado exitosamente');
      res.json({ message: 'Registro insertado exitosamente', validation: true });
    }
  });
}

export const addCar = (nameProduct, req, res) => {
  const query = 'SELECT * FROM products WHERE name = ?';
  const queryReserve = 'UPDATE products SET minStock = ? WHERE id = ?';
  let productObj = {};

  db.query(query, nameProduct)
  .then(result => {
    if (result.length > 0){
        productObj = {
          id      : result[0].id,
          name    : result[0].name,
          amount  : result[0].amount,
          price   : result[0].price,
          minStock: result[0].minStock - 1
        }
        db.query(queryReserve, [productObj.minStock, productObj.id])
        .then(() => {console.log('Producto reservado')})
        .catch(() => {console.error('Error en la reserva del producto, problemas de acceso')})
      }
      purchaseList.push(productObj);
  }).catch( error => {
    throw error;
  }
  )
}

export const checkInventory = (stock, req, res) => {
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
  
export const update = (req, res, ) => {
  const id = req.params.id;
  const requestData = req.body;

  const query = 'UPDATE products SET name = ?, description = ?, amount = ?, price = ?, minStock = ? WHERE id = ?';
  const values = [requestData.name, requestData.description, requestData.amount, requestData.price, requestData.minStock, id]

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error al actualizar el registo', err);
      res.status(500).json({ error: 'Error al actualizar el registro' });
    } else {
      res.json({ message: 'Registro actualizado exitosamente' })
    }
  })
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

export const deletee = (req, res) => {
  const id = req.params.id;

  const query = 'DELETE FROM products WHERE id = ?';
  const values = [id]

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro', err);
      res.status(500).json({ error: 'Error al eliminar el registro' });
    } else {
      res.json({ message: 'Registro eliminado exitosamente' })
    }
  })
}
