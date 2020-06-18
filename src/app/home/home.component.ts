import {Component, OnDestroy, OnInit} from '@angular/core';
import {PropertiesService} from "../services/properties.service";
import {error} from "@angular/compiler/src/util";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  properties = [];
  propertiesSubscription: Subscription;
  getSoldStatus(index){
    return this.properties[index].sold ? '#ec4e4e' : '#37ac29';
  }


  constructor(
    private propertiesService: PropertiesService
  ) { }

  ngOnInit(): void {
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties()
    this.propertiesService.emitProperties()
  }
  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe()
  }

  onGoToDetail(index){

  }
}
