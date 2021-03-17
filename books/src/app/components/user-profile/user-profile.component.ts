import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: any;

  constructor(private authservie: AuthService) { }

  ngOnInit(): void {
    const userStored= JSON.parse(localStorage.getItem('user'));
      this.user=userStored;      
    console.log("kimo",this.user);
  }

  signOut()
  {
    this.authservie.signOut();
  }

}
