import express from "express";
import mysql from "mysql";
import path from "path";

const app = express();
const PORT = 9000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "contra#1234",
  database: "theStore",
});

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
