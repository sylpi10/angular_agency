import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {PropertiesService} from "../../services/properties.service";
import {Subscription} from "rxjs";
import * as $ from 'jquery';
import {Property} from "../../interface/property";

@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit {
  propertiesForm: FormGroup;
  propertiesSubscription: Subscription;
  properties: Property[] = [];

  indexToRemove;
  indexToUpdate;

  editMode:boolean = false;

  photoUploading: boolean = false;
  photoUploaded: boolean = false;
  photoUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.initPropertiesForm();
    this.propertiesService.propertiesSubject.subscribe(
      (data:Property[]) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  initPropertiesForm(){
    this.propertiesForm = this.formBuilder.group({
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      nbRooms: '',
      description: '',
      price: '',
      sold: ''
    });
  }

  onSubmitPropertiesForm(){
      const newProperty: Property = this.propertiesForm.value;
      newProperty.sold = this.propertiesForm.get('sold').value ? this.propertiesForm.get('sold').value : false;
      newProperty.photo = this.photoUrl ? this.photoUrl : '';
      if (this.editMode){
        this.propertiesService.updateProperty(newProperty, this.indexToUpdate)
      }else
        this.propertiesService.createProperties(newProperty)
      $('#properties-form').modal('hide');
      // this.propertiesForm.reset();
  }

  resetForm(){
    this.editMode= false;
    this.propertiesForm.reset();
    this.photoUrl = '';
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

  onEditProperty(property: Property){
    this.editMode = true;
    $('#properties-form').modal('show');
    this.propertiesForm.get('title').setValue(property.title)
    this.propertiesForm.get('category').setValue(property.category)
    this.propertiesForm.get('surface').setValue(property.surface)
    this.propertiesForm.get('nbRooms').setValue(property.nbRooms)
    this.propertiesForm.get('description').setValue(property.description)
    this.propertiesForm.get('price').setValue(property.price)
    this.propertiesForm.get('sold').setValue(property.sold)
    this.photoUrl = property.photo ? property.photo : '';

    const index = this.properties.findIndex(
      (propertyEl) =>{
        if (propertyEl === property){
          return true;
        }
     }
    );
    this.indexToUpdate = index;
  }

  onUploadFile(event){
    this.photoUploading = true;
    console.log(event)
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
        setTimeout(()=> {
          this.photoUploaded = false;
        }, 5000);
      }
    );
  }

}
