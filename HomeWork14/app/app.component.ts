import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `Root App<br/>
    <a [routerLink]="['users']">Users</a><br/><br/>
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  title = 'app01';

  constructor(private dataService : DataService){
      dataService.getOnlineData();
  }

}
