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
import { FiguraDetailComponent } from './components/figura-detail/figura-detail.component';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    FiguraListComponent,
    FiguraFormComponent,
    FiguraDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    HomeComponent // Importar standalone component
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
