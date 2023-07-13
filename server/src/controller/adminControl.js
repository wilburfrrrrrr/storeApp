import mysql from "mysql";

// const db = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "contraseña12345",
//   database: "theStore",
// });

const db = mysql.createConnection({
  host: "berfinp9tsh1k6yqu993-mysql.services.clever-cloud.com",
  user: "unspl4l656azvazq",
  password: "xIAGTQgUi7ZLBygCXJh",
  database: "berfinp9tsh1k6yqu993",
  port: "20379"
});

const getAdmin = () => {
  return new Promise((resolve, reject) => {
    // oficial query -> queryAboutAdmin = `SELECT * FROM administrators WHERE id = ${req.params.id}`;
    const query = `SELECT * FROM administrators WHERE id = ${1}`;
    db.query(query, (error, adminInfo) => {
      error ? reject(error) : resolve(adminInfo);
    });
  });
};

const getProducts = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM products", (error, stockInfo) => {
      error ? reject(error) : resolve(stockInfo);
    });
  });
};

export const administrator = async (req, res) => {
  try {
    const [admin, products] = await Promise.all([getAdmin(), getProducts()]);
    res.json({ admin: admin, products: products });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
