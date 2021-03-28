import { Injectable } from '@angular/core';
import { Film } from '../../models/film.model';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { take, finalize, map } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/storage';



@Injectable({
  providedIn: 'root'
})
export class FilmService {

  films:Observable<Film[]>;
  filmDocument:AngularFirestoreDocument<Film>;
  filmscollection:AngularFirestoreCollection<Film>;
  downloadURL=new Subject<string>();

  constructor(
    private afs: AngularFirestore,
    private storage: AngularFireStorage,
    private router: Router,
     ) { }

     pushFileToStorage(file: File): Observable<number>
     {
       const basePath='images';
       const filePath=`${basePath}/${file.name}`;
       const storageRef=this.storage.ref(filePath);
       const uploadTask=this.storage.upload(filePath,file);

       uploadTask.snapshotChanges().pipe(
        finalize(() => {
          storageRef.getDownloadURL().subscribe(downloadURL => {
           this.downloadURL.next(downloadURL);
          });
        })
      ).subscribe();
    
      return uploadTask.percentageChanges();
       
     }
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
    return this.films = this.filmscollection.snapshotChanges().pipe(map(actions => {
      return actions.map(a => {
        const data: Film = a.payload.doc.data();
        const id: string = a.payload.doc.id;
        data.id=id;
        return (data);
      });
    }));

  }

  getFilmById(filmId:string): Observable<Film>
  {
    
    const filmPath = `film/${filmId}`;
    this.filmDocument=this.afs.doc(filmPath);
    return this.filmDocument.valueChanges();
  }

  updateFilm(filmForm)
  {
    return new Promise<any>((resolve,reject)=>
    {
      this.afs.collection('film').doc(filmForm.id).update(filmForm).then(res=>{
        this.router.navigate(['/film/film-list']);        
      },
      err =>
      {
        reject(err);
        window.alert(err.message);
      });
    }

    )
  }

  deleteFilm(filmId)
  {
    const filmPath = `film/${filmId}`;
    this.filmDocument=this.afs.doc(filmPath);
    return this.filmDocument.delete();
  }

}
