// src/controllers/figuraController.js
// Controlador que gestiona la lógica CRUD para el modelo Figura.
// Cada función aquí responde a una ruta HTTP y realiza operaciones con la base de datos.
const Figura = require('../models/Figura');

/**
 * obtenerFiguras
 * Función para listar todas las figuras de la colección.
 * Método HTTP: GET /figuras
 * Query params: opcional page, limit para paginación
 * Respuesta: array de figuras ordenadas por fecha de creación (más recientes primero)
 */
exports.obtenerFiguras = async (req, res) => {
  try {
    // find() sin parámetros devuelve todos los documentos
    // sort({ createdAt: -1 }) ordena de más reciente a más antiguo (-1 = descendente)
    const figuras = await Figura.find().sort({ createdAt: -1 });

    // Responder con estado 200 (OK) y el array de figuras en JSON
    res.status(200).json({
      success: true,
      count: figuras.length,
      data: figuras,
    });
  } catch (error) {
    // En caso de error, responder con estado 500 (error interno del servidor)
    res.status(500).json({
      success: false,
      error: 'Error al obtener las figuras',
      message: error.message,
    });
  }
};

/**
 * obtenerFiguraPorId
 * Función para obtener una figura específica por su ID.
 * Método HTTP: GET /figuras/:id
 * Parámetros: id (parámetro de ruta, el _id de MongoDB)
 * Respuesta: un objeto figura o error 404 si no existe
 */
exports.obtenerFiguraPorId = async (req, res) => {
  try {
    // req.params.id contiene el valor del parámetro :id en la ruta
    const { id } = req.params;

    // findById() busca por el _id (identificador único de MongoDB)
    const figura = await Figura.findById(id);

    // Si no existe la figura, responder con estado 404 (no encontrado)
    if (!figura) {
      return res.status(404).json({
        success: false,
        error: 'Figura no encontrada',
      });
    }

    // Responder con la figura encontrada
    res.status(200).json({
      success: true,
      data: figura,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al obtener la figura',
      message: error.message,
    });
  }
};

/**
 * crearFigura
 * Función para crear una nueva figura en la base de datos.
 * Método HTTP: POST /figuras
 * Body: objeto JSON con los campos de la figura (nombre, anime, precio, etc.)
 * Respuesta: figura creada o error de validación si falta algún campo requerido
 */
exports.crearFigura = async (req, res) => {
  try {
    // req.body contiene los datos enviados en el body de la solicitud HTTP
    // Validación: la BD validará que nombre y anime sean requeridos
    const nuevaFigura = new Figura(req.body);

    // save() guarda el documento en MongoDB y ejecuta las validaciones del esquema
    await nuevaFigura.save();

    // Responder con estado 201 (creado) y la figura creada
    res.status(201).json({
      success: true,
      message: 'Figura creada exitosamente',
      data: nuevaFigura,
    });
  } catch (error) {
    // Si hay error de validación (ej: campo requerido faltante), responder 400 (solicitud válida)
    res.status(400).json({
      success: false,
      error: 'Error al crear la figura',
      message: error.message,
    });
  }
};

/**
 * actualizarFigura
 * Función para actualizar una figura existente.
 * Método HTTP: PUT /figuras/:id
 * Parámetros: id (el _id de la figura a actualizar)
 * Body: objeto JSON con los campos a actualizar
 * Respuesta: figura actualizada o error 404 si no existe
 */
exports.actualizarFigura = async (req, res) => {
  try {
    const { id } = req.params;

    // findByIdAndUpdate(id, datos, opciones)
    // new: true devuelve el documento actualizado (no el original)
    // runValidators: true ejecuta las validaciones del esquema en la actualización
    const figuraActualizada = await Figura.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    // Si la figura no existe, responder con 404
    if (!figuraActualizada) {
      return res.status(404).json({
        success: false,
        error: 'Figura no encontrada',
      });
    }

    // Responder con la figura actualizada
    res.status(200).json({
      success: true,
      message: 'Figura actualizada exitosamente',
      data: figuraActualizada,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: 'Error al actualizar la figura',
      message: error.message,
    });
  }
};

/**
 * eliminarFigura
 * Función para eliminar una figura de la base de datos.
 * Método HTTP: DELETE /figuras/:id
 * Parámetros: id (el _id de la figura a eliminar)
 * Respuesta: confirmación de eliminación o error 404 si no existe
 */
