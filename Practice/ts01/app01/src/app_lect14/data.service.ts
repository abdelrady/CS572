import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "https://randomuser.me/api/?results=10";
  dataKey = 'users';

  constructor(private http: HttpClient, private router: Router) { }

  getData(): any {
    this.http.get(this.url);
  }

  getOnlineData() {
    this.http.get(this.url).subscribe((data) => {
      localStorage.setItem('users', JSON.stringify(data));
    });
  }

  getCachedData() {
    return of(JSON.parse(localStorage.getItem(this.dataKey)))
      .pipe(shareReplay(1));
  }

  getUser(uuid) {
    return Observable.create((observer) => {
      let exist = JSON.parse(localStorage.getItem(this.dataKey)).results.filter(u => u.login.uuid == uuid).length > 0;
      console.log(exist);
      if (!exist) {
        this.router.navigate(['/error']);
      }
      observer.next(exist);
    })
  }

  // Another way
  // async getUser(uuid){
  //   let data = await (this.getCachedData().toPromise());
  //   return data.results.filter(u=>u.login.uuid==uuid).length > 0;
  // }
}
