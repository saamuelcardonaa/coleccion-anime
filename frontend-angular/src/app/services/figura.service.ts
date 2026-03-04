// src/app/services/figura.service.ts
// Servicio Angular que maneja las peticiones HTTP al backend Express.
// Este servicio actúa como intermediario entre los componentes y la API REST del backend.
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interfaz que define la estructura de una Figura
// Ayuda al tipado en TypeScript y facilita el mantenimiento del código
export interface Figura {
  _id?: string;              // ID único de MongoDB (opcional en creación)
  nombre: string;            // Nombre de la figura (requerido)
  anime: string;             // Anime del cual proviene (requerido)
  personaje?: string;        // Personaje representado (opcional)
  precio?: number;           // Precio en unidades monetarias
  stock?: number;            // Cantidad disponible en inventario
  imagen?: string;           // URL de la imagen de la figura
  createdAt?: Date;          // Fecha de creación (automática en BD)
  updatedAt?: Date;          // Fecha de última actualización
}

@Injectable({
  providedIn: 'root'  // El servicio está disponible en toda la aplicación
})
export class FiguraService {
  // URL base del backend Express
  // Cambia esto si el backend está en otro puerto o servidor
  private apiUrl = 'http://localhost:5000/figuras';

  constructor(private http: HttpClient) {}

  /**
   * obtenerFiguras()
   * Realiza una petición GET al backend para obtener todas las figuras.
   * 
   * Cómo funciona:
   * 1. Se llama: this.figuraService.obtenerFiguras()
   * 2. Se realiza: GET http://localhost:5000/figuras
   * 3. Se devuelve: Observable con array de figuras
   * 4. El componente se suscribe: .subscribe((figuras) => { ... })
   * 
   * @returns Observable con la respuesta del backend
   */
  obtenerFiguras(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * obtenerFiguraPorId()
   * Obtiene una figura específica por su ID de MongoDB.
   * 
   * Ejemplo:
   * GET http://localhost:5000/figuras/507f1f77bcf86cd799439011
   * 
   * @param id - El _id de MongoDB de la figura a obtener
   * @returns Observable con la figura solicitada
   */
  obtenerFiguraPorId(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * crearFigura()
   * Realiza una petición POST al backend para crear una nueva figura.
   * 
   * Cómo funciona:
   * 1. El componente envía un objeto Figura
   * 2. Se realiza: POST http://localhost:5000/figuras
   * 3. El body contiene los datos: { nombre, anime, precio, stock, ... }
   * 4. El backend valida y guarda en MongoDB
   * 5. Se devuelve la figura creada con su _id
   * 
   * @param figura - Objeto con los datos de la figura a crear
   * @returns Observable con la figura creada (con _id asignado por MongoDB)
   */
  crearFigura(figura: Figura): Observable<any> {
    return this.http.post<any>(this.apiUrl, figura);
  }

  /**
   * actualizarFigura()
   * Realiza una petición PUT al backend para actualizar una figura existente.
   * 
   * Cómo funciona:
   * 1. Se envía el ID y los nuevos datos
   * 2. Se realiza: PUT http://localhost:5000/figuras/507f1f77bcf86cd799439011
   * 3. El backend actualiza solo los campos enviados
   * 4. Se devuelve la figura actualizada
   * 
   * @param id - El _id de la figura a actualizar
   * @param figura - Objeto con los datos a actualizar
   * @returns Observable con la figura actualizada
   */
  actualizarFigura(id: string, figura: Figura): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, figura);
  }

  /**
   * eliminarFigura()
   * Realiza una petición DELETE al backend para eliminar una figura.
   * 
   * Cómo funciona:
   * 1. Se envía el ID de la figura
   * 2. Se realiza: DELETE http://localhost:5000/figuras/507f1f77bcf86cd799439011
   * 3. El backend elimina la figura de MongoDB
   * 4. Se devuelve la figura eliminada (confirmación)
   * 
   * @param id - El _id de la figura a eliminar
   * @returns Observable con confirmación de eliminación
   */
  eliminarFigura(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
