import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `Root App<br/>
  <a [routerLink]="['login']">Login</a><br/><br/>
  <a [routerLink]="['register']">Register</a><br/><br/>
  <router-outlet class="container"></router-outlet>
`,
styleUrls: [
  "../../node_modules/bootstrap/dist/css/bootstrap.min.css"
]
})
export class AppComponent {
  title = 'Lab 14 app';
}
