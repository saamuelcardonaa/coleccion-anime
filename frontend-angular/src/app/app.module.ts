// src/app/app.module.ts
// Módulo raíz de la aplicación Angular.
// Aquí se declaran todos los componentes, importan módulos y servicios.
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'; // Para peticiones HTTP
import { ReactiveFormsModule } from '@angular/forms';   // Para formularios reactivos
import { FormsModule } from '@angular/forms';           // Para two-way binding
import { AppRoutingModule } from './app-routing.module'; // Para el routing

import { AppComponent } from './app.component';
import { FiguraListComponent } from './components/figura-list/figura-list.component';
import { FiguraFormComponent } from './components/figura-form/figura-form.component';
import { JikanSearchComponent } from './components/jikan-search/jikan-search.component';

@NgModule({
  // Declaraciones: componentes que pertenecen a este módulo
  declarations: [
    AppComponent,
    FiguraListComponent,
    FiguraFormComponent,
    JikanSearchComponent
  ],

  // Importaciones: módulos externos que se necesitan
  imports: [
    BrowserModule,           // Módulo básico de Angular para navegador
    HttpClientModule,        // Necesario para HttpClient (peticiones HTTP)
    ReactiveFormsModule,     // Para formularios reactivos (FormBuilder, FormGroup)
    FormsModule,             // Para ngModel y two-way binding
    AppRoutingModule
  ],

  // Proveedores: servicios disponibles en toda la aplicación
  // HttpClientModule ya proporciona HttpClient
  providers: [],

  // Bootstrap: componente raíz que se carga en index.html
  bootstrap: [AppComponent]
})
export class AppModule { }
