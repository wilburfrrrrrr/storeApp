import express from "express";
import mysql from "mysql";
import path from "path";
import bodyParser from "body-parser";
import cors from 'cors'

const app = express();
const PORT = 9000;

app.use(bodyParser.json())
app.use(cors())

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contra#1234",
  database: "theStore",
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../index.html"));
});

app.post('/register', (req, res) => {
  const requesData = req.body
  console.log(requesData);
  res.json({message: 'Peticion POST recibida para Andres'})
})


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

