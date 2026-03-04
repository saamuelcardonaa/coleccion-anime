// src/app/components/figura-form/figura-form.component.ts
// Componente formulario para crear o editar una figura.
// Recibe una figura como input y emite eventos de guardar o cancelar.
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FiguraService, Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-form',
  templateUrl: './figura-form.component.html',
  styleUrls: ['./figura-form.component.css']
})
export class FiguraFormComponent implements OnInit {

  id: string | null = null;
  loading = false;
  error: string | null = null;
  success = false;

  // Grupo de control del formulario (FormGroup)
  // Maneja la validación y el estado de todos los campos
  formulario!: FormGroup;
  figura: Figura | null = null;

  // Constructor: inyectamos FormBuilder para crear el formulario reactivo
  constructor(
    private fb: FormBuilder,
    private figuraService: FiguraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  /**
   * ngOnInit()
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Crea el formulario y lo llena con datos si es edición.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loading = true;
      this.figuraService.getById(this.id).subscribe({
        next: (figura) => {
          this.figura = figura;
          this.llenarFormulario();
          this.loading = false;
        },
        error: (err) => {
          this.error = 'No se pudo cargar la figura.';
          this.loading = false;
        }
      });
    }
  }

  /**
   * crearFormulario()
   * Crea un FormGroup reactivo con validaciones.
   * 
   * FormControl(valor, validadores):
   * - Validators.required: el campo es obligatorio
   * - Validators.minLength(n): mínimo n caracteres
   * - Validators.min(n): valor mínimo n
   */
  crearFormulario(): void {
    this.formulario = this.fb.group({
      // Campo nombre: obligatorio, entre 3 y 100 caracteres
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

      // Campo anime: obligatorio, entre 3 y 100 caracteres
      anime: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],

      // Campo personaje: opcional
      personaje: [''],

      // Campo precio: opcional, mínimo 0
      precio: [0, [Validators.min(0)]],

      // Campo stock: opcional, mínimo 0 (debe ser un número entero)
      stock: [0, [Validators.min(0)]],

      // Campo imagen: opcional (URL)
      imagen: [''],
      malId: ['']
    });
  }

  /**
   * llenarFormulario()
   * Si se está editando una figura, rellena el formulario con sus datos.
   */
  llenarFormulario(): void {
    if (this.figura) {
      this.formulario.patchValue({
        nombre: this.figura.nombre,
        anime: this.figura.anime,
        personaje: this.figura.personaje || '',
        precio: this.figura.precio || 0,
        stock: this.figura.stock || 0,
        imagen: this.figura.imagen || '',
        malId: this.figura.malId || ''
      });
    }
  }

  /**
   * onSubmit()
   * Se ejecuta cuando se envía el formulario (clic en Guardar).
   * 
   * Cómo funciona:
   * 1. Valida que todos los campos requeridos estén completos
   * 2. Si es válido, crea un objeto Figura con los datos del formulario
   * 3. Si es edición, incluye el _id original
   * 4. Emite el evento 'guardar' al componente padre (figura-list)
   * 5. El componente padre llama a figuraService.crearFigura() o .actualizarFigura()
   */
  onSubmit(): void {
    if (this.formulario.invalid) {
      this.error = 'Por favor completa todos los campos requeridos correctamente.';
      return;
    }
    this.loading = true;
    this.error = null;
    this.success = false;
    const payload: Figura = this.formulario.value;
    if (this.id) {
      // Editar
      this.figuraService.update(this.id, payload).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.router.navigate(['/figuras']);
        },
        error: (err) => {
          this.error = 'Error al actualizar la figura.';
          this.loading = false;
        }
      });
    } else {
      // Crear
      this.figuraService.create(payload).subscribe({
        next: () => {
          this.success = true;
          this.loading = false;
          this.router.navigate(['/figuras']);
        },
        error: (err) => {
          this.error = 'Error al crear la figura.';
          this.loading = false;
        }
      });
    }
  }

  /**
   * onCancelar()
   * Se ejecuta cuando se hace clic en el botón "Cancelar".
   * Emite el evento 'cancelar' al componente padre.
   */
  onCancelar(): void {
    this.router.navigate(['/figuras']);
  }
}
