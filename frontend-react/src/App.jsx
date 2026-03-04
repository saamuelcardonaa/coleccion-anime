import React, { useEffect, useState } from 'react'
import axios from 'axios'
import FigureList from './components/FigureList'

// Componente principal del cliente React.
// Se encarga de consumir la API del backend y pasar los datos a los componentes.
export default function App() {
  const [figures, setFigures] = useState([])

  useEffect(() => {
    const fetchFigures = async () => {
      try {
        const res = await axios.get('/api/figures')
        setFigures(res.data)
      } catch (err) {
        console.error('Error fetching figures', err)
      }
    }
    fetchFigures()
  }, [])

  return (
    <div style={{ padding: 20 }}>
      <h1>Colección de Figuras</h1>
      <FigureList figures={figures} />
    </div>
  )
}
