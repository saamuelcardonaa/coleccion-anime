// src/main.ts
// Punto de entrada de la aplicación Angular.
// Este archivo bootstrap el módulo raíz (AppModule) cuando la app inicia.

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';

// Bootstrap la aplicación cargando el AppModule
// platformBrowserDynamic() crea un compilador para navegador
// .bootstrapModule(AppModule) carga el módulo raíz
platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));
