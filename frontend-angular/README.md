# Frontend Angular (plantilla)

Esta carpeta está pensada para alojar una versión del cliente hecha con Angular.

Por ahora contiene solo instrucciones para generar el proyecto con Angular CLI. Un profesor podrá entender dónde ubicar la app y cómo integrarla con el backend.

Sugerencia para crear el proyecto Angular:

1. Instalar Angular CLI globalmente (si no está instalado): `npm install -g @angular/cli`
2. Crear el proyecto en esta carpeta: `cd frontend-angular && ng new coleccion-anime-angular`
3. Durante el desarrollo, configurar el proxy o las variables de entorno para apuntar al `backend` (por ejemplo, `http://localhost:5000/api`).

Estructura recomendada dentro de `frontend-angular`:
- `src/app/services`: servicios para consumir la API del backend y Jikan API.
- `src/app/components`: componentes como `figure-list`, `figure-detail`, `figure-form`.
