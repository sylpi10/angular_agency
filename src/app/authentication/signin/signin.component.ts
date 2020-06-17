import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.initSigninForm();
  }

  initSigninForm(){
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmitSigninForm(){
    const email = this.signinForm.get('email').value;
    const password = this.signinForm.get('password').value;
    // password === passwordConfirm ? execute logic : error;  //-> if confirm password
   this.authenticationService.signUpUser(email, password).then(
     () => {
       alert('ok')
     }
   ).catch(
     (error) => {
       alert('error')
     }
   )
  }
}
