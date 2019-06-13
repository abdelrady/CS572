import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<smart></smart>
  <span isVisible shouldShow="{{shouldShowSpan}}">This is shown using directive controlled from parent</span><br/><br/>
  <span makeBigger [ngStyle]="{'font-size': '14px'}">Click me to increase my font size</span><br/><br/>
  <span>{{'RepeatMe4Times' | multi: 4}}</span><br/><br/>
  `
})
export class AppComponent {
  title = 'app02';
  shouldShowSpan = true;
}
