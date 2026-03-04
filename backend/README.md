# Backend (Node.js + Express)

API REST para gestionar figuras de anime. Estructura orientada a producción y
listo para desplegar en Vercel.

## 🗂️ Estructura final del proyecto

```
backend/
├── api/                        # Punto de entrada para Vercel
│   └── index.js                # exporta app + conecta DB (no listen)
├── src/
│   ├── app.js                  # configura express, cors, middlewares, rutas
│   ├── config/
│   │   └── db.js               # conecta a MongoDB (reutilizable, evita reconexiones)
│   ├── models/
│   │   └── Figura.js           # único modelo con validaciones y timestamps
│   ├── controllers/
│   │   └── figurasController.js# CRUD + Jikan API desde un solo lugar
│   ├── routes/
│   │   └── figuras.js          # rutas versionadas (/api/v1/figuras/...)
│   └── middlewares/
│       └── index.js            # logger simple (requestLogger)
├── server.js                   # arranque local con listen (usa app + db)
├── index.js                    # compatibilidad, importa server.js
├── vercel.json                 # configuración para despliegue en Vercel
├── .env.example                # variables de entorno de ejemplo
├── package.json                # conjunto de dependencias y scripts
└── README.md                   # este documento
```

⚠️ **Sólo existe un modelo** (`src/models/Figura.js`), un router
(`src/routes/figuras.js`) y un controlador (`src/controllers/figurasController.js`).
Las versiones duplicadas en inglés o con nombres distintos deben eliminarse
(desde `ARCHIVOS A BORRAR` más abajo).

## 🔧 Instalación y ejecución local

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Crear `.env` a partir del ejemplo:
   ```bash
   cp .env.example .env
   ```
   Ajustar `MONGODB_URI` si tu base de datos no está en localhost.

3. Iniciar en modo desarrollo (observa cambios automáticamente):
   ```bash
   npm run dev
   ```

4. La API quedará escuchando en `http://localhost:5000` (o el puerto
   especificado en `.env`).

## 📡 Endpoints disponibles

Todas las rutas están montadas bajo `/api/v1/figuras`.

| Método | Ruta               | Descripción                          |
|--------|--------------------|--------------------------------------|
| GET    | /get/all           | Obtener todas las figuras            |
| GET    | /get/:id           | Obtener una figura por su _id        |
| POST   | /post              | Crear nueva figura                   |
| PATCH  | /update/:id        | Actualizar una figura existente      |
| DELETE | /delete/:id        | Eliminar una figura                  |
| GET    | /jikan/:malId      | Información de anime vía Jikan API   |

Ejemplos con `curl` están en el archivo `EJEMPLOS_API.md`.

## ☁️ Despliegue en Vercel

- `backend/vercel.json` enruta todas las peticiones a `api/index.js`.
- `api/index.js` conecta la DB y exporta `app` sin llamar a `listen()`.
- Variables de entorno: configurar `MONGODB_URI` y opcionalmente `PORT`.

## 🧹 ARCHIVOS A BORRAR (manualmente)

- `src/controllers/figuraController.js`
- `src/controllers/figuresController.js`
- `src/models/Figure.js`
- `src/routes/figuraRoutes.js`
- `src/routes/figures.js`

> Después de eliminar estos archivos el backend sólo tendrá la versión
> en español y alineada con la nueva arquitectura.

## 📚 Notas para el profesor

- **Arquitectura limpia**: separación clara entre rutas, controladores y modelos.
- **Comentarios abundantes** en cada módulo, explicando cada paso.
- **Validaciones** implementadas en el esquema y manejadas en los
  controladores.
- **Ejemplo de integración externa**: `obtenerAnimeJikanPorMalId` utiliza
  Jikan API y devuelve un JSON simplificado (title, synopsis, imageUrl,
  score, episodes).
- **Buenas prácticas**: uso de ES modules (`type: module`), control de
  reconexión a MongoDB, rutas versionadas, constantes de entorno.

¡Listo para presentar o desplegar! 🧪🎓

