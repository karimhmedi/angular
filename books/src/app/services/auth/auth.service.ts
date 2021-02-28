import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User } from './../../models/user.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore ) { }

  createNewUser(signUpForm)
  {
    return this.afAuth.createUserWithEmailAndPassword(signUpForm.email, signUpForm.password)
    .then((result)=>{
this.setUserData(result.user, signUpForm.username);
    }).catch((error)=> {
      console.log(signUpForm);
      console.log(error.message);
      window.alert(error.message);
    
    });
    
  }


  setUserData(user, userName)
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('user/${user.uid}');
    const userData: User = {
    id: user.uid,
    email: user.email,
    userName: userName

    }
    return userRef.set(userData, {merge:true} );
  }

}
