import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
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

export interface ApiListResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface ApiItemResponse<T> {
  success: boolean;
  data: T;
}

@Injectable({ providedIn: 'root' })
export class FiguraService {
  private baseUrl = `${environment.apiUrl}/figuras`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Figura[]> {
    return this.http.get<ApiListResponse<Figura>>(`${this.baseUrl}/get/all`).pipe(
      map(res => res.data)
    );
  }

  getById(id: string): Observable<Figura> {
    return this.http.get<ApiItemResponse<Figura>>(`${this.baseUrl}/get/${id}`).pipe(
      map(res => res.data)
    );
  }

  create(figura: Figura): Observable<Figura> {
    return this.http.post<ApiItemResponse<Figura>>(`${this.baseUrl}/post`, figura).pipe(
      map(res => res.data)
    );
  }

  update(id: string, figura: Figura): Observable<Figura> {
    return this.http.patch<ApiItemResponse<Figura>>(`${this.baseUrl}/update/${id}`, figura).pipe(
      map(res => res.data)
    );
  }

  delete(id: string): Observable<any> {
    return this.http.delete<ApiItemResponse<null>>(`${this.baseUrl}/delete/${id}`);
  }
}
