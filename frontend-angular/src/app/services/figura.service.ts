import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  private baseUrl = `${environment.apiUrl}/api/v1/figuras`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Figura[]> {
    return this.http.get<Figura[]>(`${this.baseUrl}/get/all`);
  }

  getById(id: string): Observable<Figura> {
    return this.http.get<Figura>(`${this.baseUrl}/get/${id}`);
  }

  create(figura: Figura): Observable<Figura> {
    return this.http.post<Figura>(`${this.baseUrl}/post`, figura);
  }

  update(id: string, figura: Figura): Observable<Figura> {
    // OJO: tu backend usa PATCH
    return this.http.patch<Figura>(`${this.baseUrl}/update/${id}`, figura);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }
}
