import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument} from '@angular/fire/firestore'
import { User } from './../../models/user.model';
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { Router, ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, 
   
    private router: Router, ) { 

this.afAuth.authState.subscribe(user=>{
if(user)
 {
   localStorage.setItem('user',JSON.stringify(user));
   
 }
 else{
  localStorage.setItem('user',null);
 }

});

    }


    ngOnInit(): void {
    
  alert(this.isLoggedIn);
}

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


  setUserData(user, userName?)
  {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc('user/${user.uid}');
    const userData: User = {
    id: user.uid,
    email: user.email,
    userName: userName || user.displayName

    }
    return userRef.set(userData, {merge:true} );
  }


 get isLoggedIn(): boolean
  {
    const user= JSON.parse(localStorage.getItem('user'));
    return (user !== null)? true : false
  }


  signOut()
  {
    return this.afAuth.signOut()
    .then(()=>{
      localStorage.removeItem('user');
this.router.navigate(['/signin']);
    }).catch((error)=> {
      window.alert(error.message);
    
    });
  }

  signIn(signInForm)
  {
    return this.afAuth.signInWithEmailAndPassword(signInForm.email, signInForm.password)
    .then((result)=>{
this.router.navigate(['/user-profile']);
    }).catch((error)=> {
      window.alert(error.message);
    
    });
    
  }



  signInWithPopup(signInForm)
  {
    return this.afAuth.signInWithEmailAndPassword(signInForm.email, signInForm.password)
    .then((result)=>{
this.router.navigate(['/user-profile']);
    }).catch((error)=> {
      window.alert(error.message);
    
    });
    
  }

  signInWithGoogle()
  {

   return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then((result)=>{
      this.setUserData(result.user);
this.router.navigate(['/user-profile']);
    }).catch((error)=> {
      window.alert(error.message);
    
    });

  }

}
