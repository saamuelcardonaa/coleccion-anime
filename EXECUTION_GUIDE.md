# 🚀 Guía de Ejecución - Proyecto Fullstack MEAN + React

## 📊 Resumen de Componentes Creados

### ✅ Componentes React (CRUD Completo)

```
frontend-react/
├── src/components/
│   ├── Navbar.jsx              ✅ Barra de navegación superior
│   ├── Navbar.css              ✅ Estilos del navbar
│   ├── FiguraList.jsx          ✅ Listado de figuras (tabla responsiva)
│   ├── FiguraList.css          ✅ Estilos de tabla y cards mobile
│   ├── FiguraForm.jsx          ✅ Formulario crear/editar con validaciones
│   ├── FiguraForm.css          ✅ Estilos del formulario
│   ├── FiguraEdit.jsx          ✅ Componente envoltorio para editar
│   └── figuraService.js        ✅ Servicio HTTP (5 métodos CRUD)
├── App.jsx                     ✅ Router principal (3 rutas)
├── App.css                     ✅ Estilos globales
└── main.jsx                    ✅ Punto de entrada
```

---

## 🎯 Funcionalidades Implementadas

### 📋 Listado (/)
- ✅ Carga todas las figuras del backend
- ✅ Tabla responsiva con imagen, nombre, anime, personaje, precio, stock
- ✅ Botones Editar y Eliminar en cada fila
- ✅ Mensajes de estado (cargando, error, vacío)
- ✅ Diseño responsive (cards en mobile)

### ➕ Crear (/crear)
- ✅ Formulario con 6 campos
- ✅ Validaciones en cliente: nombres requeridos, longitud mínima, números positivos
- ✅ Vista previa de imagen
- ✅ Mensajes de error individuales por campo
- ✅ Botones Crear y Cancelar

### ✏️ Editar (/editar/:id)
- ✅ Carga datos de la figura existente
- ✅ Formulario pre-rellenado
- ✅ Validaciones igual que en crear
- ✅ Botones Actualizar y Cancelar
- ✅ Manejo de errores si figura no existe

### 🗑️ Eliminar
- ✅ Botón en cada fila del listado
- ✅ Diálogo de confirmación
- ✅ Eliminación desde servidor
- ✅ Actualización automática de listado

---

## 🔧 Requisitos del Sistema

```bash
# Verificar Node.js y npm
node --version   # Debe ser v18+
npm --version    # Debe ser 9+
```

---

## ⚡ Guía de Ejecución

### Opción 1: Ejecución Completa (Recomendada)

Abre **dos terminales** separadas:

**Terminal 1 - Backend:**
```bash
cd coleccion-anime/backend
npm run dev
# Verás: "Servidor corriendo en puerto 5000 ✓"
```

**Terminal 2 - Frontend React:**
```bash
cd coleccion-anime/frontend-react
npm install          # (Ejecutar si no lo has hecho)
npm run dev
# Verás: "VITE v5.x.x  ready in xxx ms"
# La URLs será: http://localhost:5173
```

### Opción 2: Ejecución Secuencial

```bash
# Paso 1: Se asegura de tener dependencias
cd coleccion-anime/backend
npm install

cd ../frontend-react
npm install

# Paso 2: Ejecuta backend primero (espera confirmación)
cd ../backend
npm run dev

# Paso 3: En otra terminal, ejecuta React
cd coleccion-anime/frontend-react
npm run dev
```

---

## 🌐 Acceso a la Aplicación

### URLs

| Servicio | URL |
|----------|-----|
| **React Frontend** | http://localhost:5173 |
| **Backend API** | http://localhost:5000 |
| **Listado de Figuras** | http://localhost:5173/ |
| **Crear Figura** | http://localhost:5173/crear |
| **Editar Figura** | http://localhost:5173/editar/[ID] |

---

## 📝 Flujo de Uso Típico

### 1️⃣ **Crear una figura:**
```
1. Click en "➕ Nueva Figura" (Navbar)
2. Completa: Nombre, Anime, Personaje?, Precio?, Stock?, Imagen?
3. Click en "💾 Crear"
4. Automáticamente regresa a listado
5. Tu figura aparece en la tabla
```

### 2️⃣ **Ver todas las figuras:**
```
1. Click en "📋 Listado" (Navbar)
2. Se muestra tabla con todas las figuras
3. En cada fila: imagen, datos, y botones editar/eliminar
```

### 3️⃣ **Editar una figura:**
```
1. En listado, click en "✏️ Editar"
2. Formulario se rellena con datos actuales
3. Modifica los campos que necesites
4. Click en "💾 Actualizar"
5. Cambios reflejados en listado
```

### 4️⃣ **Eliminar una figura:**
```
1. En listado, click en "🗑️ Eliminar"
2. Confirmación: "¿Estás seguro de que deseas eliminar...?"
3. Click en "Aceptar"
4. Figura desaparece del listado
5. Se elimina del servidor
```

---

## 🏗️ Arquitectura General

