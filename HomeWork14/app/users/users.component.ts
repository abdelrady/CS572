import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  template: `<ul>
    <li *ngFor="let user of (users | async).results">
      <a [routerLink]="['userDetails', user.login.uuid]">{{user.name.first}}</a>
    </li>
  </ul>`
})
export class UsersComponent implements OnInit {

  users;

  constructor(private dataService : DataService) { }

  ngOnInit() {
    this.users = this.dataService.getCachedData();
  }

}
