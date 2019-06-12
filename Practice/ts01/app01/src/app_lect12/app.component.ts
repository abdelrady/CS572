import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <div style="text-align:center">
    <h1>
      Welcome to {{ title }}!
    </h1>
    The following has no inputs/outputs passed
    <app-counter></app-counter>
    <app-counter [counter]="componentCounterValue" (counterChange)="componentCounterChanged($event)"></app-counter>
    We got this from child counter #2 component {{componentCounterValue}}
    <br/>
    <app-counter [counter]="component3CounterValue" (counterChange)="component3CounterChanged($event)"></app-counter>
    We got this from child counter #3 component {{component3CounterValue}}
  </div>
  `
})
export class AppComponent {
  title = 'Angular Framework!';
  componentCounterValue = 4;
  component3CounterValue = 17;

  componentCounterChanged(newCounterValue){
    this.componentCounterValue = newCounterValue;
  }

  component3CounterChanged(newCounterValue){
    this.component3CounterValue = newCounterValue;
  }

}