```
┌─────────────────────────────────────────────────────┐
│           Frontend React (Vite + React Router)      │
│                                                      │
│                   Navbar                            │
│         ┌─────────┬────────────┬─────────┐          │
│         │          │            │         │          │
│    ┌────▼───┐  ┌───▼────┐  ┌───▼───┐   │          │
│    │ Lista  │  │ Crear  │  │Editar │   │          │
│    │        │  │        │  │       │   │          │
│    └────┬───┘  └───┬────┘  └───┬───┘   │          │
│         │          │            │       │          │
│         └──────────┴────────────┴───────┘          │
│                   ▼                                 │
│         figuraService.js (Axios)                   │
│    Métodos: obtener, crear, actualizar, eliminar   │
└──────────────────────┬──────────────────────────────┘
                       │ HTTP Requests
                       ▼
        ┌──────────────────────────────┐
        │   Backend Express API        │
        │  (Puerto 5000)               │
        │                              │
        │  GET    /figuras             │
        │  GET    /figuras/:id         │
        │  POST   /figuras             │
        │  PUT    /figuras/:id         │
        │  DELETE /figuras/:id         │
        └────────────┬─────────────────┘
                     │
                     ▼
        ┌──────────────────────────────┐
        │   MongoDB (Base de Datos)    │
        │   Colección: figuras         │
        │                              │
        │   Schema:                    │
        │   ├─ nombre                  │
        │   ├─ anime                   │
        │   ├─ personaje               │
        │   ├─ precio                  │
        │   ├─ stock                   │
        │   └─ imagen                  │
        └──────────────────────────────┘
```

---

## 🔄 Ciclo de Datos

### Crear Figura: Flujo Completo

```
Usuario llena formulario
        ↓
Valida en cliente (FiguraForm.jsx)
        ↓
Envía POST /figuras con axios
        ↓
Backend Express recibe y valida
        ↓
MongoDB guarda documento
        ↓
Server responde _id + datos
        ↓
React navega a listado
        ↓
cargarFiguras() obtiene lista actualizada
        ↓
Nueva figura aparece en tabla
```

### Editar Figura: Flujo Completo

```
Usuario hace click en Editar
        ↓
React obtiene ID de URL
        ↓
FiguraEdit carga datos con obtenerFiguraPorId()
        ↓
FiguraForm se rellena con datos
        ↓
Usuario modifica campos
        ↓
Submit: valida, envía PUT /figuras/:id
        ↓
Backend actualiza en MongoDB
        ↓
Navega a listado
        ↓
cargarFiguras() actualiza vista
```

---

## 📦 Dependencias Instaladas

```json
{
  "react": "^18.2.0",           // Framework UI
  "react-dom": "^18.2.0",       // Renderizado DOM
  "react-router-dom": "^7.13.1", // Navegación y ruteo
  "axios": "^1.13.6",           // HTTP client
  "vite": "^5.0.0"              // Build tool y dev server
}
```

**Externas (CDN):**
- Bootstrap 5.3 - CSS Framework
- Font Awesome 6.4 - Iconos (opcional)

---

## ✅ Checklist de Verificación

### Antes de iniciar:
- [ ] Node.js v18+ instalado
- [ ] MongoDB corriendo
- [ ] Backend dependencias instaladas (`npm install` en backend/)
- [ ] Frontend dependencias instaladas (`npm install` en frontend-react/)

### Al iniciar backend:
- [ ] Terminal muestra: "Servidor corriendo en puerto 5000 ✓"
- [ ] No hay errores de conexión MongoDB

### Al iniciar React:
- [ ] Vite muestra: "ready in XXX ms"
- [ ] URL disponible (generalmente localhost:5173)
- [ ] Browser abre automáticamente

### En navegador:
- [ ] Página carga sin errores consola
- [ ] Navbar visible con 3 links
- [ ] Listado muestra figuras (o mensaje vacío)
- [ ] Botón "Nueva Figura" clickeable
- [ ] Tabla responsiva

---

## 🐛 Problemas Comunes

### ❌ "Cannot GET /figuras"
**Causa:** Backend no está corriendo
**Solución:** Inicia backend con `npm run dev` en terminal 1

### ❌ "Connection refused 127.0.0.1:5000"
**Causa:** Backend no está en puerto 5000
**Solución:** Verifica puertos o reinicia backend

### ❌ "Module not found: react-router-dom"
**Causa:** Dependencias no instaladas
**Solución:** `npm install` en frontend-react/

### ❌ "Vite dev server failed to start"
**Causa:** Puerto 5173 ocupado
**Solución:** Vite usa siguiente puerto disponible automáticamente

### ❌ "Image fails to load"
**Causa:** URL inválida o CORS
**Solución:** Verifica URL imagen, debe ser HTTP completa

---

## 📚 Recursos Clave

**En el proyecto:**
- `frontend-react/REACT_GUIDE.md` - Guía detallada de componentes
- `backend/EJEMPLOS_API.md` - Ejemplos de peticiones HTTP
- Código comentado en todos los componentes

**Online:**
- [React Docs](https://react.dev)
- [React Router](https://reactrouter.com/)
- [Axios Docs](https://axios-http.com/)
- [Bootstrap 5](https://getbootstrap.com/)

---

## 🎓 Concepto Educativo

El proyecto demuestra:

### Frontend (React):
- ✅ Componentes funcionales con Hooks
- ✅ Manejo de estado con useState
- ✅ Efectos con useEffect
- ✅ Ruteo con React Router
- ✅ HTTP client con Axios
- ✅ Validación de formularios
- ✅ Manejo de errores
- ✅ Código comentado

### Backend (Express):
- ✅ API REST CRUD completa
- ✅ Modelos con Mongoose
- ✅ Validación de datos
- ✅ Manejo de errores
- ✅ Cors habilitado
- ✅ Documentado

### Database (MongoDB):
- ✅ Schema definido
- ✅ Validaciones en nivel DB
- ✅ Indexación (ID automático)

---

**¡Listo para desarrollar! 🚀**

Para cualquier duda, revisa los comentarios en el código o consulta la documentación en cada archivo.
