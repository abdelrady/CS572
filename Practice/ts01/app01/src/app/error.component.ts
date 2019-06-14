import { Component } from '@angular/core';
import { DataService } from './data.service';

@Component({
  selector: 'app-root',
  template: `Error resource not found`
})
export class AppComponent {
  title = 'app01';

  constructor(private dataService : DataService){
      dataService.getOnlineData();
  }

}
