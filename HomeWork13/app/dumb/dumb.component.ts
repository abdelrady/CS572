import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'dumb',
  template: `
  <li>{{item}}</li>
  `,
  styles: ['li{color: green}']
})
export class DumbComponent implements OnInit {

  @Input() item;
  
  constructor() {
   }

  ngOnInit() {
  }
}
