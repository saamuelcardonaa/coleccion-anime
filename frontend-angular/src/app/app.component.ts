// src/app/app.component.ts
// Componente raíz de la aplicación Angular.
// Este es el componente que se carga primero en index.html.
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // El componente principal es simple, solo carga app-figura-list
  title = 'Colección de Figuras de Anime';
}
