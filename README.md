# Colección Anime — Proyecto Fullstack

Este repositorio contiene la estructura inicial para una aplicación fullstack para gestionar una colección de figuras de anime.

Estructura principal del proyecto (carpetas):

- `backend`: Código del servidor (Node.js + Express) que expone una API REST y se conecta a MongoDB usando Mongoose. Aquí se almacenan los datos de las figuras de la colección y se implementa la lógica para consumir la Jikan API (API pública de datos de anime).
- `frontend-angular`: Espacio para la versión cliente realizada en Angular. Actualmente contiene instrucciones y una plantilla inicial para que un profesor o alumno entienda dónde ubicar la app Angular.
- `frontend-react`: Versión cliente en React (creada como ejemplo minimal) que consume la API del `backend` y muestra la colección.

Comentarios para el profesor:
- Cada carpeta incluye un `README.md` con una explicación sobre su propósito y cómo arrancarla.
- El `backend` incluye rutas para gestionar figuras (`/api/figures`) y un ejemplo de integración con la Jikan API para obtener datos públicos de anime.
- `frontend-react` contiene un cliente React mínimo que consume la API del backend.

Siguientes pasos sugeridos:

1. Entrar a `backend` e instalar dependencias: `npm install`.
2. Configurar `backend/.env` con la cadena de conexión `MONGO_URI`.
3. Ejecutar `backend` con `npm run dev`.
4. Entrar a `frontend-react`, instalar dependencias y ejecutar el cliente.
