import '../Styles/stock.css'

function Stock(productsArray) {
  let products = productsArray.productsArray;
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
          <td><input type="text" disabled value={product.id}/></td>
          <td><input type="text" disabled value={product.name}/></td>
          <td><input type="number" min={0} value={product.price} /></td>
          <td><input type="number" min={0} value={product.amount} /></td>
          <td><input type="number" min={0} value={product.minStock} /></td>
          <td><button>Editar</button></td>
        </tr>
      ))}
    </tbody>
  </table>
)}

export default Stock;