// Punto de entrada de la aplicación React (Vite)
// Aquí se monta el árbol de componentes y se aplican los estilos globales

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// Importación de estilos Bootstrap y Bootstrap Icons (para toda la app)
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* BrowserRouter permite navegación SPA y uso de rutas en toda la app */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
