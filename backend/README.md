# Backend (Node.js + Express)

Esta carpeta contiene el servidor que expone una API REST para gestionar la colección de figuras.

Contenido:
- `index.js`: Punto de entrada del servidor. Conecta a MongoDB y monta las rutas bajo `/api/figures`.
- `models/Figure.js`: Modelo Mongoose que representa una figura en la colección.
- `controllers/figuresController.js`: Lógica para listar/crear figuras y ejemplo de integración con la Jikan API.
- `routes/figures.js`: Define las rutas REST.
- `.env.example`: Ejemplo de variables de entorno.

Cómo arrancar (básico):

1. Instalar dependencias: `npm install`
2. Copiar `.env.example` → `.env` y ajustar `MONGO_URI`.
3. Ejecutar en modo desarrollo: `npm run dev`

Notas para el profesor:
- El controlador incluye `fetchFromJikan` como ejemplo de cómo consumir una API pública (Jikan API).
