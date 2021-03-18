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
  constructor(
    private fb : FormBuilder,
    private route: ActivatedRoute,
    private filmservice: FilmService
    ) { }

  ngOnInit(): void {


    this.route.paramMap.pipe(
      filter( p=>!p.has('filmId')),
      tap(p=>{
        this.action=p.get('action') as FormAction
        this.initForm();
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
this.filmservice.addfilm(this.filmForm.value);
  }

  ngOnDestroy()
  {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
