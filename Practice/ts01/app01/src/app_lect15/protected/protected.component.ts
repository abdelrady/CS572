import { Component, OnInit } from '@angular/core';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-protected',
  templateUrl: './protected.component.html',
  styleUrls: ['./protected.component.css']
})
export class ProtectedComponent implements OnInit {
  data;

  constructor(private tokenService : TokenService) {
    this.data = tokenService.getUserInfo();
   }

  ngOnInit() {
  }

}
