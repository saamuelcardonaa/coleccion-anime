import React from 'react'

// Componente para listar figuras en una tabla simple
export default function FigureList({ figures = [] }) {
  if (!figures.length) return <p>No hay figuras en la colección.</p>

  return (
    <table border="1" cellPadding="8">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Serie</th>
          <th>Fabricante</th>
          <th>Año</th>
        </tr>
      </thead>
      <tbody>
        {figures.map(f => (
          <tr key={f._id}>
            <td>{f.name}</td>
            <td>{f.series}</td>
            <td>{f.manufacturer}</td>
            <td>{f.releaseYear}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
