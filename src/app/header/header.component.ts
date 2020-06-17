import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../services/authentication.service";
import * as firebase from "firebase";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title: string = "My amazing agency";

  isLogged: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) =>{
        if (userSession){
          this.isLogged = true;
        }else{
          this.isLogged = false;
        }
      }
    )
  }


  onSignOutUser() {
    this.authenticationService.signOutUser();
    this.router.navigate(['/home'])
  }
}
