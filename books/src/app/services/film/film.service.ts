import { Injectable } from '@angular/core';
import { Film } from '../../models/film.model'
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FilmService {

  films:Observable<Film[]>;
  filmscollection:AngularFirestoreCollection<Film>;

  constructor(private afs: AngularFirestore, private router: Router) { }

  addfilm(film:Film)
  {
    return new Promise<any>((resolve,rejects)=>{this.afs.collection('film')
    .add(film).then(res=>{
      this.router.navigate(['/film/film-list']);
    }, err=> {
      rejects(err);
      window.alert(err.message);
    });
  });

  }

  getfilms(): Observable<Film[]>
  {
    this.filmscollection=this.afs.collection('film');
    return this.films=this.filmscollection.valueChanges();

  }


}
