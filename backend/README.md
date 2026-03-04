# Backend (Node.js + Express)

Esta carpeta contiene el servidor que expone una API REST para gestionar la colección de figuras de anime.

## Estructura de archivos

### En la raíz de `backend/`
- `server.js`: Punto de entrada principal del backend. Carga variables de entorno, conecta a MongoDB y arranca Express.
- `index.js`: Archivo de compatibilidad que delega a `server.js` (para herramientas heredadas).
- `.env.example`: Plantilla de variables de entorno.

### Carpeta `src/`
- `src/app.js`: Configura la aplicación Express (middlewares y rutas) sin arrancarla.

### `src/config/`
- `src/config/db.js`: Helper para conectar a MongoDB usando Mongoose.

### `src/models/`
- `src/models/Figure.js`: Modelo antiguo (compatible).
- `src/models/Figura.js`: **Modelo nuevo** que representa una figura de anime con validaciones (nombre, anime, personaje, precio, stock, imagen).

### `src/controllers/`
- `src/controllers/figuresController.js`: Controlador antiguo (compatible).
- `src/controllers/figuraController.js`: **Controlador nuevo** con 5 operaciones CRUD completas:
  - `obtenerFiguras()`: GET /figuras - lista todas
  - `obtenerFiguraPorId()`: GET /figuras/:id - obtiene una
  - `crearFigura()`: POST /figuras - crea nueva
  - `actualizarFigura()`: PUT /figuras/:id - actualiza
  - `eliminarFigura()`: DELETE /figuras/:id - elimina

### `src/routes/`
- `src/routes/figures.js`: Rutas antiguas (compatible).
- `src/routes/figuraRoutes.js`: **Rutas nuevas** con estructura mejorada, comentadas para un profesor:
  - GET /figuras
  - GET /figuras/:id
  - POST /figuras
  - PUT /figuras/:id
  - DELETE /figuras/:id

### `src/middlewares/`
- `src/middlewares/index.js`: Placeholder con ejemplo de middleware de logging.

### Documentación
- `EJEMPLOS_API.md`: **Nuevo archivo** con ejemplos cURL de cada endpoint para probar la API.

## Cómo arrancar

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Crear archivo `.env` (copiar desde `.env.example`):
   ```bash
   cp .env.example .env
   ```

3. Editar `.env` si es necesario (ajustar `MONGO_URI` y `PORT`).

4. Ejecutar en modo desarrollo (con auto-reload):
   ```bash
   npm run dev
   ```

5. El servidor estará disponible en `http://localhost:5000` (o el puerto configurado).

## Probar los endpoints

Ver `EJEMPLOS_API.md` para ejemplos de cURL y Postman.

## Notas para el profesor

- **Modelos & Controladores & Rutas:** La estructura separa responsabilidades:
  - **Modelo**: Define qué datos se guardan en MongoDB
  - **Controlador**: Contiene la lógica CRUD y manejo de errores
  - **Rutas**: Conectan URLs HTTP con funciones del controlador
  
- **Comentarios en el código:** Cada archivo tiene comentarios explicativos para entender la arquitectura.

- **Validaciones:** El modelo Figura valida que campos sean requeridos, que precios/stock sean positivos, etc.

- **Ejemplo Jikan API:** El controlador antiguo incluye `fetchFromJikan` como ejemplo de consumir APIs públicas.
