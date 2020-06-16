import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  onSubmitPropertiesForm(form: NgForm){
    const title = form.value['title']
    console.log(form.value);
    alert(title)
  }

}
