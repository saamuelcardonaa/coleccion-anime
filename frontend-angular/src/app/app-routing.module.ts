import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FiguraListComponent } from './components/figura-list/figura-list.component';
import { FiguraFormComponent } from './components/figura-form/figura-form.component';
import { JikanSearchComponent } from './components/jikan-search/jikan-search.component';

const routes: Routes = [
  { path: '', component: FiguraListComponent },
  { path: 'crear', component: FiguraFormComponent },
  { path: 'jikan', component: JikanSearchComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
