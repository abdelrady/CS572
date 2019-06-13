import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'smart',
  template: `<div>
  <ul>
    <dumb *ngFor="let item of data" [item]=item></dumb>
  </ul>
</div>`
})
export class SmartComponent implements OnInit {
  data;

  constructor() {
    this.data = ['apple', 'banana', 'orange'];
   }

  ngOnInit() {
  }
}