exports.eliminarFigura = async (req, res) => {
  try {
    const { id } = req.params;

    // findByIdAndDelete(id) busca la figura por ID y la elimina de la BD
    // Devuelve el documento eliminado (o null si no existía)
    const figuraEliminada = await Figura.findByIdAndDelete(id);

    // Si la figura no existía, responder con 404
    if (!figuraEliminada) {
      return res.status(404).json({
        success: false,
        error: 'Figura no encontrada',
      });
    }

    // Responder con estado 200 y confirmación de eliminación
    res.status(200).json({
      success: true,
      message: 'Figura eliminada exitosamente',
      data: figuraEliminada,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Error al eliminar la figura',
      message: error.message,
    });
  }
};

/**
 * buscarAnimeJikan
 * Función que consume la API pública de Jikan (MyAnimeList) para buscar información de animes.
 * 
 * EXPLICACIÓN DE CONSUMO DE APIs EXTERNAS:
 * - axios es una librería para hacer peticiones HTTP desde Node.js
 * - Usamos req.query.nombre para obtener el parámetro de búsqueda de la URL
 * - La URL de Jikan es: https://api.jikan.moe/v4/anime?q=NOMBRE
 * - Devolvemos los datos relevantes (título, sinopsis, imagen) de la respuesta
 * 
 * Método HTTP: GET /figuras/jikan/buscar?nombre=Naruto
 * Query params: nombre (obligatorio) - nombre del anime a buscar
 * Respuesta: array de animes encontrados con información básica
 */
exports.buscarAnimeJikan = async (req, res) => {
  try {
    // Obtener el parámetro de búsqueda de la URL (query string)
    // Ejemplo: GET /figuras/jikan/buscar?nombre=Naruto
    // req.query.nombre será "Naruto"
    const { nombre } = req.query;

    // Validar que se haya proporcionado un nombre de búsqueda
    if (!nombre) {
      return res.status(400).json({
        success: false,
        error: 'Parámetro requerido faltante',
        message: 'El parámetro "nombre" es obligatorio en la query string',
      });
    }

    // Construir la URL de la API de Jikan
    // La API de Jikan es pública y no requiere autenticación
    const urlJikan = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(nombre)}`;

    // axios.get() realiza una petición HTTP GET a la URL especificada
    // Esta es una petición a una API externa, no a nuestra BD
    console.log(`[Jikan API] Buscando animes con: ${nombre}`);
    const response = await axios.get(urlJikan);

    // response.data contiene los datos devueltos por Jikan
    // La respuesta tiene la estructura: { data: [...], pagination: {...} }
    const animes = response.data.data;

    // Extraer solo la información relevante de cada anime
    // para simplificar la respuesta y no devolver datos innecesarios
    const animesFormato = animes.map((anime) => ({
      // id de MyAnimeList (útil para futuras búsquedas de más detalles)
      malId: anime.mal_id,
      // título en inglés del anime
      titulo: anime.title,
      // títulos alternativos (títulos en otros idiomas)
      titulosAlternativos: anime.titles,
      // descripción/sinopsis del anime
      sinopsis: anime.synopsis,
      // clasificación/rating (si disponible)
      score: anime.score,
      // cantidad de episodios
      episodios: anime.episodes,
      // tipo de anime (TV, Película, OVA, etc.)
      tipo: anime.type,
      // estado (Airing, Finished, etc.)
      estado: anime.status,
      // año de lanzamiento
      ano: anime.year,
      // temporada de lanzamiento
      temporada: anime.season,
      // URL de la imagen/poster del anime
      imagen: anime.images?.jpg?.image_url,
      // URL en MyAnimeList
      enlaceMAL: anime.url,
    }));

    // Responder con los animes encontrados
    res.status(200).json({
      success: true,
      count: animesFormato.length,
      message: `Se encontraron ${animesFormato.length} resultado(s) para "${nombre}"`,
      data: animesFormato,
    });
  } catch (error) {
    // Manejo de errores al consumir la API externa
    console.error('[Jikan API Error]', error.message);

    // Si hay error de red o la API no está disponible
    if (error.response?.status) {
      return res.status(error.response.status).json({
        success: false,
        error: 'Error de la API externa de Jikan',
        message: error.message,
      });
    }

    // Error general
    res.status(500).json({
      success: false,
      error: 'Error al consultar la API de Jikan',
      message: error.message,
    });
  }
};
