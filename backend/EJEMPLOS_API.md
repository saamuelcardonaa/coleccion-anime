// backend/EJEMPLOS_API.md
// Ejemplos de cómo probar la API REST de Figuras

# Ejemplos de API REST - Figuras de Anime

Esta guía muestra cómo probar los endpoints CRUD de figuras usando cURL o Postman.

## Base URL
```
http://localhost:5000
```

---

## 1. GET /figuras - Obtener todas las figuras

Obtiene la lista completa de todas las figuras en la colección.

### cURL
```bash
curl -X GET http://localhost:5000/figuras
```

### Respuesta esperada (200 OK)
```json
{
  "success": true,
  "count": 2,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "nombre": "Saitama Statue",
      "anime": "One Punch Man",
      "personaje": "Saitama",
      "precio": 49.99,
      "stock": 5,
      "imagen": "https://ejemplo.com/saitama.jpg",
      "createdAt": "2026-03-04T10:30:00.000Z",
      "updatedAt": "2026-03-04T10:30:00.000Z"
    }
  ]
}
```

---

## 2. GET /figuras/:id - Obtener una figura por ID

Obtiene una figura específica usando su MongoDB ID.

### cURL
```bash
curl -X GET http://localhost:5000/figuras/507f1f77bcf86cd799439011
```

### Respuesta esperada (200 OK)
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Saitama Statue",
    "anime": "One Punch Man",
    "personaje": "Saitama",
    "precio": 49.99,
    "stock": 5,
    "imagen": "https://ejemplo.com/saitama.jpg",
    "createdAt": "2026-03-04T10:30:00.000Z",
    "updatedAt": "2026-03-04T10:30:00.000Z"
  }
}
```

### Si no existe (404 Not Found)
```json
{
  "success": false,
  "error": "Figura no encontrada"
}
```

---

## 3. POST /figuras - Crear una nueva figura

Crea una nueva figura en la colección. Los campos requeridos son: nombre y anime.

### cURL
```bash
curl -X POST http://localhost:5000/figuras \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Naruto Figure",
    "anime": "Naruto Shippuden",
    "personaje": "Naruto Uzumaki",
    "precio": 34.99,
    "stock": 10,
    "imagen": "https://ejemplo.com/naruto.jpg"
  }'
```

### Respuesta esperada (201 Created)
```json
{
  "success": true,
  "message": "Figura creada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439012",
    "nombre": "Naruto Figure",
    "anime": "Naruto Shippuden",
    "personaje": "Naruto Uzumaki",
    "precio": 34.99,
    "stock": 10,
    "imagen": "https://ejemplo.com/naruto.jpg",
    "createdAt": "2026-03-04T11:00:00.000Z",
    "updatedAt": "2026-03-04T11:00:00.000Z"
  }
}
```

### Error si falta campo requerido (400 Bad Request)
```json
{
  "success": false,
  "error": "Error al crear la figura",
  "message": "Figura validation failed: nombre: El nombre de la figura es requerido"
}
```

---

## 4. PUT /figuras/:id - Actualizar una figura

Actualiza los datos de una figura existente.

### cURL
```bash
curl -X PUT http://localhost:5000/figuras/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{
    "precio": 39.99,
    "stock": 3
  }'
```

### Respuesta esperada (200 OK)
```json
{
  "success": true,
  "message": "Figura actualizada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Saitama Statue",
    "anime": "One Punch Man",
    "personaje": "Saitama",
    "precio": 39.99,
    "stock": 3,
    "imagen": "https://ejemplo.com/saitama.jpg",
    "createdAt": "2026-03-04T10:30:00.000Z",
    "updatedAt": "2026-03-04T11:15:00.000Z"
  }
}
```

### Si no existe (404 Not Found)
```json
{
  "success": false,
  "error": "Figura no encontrada"
}
```

---

## 5. DELETE /figuras/:id - Eliminar una figura

Elimina una figura de la base de datos.

### cURL
```bash
curl -X DELETE http://localhost:5000/figuras/507f1f77bcf86cd799439011
```

### Respuesta esperada (200 OK)
```json
{
  "success": true,
  "message": "Figura eliminada exitosamente",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "nombre": "Saitama Statue",
    "anime": "One Punch Man",
    "personaje": "Saitama",
    "precio": 49.99,
    "stock": 5,
    "imagen": "https://ejemplo.com/saitama.jpg",
    "createdAt": "2026-03-04T10:30:00.000Z",
    "updatedAt": "2026-03-04T10:30:00.000Z"
  }
}
```

### Si no existe (404 Not Found)
```json
{
  "success": false,
  "error": "Figura no encontrada"
}
```

---

## 6. GET /figuras/jikan/buscar?nombre=Naruto - Buscar en API de Jikan

**CONSUMO DE API EXTERNA: Esta ruta consulta la API pública de Jikan (MyAnimeList).**

Busca información de animes usando la API de Jikan sin requerir autenticación.
Esta es una forma de integrar datos de fuentes externas en nuestra aplicación.

### cURL
```bash
# Buscar por nombre de anime
curl -X GET "http://localhost:5000/figuras/jikan/buscar?nombre=Naruto"
curl -X GET "http://localhost:5000/figuras/jikan/buscar?nombre=One Punch Man"
curl -X GET "http://localhost:5000/figuras/jikan/buscar?nombre=Attack on Titan"
```

### Respuesta esperada (200 OK)
```json
{
  "success": true,
  "count": 25,
  "message": "Se encontraron 25 resultado(s) para \"Naruto\"",
  "data": [
    {
      "malId": 20,
      "titulo": "Naruto",
      "titulosAlternativos": [
        {
          "type": "Default",
          "title": "Naruto"
        },
        {
          "type": "English",
          "title": "Naruto"
        }
      ],
      "sinopsis": "Naruto Uzumaki es un shinobi joven que aspira a ser Hokage...",
      "score": 7.5,
      "episodios": 220,
      "tipo": "TV",
      "estado": "Finished Airing",
      "ano": 2002,
      "temporada": "fall",
      "imagen": "https://cdn.myanimelist.net/images/anime/1/17405.jpg",
      "enlaceMAL": "https://myanimelist.net/anime/20/Naruto"
    },
    {
      "malId": 1735,
      "titulo": "Naruto Shippuden",
      "sinopsis": "La continuación del viaje de Naruto...",
      "score": 8.2,
      "episodios": 500,
      "tipo": "TV",
      "imagen": "https://cdn.myanimelist.net/images/anime/3/13969.jpg",
      "enlaceMAL": "https://myanimelist.net/anime/1735/Naruto_Shippuden"
    }
  ]
}
```

### Error: Parámetro nombre faltante (400 Bad Request)
```bash
curl -X GET "http://localhost:5000/figuras/jikan/buscar"
```

```json
{
  "success": false,
  "error": "Parámetro requerido faltante",
  "message": "El parámetro \"nombre\" es obligatorio en la query string"
}
```

### Error: API de Jikan no disponible (500 Server Error)
```json
{
  "success": false,
  "error": "Error al consultar la API de Jikan",
  "message": "Error: connect ENOTFOUND api.jikan.moe"
}
```

---

## Cómo funciona el consumo de API externa en buscarAnimeJikan

### Explicación del flujo para un profesor:

1. **El cliente envía una solicitud HTTP al backend:**
   ```
   GET /figuras/jikan/buscar?nombre=Naruto
   ```

2. **El controlador recibe el parámetro "nombre" de la URL:**
   ```javascript
   const { nombre } = req.query; // "Naruto"
   ```

3. **El backend realiza una petición HTTP a Jikan (otra API externa):**
   ```javascript
   const urlJikan = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nombre)}`;
   const response = await axios.get(urlJikan);
   ```

4. **El backend recibe los datos de Jikan y los transforma:**
   ```javascript
   const animesFormato = animes.map((anime) => ({
     malId: anime.mal_id,
     titulo: anime.title,
     sinopsis: anime.synopsis,
     score: anime.score,
     imagen: anime.images?.jpg?.image_url,
     // ... más campos
   }));
   ```

5. **El backend responde al cliente con los datos procesados:**
   ```json
   {
     "success": true,
     "count": 25,
     "data": [... animes encontrados ...]
   }
   ```

Este patrón es común en aplicaciones web modernas donde el backend actúa como intermediario
entre el cliente y múltiples fuentes de datos.

---

## Resumen de Códigos HTTP

| Código | Significado | Cuándo se usa |
|--------|-------------|---------------|
| 200    | OK          | GET exitoso, PUT exitoso, DELETE exitoso |
| 201    | Created     | POST exitoso (figura creada) |
| 400    | Bad Request | Error de validación (datos inválidos) |
| 404    | Not Found   | Figura no encontrada por ID |
| 500    | Server Error | Error interno del servidor |

---

## Cómo probar con Postman

1. Abre Postman
2. Crea una nueva request
3. Selecciona el método HTTP (GET, POST, PUT, DELETE)
4. Ingresa la URL: `http://localhost:5000/figuras`
5. En la pestaña "Body", selecciona "raw" y "JSON"
6. Ingresa los datos en formato JSON
7. Haz clic en "Send"
