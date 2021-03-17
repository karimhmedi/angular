import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'film-list',
    loadChildren: () => import('./film-list/film-list.module').then(mod => mod.FilmListModule)
  },
  {
    path: 'film-form',
    loadChildren: () => import('./film-form/film-form.module').then(mod => mod.FilmFormModule)
  },
  { path: '', redirectTo: 'film-list', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmRoutingModule { }
