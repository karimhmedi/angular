import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FilmFormComponent } from './film-form.component';

const routes: Routes = [
  {path: ':action', component: FilmFormComponent},
  {path: ':action/:filmId', component: FilmFormComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FilmFormRoutingModule { }
