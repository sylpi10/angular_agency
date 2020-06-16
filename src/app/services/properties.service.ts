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
      surface: '120',
      nbRooms: '4',
      price: '240',
      sold: true
    },
    {
      title: 'Amazing appartment',
      category: 'Appartment',
      surface: '240',
      nbRooms: '7',
      price: '360',
      sold: false
    },{
      title: 'Amazing Ranch',
      category: 'Ranch',
      surface: '80',
      nbRooms: '2',
      price: '4600',
      sold: true
    }
  ];

  propertiesSubject = new Subject<any[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties)
  }

  createProperties(property){
    this.properties.push(property)
  }

  deleteProperty(index){
    this.properties.splice(index, 1);
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
