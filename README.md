el precio de cada figura
el stock disponible
el anime y personaje asociado

# 📦 Colección Anime — Proyecto Fullstack (MEAN + Angular + React)

Proyecto Full-Stack completo para la gestión de figuras de anime, usando arquitectura MEAN y dos clientes frontend (Angular y React) que consumen la misma API REST.

## 📊 Estado del Proyecto
🟢 Backend (100%) | 🟢 Angular (100%) | 🟢 React (100%) | 🟢 Docs (100%)
✅ PROYECTO COMPLETADO AL 100%

🎉 Angular completado: Ver frontend-angular/ANGULAR_COMPLETADO.md
🎉 React completado: Ver frontend-react/REACT_COMPLETADO.md

---

## ✨ Características Destacadas
- 🎯 CRUD Completo en ambos frontends (Angular y React)
- 📊 Paginación y filtros avanzados (por anime, búsqueda)
- ✅ Validaciones en tiempo real en formularios
- 🎨 Bootstrap 5 para UI moderna y responsive
- 📱 Diseño Responsive (mobile, tablet, desktop)
- 🔄 Loading States y mensajes de éxito/error
- 🛡️ Reglas de Negocio implementadas en el backend
- 📚 Base de Datos poblada con 20+ figuras de ejemplo
- 📖 Documentación completa para cada componente
- 🌐 Desplegado en Vercel (Backend + Ambos Frontends)

---

## 📋 Descripción del Proyecto
**Nombre:** Colección Anime — Sistema de Gestión de Figuras

**Problema a Resolver:**
Permitir a coleccionistas gestionar su catálogo de figuras de anime: registro, consulta, edición, eliminación, filtrado por anime, búsqueda, control de stock y precios.

**Descripción Funcional:**
Sistema full-stack que permite:
- Consultar catálogo completo de figuras con paginación
- Crear, editar y eliminar figuras
- Filtrar por anime
- Buscar por nombre/personaje
- Control de stock y disponibilidad
- Visualizar detalles completos de cada figura
- Gestión de precios e inventario
- Consultar información externa de animes (API Jikan)

---

## 🗄️ Modelo de Datos
Entidad: **Figura**

| Campo      | Tipo      | Descripción                  |
|------------|-----------|------------------------------|
| _id        | ObjectId  | Identificador único          |
| nombre     | String    | Nombre de la figura          |
| anime      | String    | Anime asociado               |
| personaje  | String    | Personaje representado       |
| precio     | Number    | Precio en euros              |
| stock      | Number    | Unidades disponibles         |
| imagen     | String    | URL de la imagen             |
| malId      | Number    | ID de MyAnimeList (opcional) |
| createdAt  | Date      | Fecha de creación            |
| updatedAt  | Date      | Fecha de actualización       |

---

## 🧠 Reglas de Negocio
1. El nombre y anime de la figura son obligatorios
2. El precio y stock no pueden ser negativos
3. El stock 0 marca la figura como no disponible
4. Integridad de datos validada en backend y frontend

---

## 📡 Endpoints de la API
| Método | Endpoint                                 | Descripción                       |
|--------|------------------------------------------|-----------------------------------|
| GET    | /api/v1/figuras/get/all                  | Obtener todas las figuras         |
| GET    | /api/v1/figuras/get/:id                  | Obtener una figura                |
| POST   | /api/v1/figuras/post                     | Crear figura                      |
| PATCH  | /api/v1/figuras/update/:id               | Actualizar figura                 |
| DELETE | /api/v1/figuras/delete/:id               | Eliminar figura                   |
| GET    | /api/v1/figuras/jikan/buscar?nombre=X    | Buscar anime (API Jikan)          |

---

## 🏗️ Arquitectura y Estructura del Proyecto

coleccion-anime/
│
├── backend/
│   ├── src/
│   │   ├── config/          # Configuración de la conexión a MongoDB
│   │   ├── models/          # Modelos de datos con Mongoose
│   │   ├── controllers/     # Lógica de negocio de la API
│   │   ├── routes/          # Definición de endpoints de la API
│   │   └── middlewares/     # Middlewares de Express
│   │
│   ├── server.js            # Punto de entrada del servidor Express
│   └── package.json         # Dependencias y scripts del backend
│
├── frontend-angular/
│   ├── src/
│   │   └── app/
│   │       ├── components/  # Componentes de Angular
│   │       ├── services/    # Servicios HTTP para consumir la API
│   │       └── app.module.ts
│   │
│   └── package.json         # Dependencias y scripts del frontend Angular
│
├── frontend-react/
│   ├── src/                 # Aplicación React que también consume la API
│   └── package.json
│
└── README.md                # Documentación del proyecto

---

## 🚀 Instalación y Ejecución

### Backend
```bash
cd backend
npm install
npm run seed    # Poblar base de datos
npm start       # http://localhost:3000
```

### Frontend Angular
```bash
cd frontend-angular
npm install
npm start       # http://localhost:4200
```

### Frontend React
```bash
cd frontend-react
npm install
npm run dev     # http://localhost:3001
```

---

# 🌐 Cuadrícula de URLs de Acceso y Puertos

| Componente        | URL local                        | Puerto | Producción (Vercel)                                   |
|-------------------|----------------------------------|--------|-------------------------------------------------------|
| Backend API       | http://localhost:5000            | 5000   | https://coleccion-anime.vercel.app/api/v1              |
| Frontend Angular  | http://localhost:4200            | 4200   | https://coleccion-anime-angular.vercel.app/figuras     |
| Frontend React    | http://localhost:5137            | 5137   | https://coleccion-anime-react.vercel.app/figuras       |

---

## ℹ️ Explicación de los Puertos

- **Backend (5000):**
  - El backend usa el puerto 5000 por convención y para evitar conflictos con otros servicios comunes (como 3000, que suele usar React o Node en otros proyectos).
  - Puedes cambiarlo en `server.js` con la variable de entorno `PORT`.

- **Angular (4200):**
  - Angular CLI por defecto usa el puerto 4200 (`ng serve`). Es el estándar para desarrollo Angular.

- **React (5137):**
  - Vite (el bundler usado en este proyecto) asigna puertos automáticamente si el 3000 está ocupado. En este caso, el puerto por defecto fue 5137, pero puedes forzarlo con `vite --port 5137` o cambiarlo en la configuración si lo deseas.
  - Si quieres usar otro puerto, puedes ejecutar: `npm run dev -- --port 3001`.

---

## 🔗 Notas sobre URLs de Producción

- Las URLs de Vercel pueden variar según el nombre del proyecto y el subdominio asignado.
- Los endpoints de producción para Angular y React terminan en `/figuras` para acceder directamente al catálogo.
- El backend en Vercel expone la API REST bajo `/api/v1`.

---

## 📚 Tecnologías Utilizadas
- Node.js, Express, MongoDB, Mongoose, CORS
- Angular 17, Bootstrap 5, Bootstrap Icons
- React 18, React Router DOM, Bootstrap 5
- API externa: Jikan (MyAnimeList)

---

## 📸 Capturas Recomendadas
1. Home (Angular y React)
2. Catálogo (cards y tabla)
3. Filtros activos
4. Detalle de figura
5. Formulario crear/editar
6. Mensajes y spinners
7. Responsive

---

## 🐛 Problemas Comunes
- Backend no iniciado → `npm start` en backend
- MongoDB no activo
- CORS en backend
- Puerto ocupado → `ng serve --port 4300` o `npm run dev -- --port 5200`

---

## 👨‍💻 Autor
Luis — Proyecto Final Integrador MEAN + Angular + React

---

## 📄 Licencia
ISC — Proyecto académico
