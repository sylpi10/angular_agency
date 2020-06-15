import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'myAgency';

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

  getSoldStatus(index){
    return this.properties[index].sold ? '#ec4e4e' : '#37ac29';
  }
}
