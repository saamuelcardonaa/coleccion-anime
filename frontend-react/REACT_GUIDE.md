# 🎌 Frontend React - Colección Anime

Sistema frontend desarrollado con **React 18**, **React Router v7**, **Axios**, y **Bootstrap 5** para gestionar una colección de figuras de anime consumiendo una API REST en Express.

## 📋 Tabla de Contenidos

- [Requisitos](#requisitos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Componentes](#componentes)
- [Servicios](#servicios)
- [Cómo Usar](#cómo-usar)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)

---

## 📦 Requisitos

- **Node.js** v18+ (incluye npm)
- **Backend** corriendo en `http://localhost:5000`
- **MongoDB** conectada y funcional
- Navegador moderno (Chrome, Firefox, Safari, Edge)

---

## 🚀 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Verificar que el backend está corriendo

Asegúrate de que el servidor Express está activo en `http://localhost:5000`:

```bash
# En otra terminal, desde la carpeta backend/
npm run dev
```

### 3. Iniciar servidor de desarrollo de React

```bash
npm run dev
```

El servidor estará disponible en `http://localhost:5173` (o el puerto que indique Vite)

---

## 📁 Estructura del Proyecto

```
frontend-react/
├── public/
│   └── index.html                 # Archivo HTML principal con Bootstrap CDN
├── src/
│   ├── components/
│   │   ├── Navbar.jsx            # Barra de navegación superior
│   │   ├── Navbar.css
│   │   ├── FiguraList.jsx        # Componente para listar figuras
│   │   ├── FiguraList.css
│   │   ├── FiguraForm.jsx        # Componente para crear/editar figuras
│   │   ├── FiguraForm.css
│   │   ├── FiguraEdit.jsx        # Componente envoltorio para editar
│   ├── services/
│   │   └── figuraService.js      # Servicio HTTP con axios
│   ├── App.jsx                   # Componente raíz con rutas
│   ├── App.css                   # Estilos globales
│   ├── main.jsx                  # Punto de entrada
│   └── index.css
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧩 Componentes

### **Navbar.jsx**
Barra de navegación superior con enlaces a:
- 📋 Listado (Home)
- ➕ Nueva Figura (Crear)
- 💻 GitHub (enlace externo)

**Props:** Ninguna
**Hooks usados:** `useNavigate`, `Link` de React Router

---

### **FiguraList.jsx**
Página principal que muestra todas las figuras en una tabla responsiva.

**Características:**
- Cargar lista de figuras al montar
- Búsqueda/filtrado (opcional)
- Botones para editar y eliminar
- Manejo de errores y estados de carga
- Tabla responsiva (cards en mobile)

**Hooks usados:**
- `useState` - Estados: figuras, cargando, error
- `useEffect` - Cargar figuras al montar
- `useNavigate` - Navegar a editar/crear

**Funciones principales:**
- `cargarFiguras()` - Obtiene lista del servidor
- `handleEliminar(id, nombre)` - Elimina figura con confirmación

---

### **FiguraForm.jsx**
Formulario para crear y editar figuras (componente reutilizable).

**Campos:**
- Nombre * (requerido, mín. 3 caracteres)
- Anime * (requerido, mín. 3 caracteres)
- Personaje (opcional)
- Precio (mín. 0)
- Stock (mín. 0)
- URL de Imagen (opcional)

**Validaciones:**
- Validación en cliente (antes de enviar)
- Mensajes de error individuales por campo
- Vista previa de imagen

**Modos:**
- **Crear:** POST /figuras (sin ID en URL)
- **Editar:** PUT /figuras/:id (con ID en URL)

**Hooks usados:**
- `useState` - Estado del formulario y errores
- `useEffect` - Cargar datos si es edición
- `useParams` - Obtener ID de URL (edición)
- `useNavigate` - Navegar al listado tras guardar
- `useLocation` - Obtener datos de figura editada

---

### **FiguraEdit.jsx**
Componente envoltorio que carga una figura específica antes de mostrar FiguraForm.

**Funcionalidad:**
- Obtiene el ID de la URL
- Carga la figura del backend
- Muestra spinner mientras carga
- Maneja errores de carga
- Pasa los datos a FiguraForm

---

## 🔧 Servicios

### **figuraService.js**
Centraliza todas las llamadas HTTP al backend usando **axios**.

```javascript
// Métodos disponibles:

obtenerFiguras()              // GET /figuras - Obtiene todas las figuras
obtenerFiguraPorId(id)        // GET /figuras/:id - Obtiene una figura
crearFigura(figura)           // POST /figuras - Crea nueva figura
actualizarFigura(id, figura)  // PUT /figuras/:id - Actualiza figura
eliminarFigura(id)            // DELETE /figuras/:id - Elimina figura
```

**Características:**
- Base URL: `http://localhost:5000/figuras`
- Todo async/await
- Try/catch en cada método
- Logs de error en consola
- Manejo automático de JSON

---

## 💻 Cómo Usar

### Crear una figura

1. Haz clic en **"➕ Nueva Figura"** en el navbar
2. Completa los campos del formulario:
   - Nombre (requerido)
   - Anime (requerido)
   - Personaje (opcional)
   - Precio y Stock
   - URL de imagen
3. Haz clic en **"💾 Crear"**
4. La figura aparecerá en el listado

### Editar una figura

1. En el listado, haz clic en **"✏️ Editar"** en la fila de la figura
2. Modifica los campos que necesites
3. Haz clic en **"💾 Actualizar"**
4. Los cambios se verán en el listado

### Eliminar una figura

1. En el listado, haz clic en **"🗑️ Eliminar"** en la fila
2. Confirma la eliminación en el diálogo
3. La figura desaparecerá del listado

### Ver listado completo

1. Haz clic en **"📋 Listado"** en el navbar
2. Se muestran todas las figuras en una tabla
3. Puedes ver imagen, precio, stock, etc.

---

## ✨ Funcionalidades

### ✅ Completas

- [x] Listar todas las figuras
- [x] Crear nueva figura
- [x] Editar figura existente
- [x] Eliminar figura
- [x] Validación de formulario
- [x] Manejo de errores
- [x] Interfaz responsive (desktop/mobile)
- [x] Navegación con React Router
- [x] Integración con Bootstrap 5
- [x] Código comentado y educativo

### 🔄 Posibles mejoras

- Buscar/filtrar figuras
- Paginación de tabla
- Ordenar por columnas
- Importar/exportar datos
- Integración con Jikan API para auto-completar
- Dark mode
- Almacenamiento local (localStorage)
- Testing con Jest/React Testing Library

---

## 🛠️ Tecnologías

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| React | 18+ | Framework UI |
| React Router | 7+ | Navegación |
| Axios | 1.6+ | HTTP client |
| Vite | 5+ | Build tool |
| Bootstrap | 5.3+ | CSS framework |
| JavaScript/JSX | ES6+ | Lenguaje |
| npm | 9+ | Package manager |

---

## 📝 Variables de Entorno (Opcional)

Crea un archivo `.env` en la raíz:

```
VITE_API_URL=http://localhost:5000
```

Luego úsalo en `figuraService.js`:

```javascript
const API_URL = import.meta.env.VITE_API_URL;
```

---

## 🐛 Troubleshooting

### "Cannot connect to server"
- Verifica que el backend esté corriendo en puerto 5000
- Intenta: `npm run dev` en la carpeta `backend/`

### "Module not found: axios"
```bash
npm install axios
```

### "React Router not found"
```bash
npm install react-router-dom
```

### Puerta 5173 ocupada
Vite usará el siguiente puerto disponible automáticamente

### CORS errors
Asegúrate de que el backend tiene habilitado CORS:
```javascript
app.use(cors());
```

---

## 📚 Recursos Educativos

- [React Hooks Documentation](https://react.dev/reference/react)
- [React Router Guide](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [Bootstrap Components](https://getbootstrap.com/docs/5.3/components/)

---

## 📄 Licencia

Este proyecto es de propósito educativo.

---

**Desarrollado como parte del proyecto fullstack MEAN + React** 🚀
