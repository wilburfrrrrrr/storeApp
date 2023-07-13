import mysql from "mysql"
import { alertMail } from "./mails.js"
import Stripe from 'stripe'
import jwt from 'jsonwebtoken';


const secretWord = "mami"


const db = mysql.createConnection({
  host: "berfinp9tsh1k6yqu993-mysql.services.clever-cloud.com",
  user: "unspl4l656azvazq",
  password: "xIAGTQgUi7ZLBygCXJh",
  database: "berfinp9tsh1k6yqu993",
  port: "20379"
});



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
