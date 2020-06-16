import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Property} from "../interface/property";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties)
  }

  createProperties(property: Property){
    this.properties.push(property)
  }

  deleteProperty(index){
    this.properties.splice(index, 1);
    this.emitProperties();
  }

  updateProperty(property: Property, index){
    this.properties[index] = property;
    this.emitProperties();
  }


  getProperties(){

    // return new Promise(
    //   (resolve, reject) => {
    //     if (this.properties && this.properties.length > 0){
    //       resolve(this.properties)
    //     }else{
    //       const error = new Error('Properties does not exist')
    //       reject(error)
    //     }
    //   }
    // )
    // return new Observable((observer) => {
    //   if (this.properties && this.properties.length > 0){
    //       observer.next(this.properties)
    //     observer.complete()
    //   }else{
    //       const error = new Error('Properties does not exist')
    //       observer.error(error)
    //     }
    // });
  }
}
