// src/app/components/figura-form/figura-form.component.ts
// Componente formulario para crear o editar una figura.
// Recibe una figura como input y emite eventos de guardar o cancelar.
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Figura } from '../../services/figura.service';

@Component({
  selector: 'app-figura-form',
  templateUrl: './figura-form.component.html',
  styleUrls: ['./figura-form.component.css']
})
export class FiguraFormComponent implements OnInit {
  // Input: figura a editar (null si es creación nueva)
  @Input() figura: Figura | null = null;

  // Output: evento que emite cuando se guarda la figura
  @Output() guardar = new EventEmitter<Figura>();

  // Output: evento que emite cuando se cancela la edición
  @Output() cancelar = new EventEmitter<void>();

  // Grupo de control del formulario (FormGroup)
  // Maneja la validación y el estado de todos los campos
  formulario!: FormGroup;

  // Constructor: inyectamos FormBuilder para crear el formulario reactivo
  constructor(private fb: FormBuilder) {}

  /**
   * ngOnInit()
   * Hook de Angular que se ejecuta al inicializar el componente.
   * Crea el formulario y lo llena con datos si es edición.
   */
  ngOnInit(): void {
    this.crearFormulario();
    this.llenarFormulario();
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
      imagen: ['']
    });
  }

  /**
   * llenarFormulario()
   * Si se está editando una figura, rellena el formulario con sus datos.
   */
  llenarFormulario(): void {
    if (this.figura && this.figura._id) {
      // Si figura tiene _id, es edición
      this.formulario.patchValue({
        nombre: this.figura.nombre,
        anime: this.figura.anime,
        personaje: this.figura.personaje || '',
        precio: this.figura.precio || 0,
        stock: this.figura.stock || 0,
        imagen: this.figura.imagen || ''
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
    // Verificar que el formulario sea válido
    if (this.formulario.invalid) {
      alert('Por favor completa todos los campos requeridos correctamente.');
      return;
    }

    // Obtener los valores del formulario
    const formValues = this.formulario.value;

    // Crear un objeto Figura con los datos
    const novaFigura: Figura = {
      nombre: formValues.nombre,
      anime: formValues.anime,
      personaje: formValues.personaje || undefined,
      precio: formValues.precio || 0,
      stock: formValues.stock || 0,
      imagen: formValues.imagen || undefined
    };

    // Si es edición, incluir el _id original
    if (this.figura && this.figura._id) {
      novaFigura._id = this.figura._id;
    }

    // Emitir evento al componente padre con la figura a guardar
    this.guardar.emit(novaFigura);
  }

  /**
   * onCancelar()
   * Se ejecuta cuando se hace clic en el botón "Cancelar".
   * Emite el evento 'cancelar' al componente padre.
   */
  onCancelar(): void {
    this.cancelar.emit();
  }
}
