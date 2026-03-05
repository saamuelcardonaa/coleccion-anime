import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FigurasList from './pages/FigurasList';
import FiguraDetail from './pages/FiguraDetail';
import FiguraForm from './pages/FiguraForm';

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<FigurasList />} />
        <Route path="/nueva" element={<FiguraForm />} />
        <Route path=":id" element={<FiguraDetail />} />
        <Route path=":id/editar" element={<FiguraForm />} />
      </Routes>
    </BrowserRouter>
  );
}