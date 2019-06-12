import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `<div>
    <input type=button value="-" (click)="decrease()"/>
    <span>&nbsp;{{counter}}&nbsp;</span>
    <input type=button value="+" (click)="increase()"/>
  </div>`
})
export class CounterComponent implements OnInit {

  @Input() counter;
  @Output() counterChange;
  
  constructor() {
    this.counterChange = new EventEmitter();
   }

  ngOnInit() {
    this.counter = this.counter || 0;
    this.counterChange.emit(this.counter)
  }

  increase(){
    this.counter++;
    this.counterChange.emit(this.counter)
  }

  decrease(){
    this.counter--;
    this.counterChange.emit(this.counter)
  }

}
