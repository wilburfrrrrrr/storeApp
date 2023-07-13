import React, { useState } from 'react';
import '../Styles/stock.css';

function Stock(productsArray) {
  const [products, setProducts] = useState(productsArray.productsArray);

  const handleInputChange = (e, productId, field) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    setProducts(updatedProducts);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>NombreProducto</th>
          <th>Precio</th>
          <th>Cantidad</th>
          <th>MínimoStock</th>
          <th>Accion</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id}>
            <td>
              <input type="text" disabled value={product.id} />
            </td>
            <td>
              <input type="text" disabled value={product.name} />
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={product.price}
                onChange={(e) =>
                  handleInputChange(e, product.id, 'price')
                }
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={product.amount}
                onChange={(e) =>
                  handleInputChange(e, product.id, 'amount')
                }
              />
            </td>
            <td>
              <input
                type="number"
                min={0}
                value={product.minStock}
                onChange={(e) =>
                  handleInputChange(e, product.id, 'minStock')
                }
              />
            </td>
            <td>
              <button>Editar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Stock;