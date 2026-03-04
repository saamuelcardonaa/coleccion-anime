// ATENCIÓN: apiUrl debe ser la URL pública del backend, NO la del frontend.
// Ejemplo: "https://mi-backend-production.vercel.app" o la URL de tu API REST desplegada.
// Si usas Vercel y quieres soporte para variables de entorno en tiempo de ejecución,
// puedes usar window.__env.apiUrl (debes inyectar este objeto en index.html antes de cargar Angular).
// Ejemplo de uso dinámico:
// apiUrl: (window as any).__env?.apiUrl || "https://mi-backend-production.vercel.app"

export const environment = {
  production: true,
  // apiUrl debe ser la URL base del backend (sin barra final).
  // Si usas Vercel y quieres soporte para variables de entorno en tiempo de ejecución,
  // puedes definir window.__env.apiUrl en index.html antes de cargar Angular.
  // Si no existe, se usará la URL por defecto del backend desplegado.
  apiUrl: (window as any)?.__env?.apiUrl || "https://coleccion-anime.vercel.app/api/v1"
};
