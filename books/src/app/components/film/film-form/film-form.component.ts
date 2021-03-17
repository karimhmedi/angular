import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

type FormAction= 'add' | 'edit';

@Component({
  selector: 'app-film-form',
  templateUrl: './film-form.component.html',
  styleUrls: ['./film-form.component.css']
})
export class FilmFormComponent implements OnInit {

  action: FormAction;
  filmForm : FormGroup;
  constructor(private fb : FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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

  }
}
