# Frontend Angular

Aplicación Angular completa para gestionar una colección de figuras de anime usando una API REST Express.

## Características

- ✅ Consumo de API REST (backend Express)
- ✅ Listar figuras en tabla Bootstrap
- ✅ Crear nuevas figuras con validación
- ✅ Editar figuras existentes
- ✅ Eliminar figuras
- ✅ Interfaz responsiva con Bootstrap 5
- ✅ Código comentado para educación

## Estructura del proyecto

```
src/
  app/
    components/
      figura-list/          # Componente para listar y gestionar figuras
        figura-list.component.ts
        figura-list.component.html
        figura-list.component.css
      figura-form/          # Componente formulario (crear/editar)
        figura-form.component.ts
        figura-form.component.html
        figura-form.component.css
    services/
      figura.service.ts     # Servicio HTTP para conectar con backend
    app.component.ts        # Componente raíz
    app.component.html
    app.component.css
    app.module.ts           # Módulo raíz (declara componentes)
  main.ts                   # Punto de entrada
  index.html                # HTML principal (carga Bootstrap)
  styles.css                # Estilos globales
```

## Requisitos previos

- Node.js v16+ instalado
- Angular CLI instalado: `npm install -g @angular/cli`
- Backend Express corriendo en `http://localhost:5000`

## Instalación

1. Navega a la carpeta:
   ```bash
   cd frontend-angular
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Ejecutar la aplicación

En modo desarrollo (hot reload):
```bash
npm start
```
O si prefieres:
```bash
ng serve --open
```

La aplicación se abrirá automáticamente en `http://localhost:4200`

## Cómo funciona

### Servicio HTTP (`figura.service.ts`)
- Métodos CRUD que comunican con el backend:
  - `obtenerFiguras()`: GET /figuras
  - `obtenerFiguraPorId(id)`: GET /figuras/:id
  - `crearFigura(figura)`: POST /figuras
  - `actualizarFigura(id, figura)`: PUT /figuras/:id
  - `eliminarFigura(id)`: DELETE /figuras/:id

### Componente Lista (`figura-list.component.ts`)
- Obtiene la lista de figuras al iniciar
- Muestra una tabla con Bootstrap 5
- Permite crear, editar y eliminar figuras
- Maneja errores de conexión

### Componente Formulario (`figura-form.component.ts`)
- Formulario reactivo con validación
- Campos: nombre, anime, personaje, precio, stock, imagen
- Se validan campos requeridos y longitudes mínimas
- Emite eventos al componente padre

## Validaciones del formulario

- **Nombre**: Obligatorio, entre 3 y 100 caracteres
- **Anime**: Obligatorio, entre 3 y 100 caracteres
- **Precio**: Mínimo 0
- **Stock**: Mínimo 0
- **Personaje**: Opcional
- **Imagen**: Opcional (URL)

## Dependencias principales

- `@angular/core`: Framework Angular
- `@angular/forms`: Formularios reactivos
- `@angular/common/http`: Cliente HTTP
- `bootstrap`: Framework CSS para la interfaz

## Notas para el profesor

- **Componentes**: Separación de responsabilidades entre listar, crear/editar
- **Servicio**: Intermediario entre componentes y API
- **Formularios Reactivos**: Uso de FormBuilder y validaciones
- **Bootstrap**: Minimiza CSS personalizado
- **Comentarios**: Código ampliamente comentado para entender la arquitectura Angular
- **Two-way binding**: Uso de [(ngModel)] en inputs
- **Event binding**: (click), (ngSubmit) para manejo de eventos
- **Property binding**: [disabled], [class.is-invalid] para propiedades
- **Directivas**: *ngIf, *ngFor para lógica condicional e iteración

## Configuración de conexión

Si el backend está en otro puerto o servidor, edita `src/app/services/figura.service.ts`:

```typescript
private apiUrl = 'http://localhost:5000/figuras'; // Cambiar aquí
```

## Troubleshooting

**Error: "Cannot find module '@angular/...'**
- Ejecuta `npm install`

**Error: "Backend no responde"**
- Verifica que el backend Express esté corriendo en `http://localhost:5000`
- Abre la consola del navegador (F12) para ver errores CORS

**Error: "Cannot POST /figuras"**
- Asegúrate de que MongoDB está corriendo
- Verifica las variables de entorno del backend (.env)

## Build para producción

```bash
npm run build
```

Los archivos se generarán en `dist/coleccion-anime-angular`

