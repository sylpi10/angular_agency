import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties = [
    {
      title: 'Amazing house',
      category: 'House',
      sold: true
    },
    {
      title: 'Amazing appartment',
      category: 'Appartment',
      sold: false
    },{
      title: 'Amazing Ranch',
      category: 'Ranch',
      sold: true
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties)
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
