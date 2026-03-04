# Colección Anime — Proyecto Fullstack

Este repositorio contiene una aplicación fullstack completa para gestionar una colección de figuras de anime.

## 📁 Estructura principal del proyecto

- **`backend`**: Servidor Node.js + Express
  - API REST con operaciones CRUD para figuras
  - Conectado a MongoDB con Mongoose
  - Incluye ejemplo de integración con API pública (Jikan)
  - Modelos, controladores y rutas bien organizadas

- **`frontend-angular`**: Aplicación cliente con Angular ✨ NUEVA
  - Interfaz completa con Bootstrap 5
  - Servicio HTTP para consumir el backend
  - Componentes para listar, crear, editar y eliminar figuras
  - Validación de formularios reactivos
  - Código ampliamente comentado

- **`frontend-react`**: Cliente React minimal (referencia)
  - Componentes simples que consumen la API
  - Ejemplo de integración React-Backend

## 🚀 Inicio rápido

### Prerequisitos
- Node.js v16+ y npm
- MongoDB corriendo localmente o en la nube
- Angular CLI (para frontend-angular): `npm install -g @angular/cli`

### Paso 1: Backend (Express + MongoDB)

```bash
cd backend
npm install
cp .env.example .env
# Editar .env y configurar MONGO_URI si es necesario
npm run dev
```

El backend estará disponible en `http://localhost:5000`

### Paso 2: Frontend Angular

En otra terminal:

```bash
cd frontend-angular
npm install
npm start
```

La aplicación se abrirá en `http://localhost:4200`

### Paso 3 (Opcional): Frontend React

```bash
cd frontend-react
npm install
npm run dev
```

## 📚 Documentación

Cada carpeta incluye su propio `README.md`:
- [backend/README.md](backend/README.md) - Explicación de estructura backend
- [backend/EJEMPLOS_API.md](backend/EJEMPLOS_API.md) - Ejemplos de peticiones HTTP
- [frontend-angular/README.md](frontend-angular/README.md) - Guía completa Angular
- [frontend-react/README.md](frontend-react/README.md) - Guía React

## 🎯 Características principales

### Backend
✅ CRUD completo de figuras (GET, POST, PUT, DELETE)
✅ Validación de datos con Mongoose
✅ Integración con API externa (Jikan)
✅ Estructura modular (models, controllers, routes, services)
✅ Middleware de logging
✅ Manejo de errores

### Frontend Angular
✅ Listar todas las figuras en tabla
✅ Crear nuevas figuras con formulario validado
✅ Editar figuras existentes
✅ Eliminar figuras con confirmación
✅ Interfaz responsiva (Bootstrap 5)
✅ Servicio HTTP reutilizable
✅ Componentes documentados

## 🏗️ Arquitectura

```
coleccion-anime/
├── backend/
│   ├── src/
│   │   ├── models/        (Esquemas Mongoose)
│   │   ├── controllers/   (Lógica de negocio)
│   │   ├── routes/        (Rutas HTTP)
│   │   ├── config/        (Configuración BD)
│   │   └── middlewares/   (Middlewares personalizados)
│   ├── server.js          (Punto de entrada)
│   └── package.json
│
├── frontend-angular/
│   ├── src/
│   │   ├── app/
│   │   │   ├── components/
│   │   │   │   ├── figura-list/
│   │   │   │   └── figura-form/
│   │   │   ├── services/  (Figura service)
│   │   │   └── app.module.ts
│   │   ├── index.html
│   │   └── main.ts
│   └── package.json
│
└── frontend-react/
    └── src/...
```

## 📝 Notas para profesores y estudiantes

### Backend
- Cada archivo incluye comentarios explicativos
- Estructura MVC (Models-Controllers-Routes)
- Ejemplo de consumo de API externa (Jikan)
- Validaciones en modelo y controlador
- Códigos HTTP apropiados en respuestas

### Frontend Angular
- Componentes separados por responsabilidades
- Servicio HTTP centralizado
- Formularios reactivos con validación
- Directivas y data binding explicadas
- Bootstrap para ahorrar CSS personalizado
- 100% comentado para educación

## 🔧 Configuración

### Backend (.env)
```
MONGO_URI=mongodb://localhost:27017/coleccion-anime
PORT=5000
```

### Frontend Angular
Editar `src/app/services/figura.service.ts` si la API está en otro puerto

## 📖 Endpoints principales

| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | /figuras | Obtener todas las figuras |
| GET | /figuras/:id | Obtener una figura |
| POST | /figuras | Crear figura |
| PUT | /figuras/:id | Actualizar figura |
| DELETE | /figuras/:id | Eliminar figura |
| GET | /figuras/jikan/buscar?nombre=X | Buscar en Jikan API |

## 🐛 Troubleshooting

**Backend no conecta a MongoDB:**
- Verifica que MongoDB esté corriendo: `mongod`
- Comprueba MONGO_URI en .env

**Frontend Angular: Error CORS:**
- Asegúrate de que el backend está corriendo en puerto 5000
- Verifica en consola del navegador (F12) el error exacto

**Puerto 5000 en uso:**
- Cambia el puerto en backend/.env y en figura.service.ts

## 📚 Recursos

- [Angular Documentation](https://angular.io/docs)
- [Express Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Jikan API Documentation](https://jikan.moe/)

---

**Desarrollado con ❤️ para educación en desarrollo fullstack**
