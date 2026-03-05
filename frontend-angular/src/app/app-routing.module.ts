import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiguraListComponent } from './components/figura-list/figura-list.component';
import { FiguraFormComponent } from './components/figura-form/figura-form.component';
import { FiguraDetailComponent } from './components/figura-detail/figura-detail.component';
// Importación añadida para HomeComponent (home)
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  // Ahora la ruta '' carga HomeComponent en vez de redirigir a /figuras
  { path: '', component: HomeComponent },

  { path: 'figuras', component: FiguraListComponent },
  { path: 'figuras/nueva', component: FiguraFormComponent },
  { path: 'figuras/editar/:id', component: FiguraFormComponent },
  { path: 'figuras/:id', component: FiguraDetailComponent },

  { path: '**', redirectTo: 'figuras' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
