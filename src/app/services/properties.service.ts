import { Injectable } from '@angular/core';
import {Observable, Subject} from "rxjs";
import {Property} from "../interface/property";
import * as firebase from "firebase";

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];

  propertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties(){
    this.propertiesSubject.next(this.properties)
  }

  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties(){
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }

  createProperties(property: Property){
    this.properties.push(property)
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index){
    this.properties.splice(index, 1);
    this.saveProperties();
    this.emitProperties();
  }

  updateProperty(property: Property, index){
    // this.properties[index] = property;
    // this.saveProperties();
    // this.emitProperties();
    firebase.database().ref('/properties/' + index).update(property).catch(
      (error) => {
        console.error(error)
      }
    );
  }

  uploadFile(file: File){
    return new Promise(
      (resolve, reject) => {
        const uniqId = Date.now().toString();
        const fileName = uniqId + file.name;
        const upload = firebase.storage().ref().child('images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('loading ...')
          },
          (error) => {
            console.error(error);
            reject(error)
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downloadUrl) => {
                resolve(downloadUrl);
              }
            );
          }
        );
      }
    );
  }

  removeFile(fileLink: string){
    if (fileLink){
      const storageRef = firebase.storage().refFromURL(fileLink);
      storageRef.delete().then(
        () => {
          console.log('file deleted')
        }
      ).catch(
        (error) => {
          console.error(error)
        }
      )
    }
  }

  // getProperties(){
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
  // }
}
