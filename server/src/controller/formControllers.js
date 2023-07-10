import mysql from "mysql"

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "theStore",
  });

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
          res.json({ message: 'Credenciales válidas', validation: true, rol:'user', id: results[0].id  });
        } else {
          // Si no se encuentran resultados en la primera consulta, hacer otra consulta en otra tabla
      
          db.query(query2, values, (err2, results2) => {
            if (err2) {
              console.error('Error al ejecutar la segunda consulta', err2);
              res.status(500).json({ error: 'Error al verificar las credenciales' });
            } else {
              if (results2.length > 0) {
                res.json({ message: 'Credenciales válidas para administrador', validation: true, rol:'admin', id: results2[0].id});
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
        res.json({ message: 'Registro insertado exitosamente',  validation: true});
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
      res.status(500).json({error: 'Error al actualizar el registro'});
    } else {
      res.json({message: 'Registro actualizado exitosamente'})
    }
  })
}

export const deletee = (req, res) => {
  const id = req.params.id;
  
  const query = 'DELETE FROM products WHERE id = ?';
  const values = [id]

  db.query(query,values, (err, results) => {
    if (err) {
      console.error('Error al eliminar el registro', err);
      res.status(500).json({error: 'Error al eliminar el registro'});
    } else {
      res.json({message: 'Registro eliminado exitosamente'})
    }
  })
}
