// Importar dotenv para cargar variables de entorno desde el archivo .env
import dotenv from 'dotenv';
dotenv.config({ path: new URL('../.env', import.meta.url) }); // Carga explícita del archivo .env compatible con Windows

// Validar que la variable de entorno MONGODB_URI exista
if (!process.env.MONGODB_URI) {
  throw new Error('La variable de entorno MONGODB_URI no está definida. Asegúrate de que exista en el archivo .env.');
}
console.log('MONGODB_URI cargada: OK');

// Importar el helper para conectar a MongoDB
import connectDB from '../src/config/db.js';

// Importar el modelo Figura
import Figura from '../src/models/Figura.js';

// Importar mongoose para cerrar la conexión al final
import mongoose from 'mongoose';

// Función asíncrona para realizar el seeding de la base de datos
(async () => {
  try {
    // Conectar a la base de datos usando el helper connectDB
    await connectDB();

    // Eliminar todas las figuras existentes en la colección
    await Figura.deleteMany();
    console.log('Colección limpiada');

    // Crear 20 figuras de ejemplo
    const figurasEjemplo = [
  { nombre: "Figura Naruto Uzumaki", anime: "Naruto", personaje: "Naruto Uzumaki", precio: 100, stock: 10, imagen: "naruto.jpg", malId: 20 },
  { nombre: "Figura Sasuke Uchiha", anime: "Naruto", personaje: "Sasuke Uchiha", precio: 120, stock: 5, imagen: "sasuke.jpg", malId: 20 },
  { nombre: "Figura Monkey D. Luffy", anime: "One Piece", personaje: "Monkey D. Luffy", precio: 90, stock: 8, imagen: "luffy.jpg", malId: 21 },
  { nombre: "Figura Roronoa Zoro", anime: "One Piece", personaje: "Roronoa Zoro", precio: 150, stock: 12, imagen: "zoro.jpg", malId: 21 },
  { nombre: "Figura Goku", anime: "Dragon Ball", personaje: "Goku", precio: 80, stock: 20, imagen: "goku.jpg", malId: 223 },
  { nombre: "Figura Vegeta", anime: "Dragon Ball", personaje: "Vegeta", precio: 110, stock: 15, imagen: "vegeta.jpg", malId: 223 },
  { nombre: "Figura Eren Yeager", anime: "Attack on Titan", personaje: "Eren Yeager", precio: 95, stock: 7, imagen: "eren.jpg", malId: 16498 },
  { nombre: "Figura Mikasa Ackerman", anime: "Attack on Titan", personaje: "Mikasa Ackerman", precio: 130, stock: 9, imagen: "mikasa.jpg", malId: 16498 },
  { nombre: "Figura Izuku Midoriya", anime: "My Hero Academia", personaje: "Izuku Midoriya", precio: 140, stock: 6, imagen: "midoriya.jpg", malId: 31964 },
  { nombre: "Figura Katsuki Bakugo", anime: "My Hero Academia", personaje: "Katsuki Bakugo", precio: 85, stock: 11, imagen: "bakugo.jpg", malId: 31964 },
  { nombre: "Figura Tanjiro Kamado", anime: "Demon Slayer", personaje: "Tanjiro Kamado", precio: 105, stock: 13, imagen: "tanjiro.jpg", malId: 38000 },
  { nombre: "Figura Nezuko Kamado", anime: "Demon Slayer", personaje: "Nezuko Kamado", precio: 125, stock: 4, imagen: "nezuko.jpg", malId: 38000 },
  { nombre: "Figura Yuji Itadori", anime: "Jujutsu Kaisen", personaje: "Yuji Itadori", precio: 115, stock: 14, imagen: "itadori.jpg", malId: 40748 },
  { nombre: "Figura Satoru Gojo", anime: "Jujutsu Kaisen", personaje: "Satoru Gojo", precio: 135, stock: 3, imagen: "gojo.jpg", malId: 40748 },
  { nombre: "Figura Kirito", anime: "Sword Art Online", personaje: "Kirito", precio: 75, stock: 18, imagen: "kirito.jpg", malId: 11757 },
  { nombre: "Figura Asuna", anime: "Sword Art Online", personaje: "Asuna", precio: 145, stock: 2, imagen: "asuna.jpg", malId: 11757 },
  { nombre: "Figura Mikey", anime: "Tokyo Revengers", personaje: "Mikey", precio: 155, stock: 1, imagen: "mikey.jpg", malId: 42249 },
  { nombre: "Figura Draken", anime: "Tokyo Revengers", personaje: "Draken", precio: 165, stock: 0, imagen: "draken.jpg", malId: 42249 },
  { nombre: "Figura Gon Freecss", anime: "Hunter x Hunter", personaje: "Gon Freecss", precio: 175, stock: 22, imagen: "gon.jpg", malId: 11061 },
  { nombre: "Figura Killua Zoldyck", anime: "Hunter x Hunter", personaje: "Killua Zoldyck", precio: 185, stock: 25, imagen: "killua.jpg", malId: 11061 },
];

    // Insertar las figuras en la base de datos
    await Figura.insertMany(figurasEjemplo);
    console.log('20 figuras insertadas');
  } catch (error) {
    console.error('Error durante el seeding de la base de datos:', error);
  } finally {
    // Cerrar la conexión a la base de datos
    await mongoose.connection.close();
    console.log('Conexión cerrada');
  }
})();