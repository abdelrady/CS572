import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-users',
  template: `<h2>User Details</h2>
  <div *ngIf="user">
  gender:{{user.gender}}<br/>
  first name: {{user.name.first}}<br/>
  last name: {{user.name.last}}<br/>
  email: {{user.email}}<br/>
  age: {{user.dob.age}}<br/>
  </div>
  `
})
export class UserDetailsComponent implements OnInit {
  uuid;
  user;

  constructor(private route : ActivatedRoute, private dataService : DataService) {
    route.params.subscribe(p=>{
      this.uuid = p['uuid'];
      dataService.getCachedData()
      .subscribe(d=>{
        this.user = d.results.filter(u=>u.login.uuid == this.uuid)[0];
      })
    });
   }

  ngOnInit() {
  }

}
