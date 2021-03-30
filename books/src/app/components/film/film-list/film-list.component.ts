import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Film } from 'src/app/models/film.model';
import { FilmService } from 'src/app/services/film/film.service';

@Component({
  selector: 'app-film-list',
  templateUrl: './film-list.component.html',
  styleUrls: ['./film-list.component.css']
})
export class FilmListComponent implements OnInit {

  films:Film[];
  isLoading=true;
  constructor(private filmservice:FilmService)
  {

  }

  ngOnInit(): void {
    this.filmservice.getfilms().pipe(tap(films=>      
      {
        this.films=films;
        console.log('filmss',films);
        this.isLoading=false;
      })
    ).subscribe();
  }

  deleteFilm(filmId)
  {
this.filmservice.deleteFilm(filmId);
  }

}
