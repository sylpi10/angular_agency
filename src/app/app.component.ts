import { Component} from "@angular/core";
import construct = Reflect.construct;
import * as firebase from "firebase";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'myAgency';

  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyC2MsgS2KUV9h2uL88nxCia9mOHmF074Ww",
      authDomain: "myagency-ad743.firebaseapp.com",
      databaseURL: "https://myagency-ad743.firebaseio.com",
      projectId: "myagency-ad743",
      storageBucket: "myagency-ad743.appspot.com",
      messagingSenderId: "747603464927",
      appId: "1:747603464927:web:92f700694063e241574f6a"
    };
    firebase.initializeApp(firebaseConfig)
  }

}
