import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PropertiesService} from "../services/properties.service";
import {Property} from "../interface/property";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {

  property: Property;

  constructor(
    private route: ActivatedRoute,
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.propertiesService.getSingleProperty(id).then(
      (property: Property) => {
        this.property = property
      }
    ).catch(
      (error) =>{
        console.error(error);
      }
    );
  }

}
