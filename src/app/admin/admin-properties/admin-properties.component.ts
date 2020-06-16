import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PropertiesService} from "../../services/properties.service";
import {Subscription} from "rxjs";
import * as $ from 'jquery';

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: any[] = [];
  indexToRemove;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data) => {
        this.properties = data;
      }
    );
    this.propertiesService.emitProperties()
  }

  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      nbRooms: '',
      description: '',
      price: ''
    });
  }

  onSubmitPropertiesForm(){
      const newProperty = this.propertiesForm.value;
      this.propertiesService.createProperties(newProperty)
      $('#properties-form').modal('hide');
      this.propertiesForm.reset();
  }

  resetForm(){
    this.propertiesForm.reset();
  }

  onDeleteProperty(index){
      $('#confirmDelete').modal('show');
      // this.propertiesService.deleteProperty(index);
      this.indexToRemove = index;
  }

  onConfirmDeleteProperty(){
    this.propertiesService.deleteProperty(this.indexToRemove)
    $('#confirmDelete').modal('hide');
  }
}
