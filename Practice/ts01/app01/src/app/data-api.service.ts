import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataApiService {
  
  apiUrl = "http://localhost:8080/api/";

  signup(data: any) : Observable<any> {
    return this.http.post(this.apiUrl + "signup", data);
  }

  
  login(data: any) : Observable<any> {
    return this.http.post(this.apiUrl + "login", data);
  }


  constructor(private http : HttpClient) { }
}
