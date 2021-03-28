import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import {BrowserModule} from '@angular/platform-browser';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import { FilmRoutingModule } from './film-routing.module';
import { FilmListModule } from './film-list/film-list.module';
import { FilmFormModule } from './film-form/film-form.module';
import { FilmFormComponent } from './film-form/film-form.component';
import { FilmListComponent } from './film-list/film-list.component';


@NgModule({
  declarations: [FilmFormComponent, FilmListComponent],
  imports: [
    CommonModule,
//    BrowserAnimationsModule,
    FilmRoutingModule,
    FilmListModule,
    FilmFormModule,
    FormsModule,
 //   BrowserModule,
    ReactiveFormsModule
  ]
})
export class FilmModule { }
