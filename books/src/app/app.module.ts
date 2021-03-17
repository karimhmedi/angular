import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AngularFireModule} from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule} from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { UserProfileModule } from './components/user-profile/user-profile.module';
import { HeaderComponent } from './components/header/header.component';
import { FilmModule } from './components/film/film.module';
@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "angular-auth-firebase"),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    UserProfileModule,
    FilmModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
