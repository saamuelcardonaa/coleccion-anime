// src/app/services/figura.service.ts
// Servicio Angular para gestionar figuras de anime y búsquedas Jikan
// Usa HttpClient para comunicarse con el backend y la API de Jikan

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

// Interfaz Figura para tipar los datos
export interface Figura {
  _id?: string;
  nombre: string;
  anime: string;
  personaje?: string;
  precio: number;
  stock: number;
  imagen?: string;
  malId?: number;
}

@Injectable({ providedIn: 'root' })
export class FiguraService {
  // URL base del backend
  private baseUrl = `${environment.apiUrl}/api/v1/figuras`;

  constructor(private http: HttpClient) {}

  // Obtener todas las figuras
  getAll(): Observable<Figura[]> {
    return this.http.get<Figura[]>(`${this.baseUrl}/get/all`);
  }

  // Crear una nueva figura (alias para create)
  crearFigura(figura: Figura): Observable<Figura> {
    return this.create(figura);
  }

  // Crear una nueva figura (POST)
  create(figura: Figura): Observable<Figura> {
    return this.http.post<Figura>(`${this.baseUrl}/post`, figura);
  }

  // Actualizar una figura existente (PUT)
  actualizarFigura(id: string, figura: Figura): Observable<Figura> {
    return this.http.put<Figura>(`${this.baseUrl}/update/${id}`, figura);
  }

  // Eliminar una figura por ID
  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  // Buscar anime en Jikan por nombre
  jikanSearch(nombre: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jikan/buscar`, {
      params: { nombre }
    });
  }

  // Obtener detalles de anime por malId desde Jikan
  jikanByMalId(malId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/jikan/${malId}`);
  }
}
