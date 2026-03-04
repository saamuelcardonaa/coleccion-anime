// src/app/components/figura-list/figura-list.component.ts
// Componente para mostrar lista de figuras en una tabla.
// Este componente se suscribe al servicio para obtener datos y manejar creación, edición y eliminación.
import { Component, OnInit } from '@angular/core';
import { FiguraService, Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-list',
  templateUrl: './figura-list.component.html',
  styleUrls: ['./figura-list.component.css']
})
export class FiguraListComponent implements OnInit {
  // Array que almacena las figuras obtenidas del backend
  figuras: Figura[] = [];

  // Bandera para mostrar/ocultar el formulario de creación/edición
  mostrarFormulario = false;

  // Objeto figura que se está editando (null si se está creando una nueva)
  figuraEdicion: Figura | null = null;

  // Variable para mostrar mensajes de carga
  cargando = false;

  // Variable para mostrar mensajes de error
  error: string | null = null;

  // Inyectamos el servicio de figuras en el constructor
  constructor(private figuraService: FiguraService) {}

  /**
   * ngOnInit()
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Se usa para cargar las figuras del backend cuando se carga la página.
   */
  ngOnInit(): void {
    this.cargarFiguras();
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
    this.cargando = true;
    this.figuraService.obtenerFiguras().subscribe({
      next: (response) => {
        // response.data contiene el array de figuras del backend
        this.figuras = response.data || [];
        this.error = null;
        this.cargando = false;
      },
      error: (err) => {
        // Si hay error de conexión o en el backend
        this.error = 'Error al cargar las figuras. Verifica que el backend esté corriendo.';
        console.error('Error en cargarFiguras:', err);
        this.cargando = false;
      }
    });
  }

  /**
   * abrirFormulario()
   * Muestra el formulario para crear una nueva figura.
   * Reinicia figuraEdicion a null para indicar que es creación, no edición.
   */
  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.figuraEdicion = null;
  }

  /**
   * editarFigura()
   * Abre el formulario en modo edición con los datos de una figura existente.
   * 
   * @param figura - La figura a editar
   */
  editarFigura(figura: Figura): void {
    this.figuraEdicion = { ...figura }; // Copiar la figura para no modificar el original
    this.mostrarFormulario = true;
  }

  /**
   * guardarFigura()
   * Guarda una figura nueva o actualiza una existente, según si figuraEdicion tiene _id.
   * Se llama desde el componente hijo figura-form.
   * 
   * @param figura - La figura a guardar
   */
  guardarFigura(figura: Figura): void {
    if (figura._id) {
      // Es una edición: realizar PUT
      this.figuraService.actualizarFigura(figura._id, figura).subscribe({
        next: () => {
          this.cargarFiguras(); // Recargar la lista
          this.mostrarFormulario = false;
          alert('Figura actualizada exitosamente');
        },
        error: (err) => {
          alert('Error al actualizar la figura: ' + err.error.message);
        }
      });
    } else {
      // Es una creación: realizar POST
      this.figuraService.crearFigura(figura).subscribe({
        next: () => {
          this.cargarFiguras(); // Recargar la lista
          this.mostrarFormulario = false;
          alert('Figura creada exitosamente');
        },
        error: (err) => {
          alert('Error al crear la figura: ' + err.error.message);
        }
      });
    }
  }

  /**
   * eliminarFigura()
   * Elimina una figura después de confirmar con el usuario.
   * 
   * @param figura - La figura a eliminar
   */
  eliminarFigura(figura: Figura): void {
    if (figura._id && confirm('¿Estás seguro de que deseas eliminar esta figura?')) {
      this.figuraService.eliminarFigura(figura._id).subscribe({
        next: () => {
          this.cargarFiguras(); // Recargar la lista
          alert('Figura eliminada exitosamente');
        },
        error: (err) => {
          alert('Error al eliminar la figura: ' + err.error.message);
        }
      });
    }
  }

  /**
   * cerrarFormulario()
   * Oculta el formulario sin guardar cambios.
   */
  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.figuraEdicion = null;
  }
}
