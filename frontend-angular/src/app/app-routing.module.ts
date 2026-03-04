import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiguraListComponent } from './components/figura-list/figura-list.component';
import { FiguraFormComponent } from './components/figura-form/figura-form.component';
import { FiguraDetailComponent } from './components/figura-detail/figura-detail.component';

const routes: Routes = [
  { path: '', redirectTo: 'figuras', pathMatch: 'full' },

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
