import { NgModule } from '@angular/core';
//import { BrowserModule } from '@angular/platform-browser';
//import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FilmFormRoutingModule } from './film-form-routing.module';


@NgModule({
  declarations: [],
  imports: [
    //BrowserModule,
    //CommonModule,
    FilmFormRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class FilmFormModule { }
