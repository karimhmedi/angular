import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil,tap } from 'rxjs/operators';
import { FilmService } from 'src/app/services/film/film.service';

type FormAction= 'add' | 'edit';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  action: FormAction;
  filmForm : FormGroup;
  destroy$= new Subject();
  percentage=null;
  currentFileUpload=null;
  filmId : string;
  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private filmservice: FilmService
    ) { }
  ngOnInit(): void {
    this.route.paramMap.pipe(
      filter( p=>!p.has('filmId')),
      tap(p=>{
        this.action=p.get('action') as FormAction;
        this.initForm();
      }),
      takeUntil(this.destroy$),
    ).subscribe();

    this.route.paramMap.pipe(
      filter( p=>p.has('filmId')),
      tap(p=>{
        console.log("pppppppp",p);
        this.action=p.get('action') as FormAction;      
        this.filmId=p.get('filmId');
        this.getFilmById(this.filmId);     
      }),
      takeUntil(this.destroy$),
    ).subscribe();
    

  }

  initForm()
  {
    this.filmForm=this.fb.group({
      title: ['', Validators.required],
      director: ['', Validators.required],
      synopsis: ['', Validators.required]
    }
    )
  }

  get f() {return this.filmForm.controls;}

  onSaveFilm()
  {
    let FilmForm= this.filmForm.value;

FilmForm.image =this.currentFileUpload;
switch(this.action)
{
  case 'add':
  this.filmservice.addfilm(this.filmForm.value);
  break;
  case 'edit':
  FilmForm.id = this.filmId;
  this.filmservice.updateFilm(FilmForm);
  break;
}

  }

  detectFiles(event)
  {
this.filmservice.pushFileToStorage(event.target.files[0]).subscribe(
  percentage=>{
  console.log('percentage',percentage);
  this.percentage=percentage;
  if(this.percentage===100)
  {
this.filmservice.downloadURL.pipe(takeUntil(this.destroy$)).subscribe(
  currentFileUpload => { 
    this.currentFileUpload=currentFileUpload;
  }
);
  }
}
);
  }

  getFilmById(filmId)
  {
this.filmservice.getFilmById(filmId).subscribe(film =>{
  this.filmForm=this.fb.group({
title:[film.title,Validators.required],
director:[film.director, Validators.required],
synopsis:film.synopsis
  });
  this.currentFileUpload=film.image;
});
  }

  ngOnDestroy()
  {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
