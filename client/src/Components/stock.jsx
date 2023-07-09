import React, { useState } from 'react';
import  Data from '../data.json';

function Stock() {
  console.log(Data); // Verificar el valor de Data en la consola

  const [data, setData] = useState(Data);
  return (
    <table>
      <thead>
        <th>Id</th>
        <th>NombreProducto</th>
        <th>Cantidad</th>
        <th>precio</th>
        <th>minStock</th>
      </thead>
      <tbody>
      {
      data.products.map((current) => (
      <tr>
        <td>{current.name}</td>
        <td>{current.description}</td>
        <td>{current.amount}</td>
        <td>{current.price}</td>
        <td>{current.minStock}</td>
         <td>
        <button>Edit</button>
        <button>Delete</button>
        </td>
      </tr>
      ))}
    </tbody>
  </table>
)}

export default Stock;