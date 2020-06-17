import { Injectable } from '@angular/core';
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  signUpUser(email: string, password: string){
    return new Promise(
      (resolve, reject) => {
          firebase.auth().createUserWithEmailAndPassword(email, password).then(
            () => {
              alert('connected');
              resolve();
            }
          ).catch(
            (error) => {
              reject(error);
            }
          )
      }
    );
  }
}
