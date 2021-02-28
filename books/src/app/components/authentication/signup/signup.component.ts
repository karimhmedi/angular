import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from "@angular/router";
import { AuthService } from 'src/app/services/auth/auth.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = false;

constructor(private formBuilder: FormBuilder,
  private route: ActivatedRoute,
  private router: Router,
  private authservice: AuthService
  ) { }

ngOnInit(): void {

  this.signUpForm = this.formBuilder.group({
    username: ['',Validators.required],  
    email: ['',[Validators.required,Validators.email]],      
  password: ['', [Validators.required, Validators.pattern('[0-9a-zA-Z]{6,}')]] 
  });
}

get f() { return this.signUpForm.controls; }

onSubmit() {
this.authservice.createNewUser(this.signUpForm.value).then(()=>{
  console.log("success registration");
  this.router.navigate(['/signin']);
}).catch(err=>{console.log('erreur enregistrement', err)})


}

}
