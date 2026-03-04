📦 Colección Anime — Proyecto Fullstack (MEAN + Angular + React)
📖 Descripción del proyecto

Colección Anime es una aplicación full-stack desarrollada como proyecto integrador utilizando una arquitectura tipo MEAN (MongoDB, Express, Angular, Node) y un cliente adicional en React.

El sistema permite gestionar una colección de figuras de anime mediante una API REST que ofrece operaciones CRUD completas (crear, consultar, actualizar y eliminar).

La aplicación se compone de:

Backend → Node.js + Express + MongoDB

Frontend Angular → Cliente principal

Frontend React → Cliente alternativo que consume la misma API

Además, el backend integra una API externa (Jikan / MyAnimeList) para obtener información sobre animes.

🎯 Problema que resuelve

Muchos coleccionistas de figuras necesitan organizar su colección y mantener control sobre:

qué figuras poseen

el precio de cada figura

el stock disponible

el anime y personaje asociado

Este sistema permite:

registrar nuevas figuras

consultar el catálogo completo

editar información

eliminar figuras

consultar información externa de animes mediante API pública

🏗 Arquitectura del proyecto

El proyecto sigue una arquitectura modular separando backend y frontend.

coleccion-anime/
│
├── backend/
│   ├── src/
│   │   ├── config/        # conexión MongoDB
│   │   ├── models/        # modelos Mongoose
│   │   ├── controllers/   # lógica de negocio
│   │   ├── routes/        # endpoints API
│   │   └── middlewares/   # middlewares Express
│   │
│   ├── server.js          # punto de entrada del servidor
│   └── package.json
│
├── frontend-angular/
│   ├── src/app/
│   │   ├── components/    # componentes Angular
│   │   ├── services/      # servicios HTTP
│   │   └── app.module.ts
│   │
│   └── package.json
│
├── frontend-react/
│   └── src/
│
└── README.md
🗄 Modelo de datos

Entidad principal del sistema:

Figura

Campos principales:

Campo	Tipo
_id	ObjectId
nombre	String
anime	String
personaje	String
precio	Number
stock	Number
imagen	String
malId	Number
createdAt	Date
updatedAt	Date

La base de datos está poblada con mínimo 20 registros para pruebas del sistema.

⚙ Backend (Node + Express + MongoDB)

La API está desarrollada utilizando:

Node.js

Express

MongoDB Atlas

Mongoose

CORS

Incluye:

✔ Validaciones de datos
✔ Manejo de errores
✔ Status codes HTTP correctos
✔ Integración con API externa (Jikan)

📡 Endpoints de la API
Método	Endpoint	Descripción
GET	/api/v1/figuras/get/all	Obtener todas las figuras
GET	/api/v1/figuras/get/:id	Obtener una figura
POST	/api/v1/figuras/post	Crear figura
PATCH	/api/v1/figuras/update/:id	Actualizar figura
DELETE	/api/v1/figuras/delete/:id	Eliminar figura
GET	/api/v1/figuras/jikan/buscar?nombre=X	Buscar anime (API Jikan)
🧠 Reglas de negocio

El sistema implementa algunas validaciones básicas:

1️⃣ El nombre de la figura es obligatorio
2️⃣ El anime es obligatorio
3️⃣ El precio no puede ser negativo
4️⃣ El stock no puede ser negativo

Estas reglas se validan tanto en el modelo Mongoose como en el controlador.

🎨 Frontend Angular

El frontend principal está desarrollado en Angular y consume completamente la API REST.

Características implementadas:

✔ Consumo de API mediante servicios HTTP
✔ Componentes organizados por funcionalidad
✔ Formularios reactivos
✔ Validación de campos
✔ Operaciones CRUD completas
✔ Uso de Bootstrap para la interfaz

⚛ Frontend React

Se incluye un segundo cliente desarrollado con React que consume la misma API.

Este cliente sirve como ejemplo de:

✔ uso de hooks
✔ consumo de API mediante fetch
✔ componentes funcionales

🌐 Deploy del proyecto

Backend desplegado en:

https://coleccion-anime.vercel.app

Ejemplo de endpoint:

https://coleccion-anime.vercel.app/api/v1/figuras/get/all
🚀 Ejecución local
Backend
cd backend
npm install
npm run dev

Servidor disponible en:

http://localhost:5000
Frontend Angular
cd frontend-angular
npm install
npm start

Aplicación disponible en:

http://localhost:4200
Frontend React
cd frontend-react
npm install
npm run dev
⚠ Estado actual del proyecto

Este repositorio forma parte de un proyecto académico en desarrollo.

Actualmente se encuentran completamente funcionales:

✔ Backend Node.js + Express
✔ Base de datos MongoDB
✔ API REST con CRUD
✔ Integración con API externa (Jikan)
✔ Frontend React funcional

El frontend Angular aún se encuentra en fase de desarrollo, por lo que algunas funcionalidades pueden no estar completamente terminadas.

El objetivo del proyecto es completar todas las fases requeridas por la asignatura.

📚 Tecnologías utilizadas

Backend

Node.js

Express

MongoDB

Mongoose

CORS

Frontend

Angular

React

Bootstrap

API externa

Jikan API (MyAnimeList)

👨‍💻 Autor

Proyecto desarrollado como Proyecto Final Integrador para la asignatura de desarrollo web.

🙏 Agradecimientos

Gracias a los recursos de documentación oficiales:

Angular

React

Express

MongoDB

Bootstrap

Jikan API