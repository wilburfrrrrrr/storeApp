import express from "express";
import mysql from "mysql";
import path from "path";
import bodyParser from "body-parser";
import cors from 'cors'
import { error } from "console";

const app = express();
const PORT = 9000;

app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contraseña12345",
  database: "theStore",
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../index.html"));
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
      res.json({ message: 'Registro insertado exitosamente' });
    }
  });
})



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

