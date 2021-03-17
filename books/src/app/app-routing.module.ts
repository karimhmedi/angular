import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './services/gurad/auth.guard';
import { SigninComponent } from './components/authentication/signin/signin.component';
import { SignupComponent } from './components/authentication/signup/signup.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'signin',
    pathMatch: 'full',
  
  },
  {
    path: 'signin',
    component: SigninComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'user-profile', canActivate:[AuthGuard],
    loadChildren: () => import('./components/user-profile/user-profile.module').then(mod => mod.UserProfileModule)
  },
  {
    path: 'film', canActivate:[AuthGuard],
    loadChildren: () => import('./components/film/film.module').then(mod => mod.FilmModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
