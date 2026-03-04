// backend/EJEMPLOS_API.md
// Ejemplos de cómo probar la API REST de Figuras (rutas versión V1)

# Ejemplos de API REST - Figuras de Anime

Base: `http://localhost:5000/api/v1/figuras`

---

## GET /get/all
Obtener todas las figuras

```bash
curl -X GET http://localhost:5000/api/v1/figuras/get/all
```

Respuesta 200:
```json
{ "success": true, "count": 0, "data": [] }
```

---

## GET /get/:id
Obtener figura por ID

```bash
curl -X GET http://localhost:5000/api/v1/figuras/get/507f1f77bcf86cd799439011
```

404 si no existe:
```json
{ "success": false, "error": "Figura no encontrada" }
```

---

## POST /post
Crear nueva figura

```bash
curl -X POST http://localhost:5000/api/v1/figuras/post \
  -H "Content-Type: application/json" \
  -d '{
    "nombre":"Saitama Statue",
    "anime":"One Punch Man",
    "personaje":"Saitama",
    "precio":49.99,
    "stock":5,
    "imagen":"https://ejemplo.com/saitama.jpg",
    "malId":21
  }'
```

201 Created:
```json
{
  "success": true,
  "message": "Figura creada exitosamente",
  "data": { /* documento */ }
}
```

---

## PATCH /update/:id
Actualizar figura

```bash
curl -X PATCH http://localhost:5000/api/v1/figuras/update/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{ "precio":39.99 }'
```

---

## DELETE /delete/:id
Eliminar figura

```bash
curl -X DELETE http://localhost:5000/api/v1/figuras/delete/507f1f77bcf86cd799439011
```

---

## GET /jikan/:malId
Obtener datos de un anime mediante Jikan API

```bash
curl -X GET http://localhost:5000/api/v1/figuras/jikan/20
```

Respuesta simplificada:
```json
{
  "success": true,
  "data": {
    "title":"Naruto",
    "synopsis":"...",
    "imageUrl":"https://...",
    "score":7.8,
    "episodes":220
  }
}
```

---

> Nota: todas las rutas anteriores ya incluyen el prefijo `/api/v1/figuras`.
