// src/app/components/figura-list/figura-list.component.ts
// Componente para mostrar lista de figuras en una tabla.
// Este componente se suscribe al servicio para obtener datos y manejar creación, edición y eliminación.
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FiguraService, Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-list',
  templateUrl: './figura-list.component.html',
  styleUrls: ['./figura-list.component.css']
})
export class FiguraListComponent implements OnInit {
  // Array que almacena las figuras obtenidas del backend
  figuras: Figura[] = [];
  loading = false;
  error: string | null = null;
  success: string | null = null;
  search: string = '';
  page: number = 1;
  pageSize: number = 10;

  // Inyectamos el servicio de figuras en el constructor
  constructor(private figuraService: FiguraService, private router: Router) {}

  /**
   * ngOnInit()
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Se usa para cargar las figuras del backend cuando se carga la página.
   */
  ngOnInit(): void {
    this.cargarFiguras();
    setTimeout(() => {
      console.log('Figuras cargadas:', this.figuras);
    }, 1000); // Espera breve para asegurar que el observable se resuelva
  }

  /**
   * cargarFiguras()
   * Obtiene la lista de figuras del backend mediante el servicio.
   * 
   * Cómo funciona:
   * 1. Marca cargando = true para mostrar un spinner
   * 2. Llama al servicio figuraService.obtenerFiguras()
   * 3. Se suscribe a la respuesta (Observable)
   * 4. Guarda las figuras en this.figuras
   * 5. Limpia errores previos
   */
  cargarFiguras(): void {
    this.loading = true;
    this.error = null;
    this.success = null;
    this.figuraService.getAll().subscribe({
      next: (figuras) => {
        this.figuras = figuras;
        this.loading = false;
      },
      error: (err: any) => {
        this.error = 'Error al cargar las figuras.';
        this.loading = false;
      }
    });
  }

  /**
   * abrirFormulario()
   * Muestra el formulario para crear una nueva figura.
   * Reinicia figuraEdicion a null para indicar que es creación, no edición.
   */
  irACrear(): void {
    this.router.navigate(['/figuras/nueva']);
  }

  /**
   * editarFigura()
   * Abre el formulario en modo edición con los datos de una figura existente.
   * 
   * @param figura - La figura a editar
   */
  editarFigura(figura: Figura): void {
    if (figura._id) {
      this.router.navigate(['/figuras/editar', figura._id]);
    }
  }

  /**
   * guardarFigura()
   * Guarda una figura nueva o actualiza una existente, según si figuraEdicion tiene _id.
   * Se llama desde el componente hijo figura-form.
   * 
   * @param figura - La figura a guardar
   */
  // El método guardarFigura y lógica de formulario embebido se eliminan, ahora todo es por routing

  /**
   * eliminarFigura()
   * Elimina una figura después de confirmar con el usuario.
   * 
   * @param figura - La figura a eliminar
   */
  eliminarFigura(id: string | undefined): void {
    if (!id) return;
    if (!confirm('¿Seguro que quieres eliminar esta figura?')) return;
    this.loading = true;
    this.error = null;
    this.success = null;
    this.figuraService.delete(id).subscribe({
      next: () => {
        this.success = 'Figura eliminada correctamente.';
        this.cargarFiguras();
      },
      error: (err: any) => {
        this.error = 'Error al eliminar la figura.';
        this.loading = false;
      }
    });
  }

  /**
   * cerrarFormulario()
   * Oculta el formulario sin guardar cambios.
   */
  // El método cerrarFormulario y lógica de formulario embebido se eliminan

  get filtradas(): Figura[] {
    let filtradas = this.figuras;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtradas = filtradas.filter(f =>
        f.nombre.toLowerCase().includes(s) ||
        f.anime.toLowerCase().includes(s) ||
        (f.personaje && f.personaje.toLowerCase().includes(s))
      );
    }
    const start = (this.page - 1) * this.pageSize;
    return filtradas.slice(start, start + this.pageSize);
  }

  get totalPages(): number {
    let filtradas = this.figuras;
    if (this.search) {
      const s = this.search.toLowerCase();
      filtradas = filtradas.filter(f =>
        f.nombre.toLowerCase().includes(s) ||
        f.anime.toLowerCase().includes(s) ||
        (f.personaje && f.personaje.toLowerCase().includes(s))
      );
    }
    return Math.ceil(filtradas.length / this.pageSize) || 1;
  }

  setPage(p: number) {
    if (p >= 1 && p <= this.totalPages) {
      this.page = p;
    }
  }
}
