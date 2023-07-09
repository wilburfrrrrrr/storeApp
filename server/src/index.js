import express from "express";
import mysql from "mysql";
import path, { dirname } from "path";
import bodyParser from "body-parser";
import cors from 'cors'
import { error } from "console";

import indexRoutes from "./routes/index.js"

const app = express();
const PORT = 9000;

app.use(bodyParser.json())
app.use(cors())
app.use(indexRoutes)

/*
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contraseña12345",
  database: "theStore",
});


app.get("/", (req, res) => {
  res.sendFile(path.resolve("../index.html"));
});

app.post('/login', (req, res) => {
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
        res.json({ message: 'Credenciales válidas', validation: true, rol:'user' });
      } else {
        // Si no se encuentran resultados en la primera consulta, hacer otra consulta en otra tabla
    
        db.query(query2, values, (err2, results2) => {
          if (err2) {
            console.error('Error al ejecutar la segunda consulta', err2);
            res.status(500).json({ error: 'Error al verificar las credenciales' });
          } else {
            if (results2.length > 0) {
              res.json({ message: 'Credenciales válidas para administrador', validation: true, rol:'admin' });
            } else {
              res.status(401).json({ error: 'Credenciales inválidas' });
            }
          }
        });
      }
    }
  });
});


app.post('/register', (req, res) => {
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
      res.json({ message: 'Registro insertado exitosamente',  validation: true});
    }
  });
})
*/


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

