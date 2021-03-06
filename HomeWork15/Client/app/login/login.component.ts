import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import {Router} from "@angular/router"
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { DataApiService } from '../data-api.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;
  errorMessge = '';

  constructor(private formBuilder: FormBuilder, private dataService: DataApiService, private tokenService : TokenService, private router: Router) {
    this.myForm = formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
      ]],
      'password': ['', Validators.required]
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );

  }


  ngOnInit() {
  }


  onSubmit() {
    console.log(this.myForm);
    if (!this.myForm.errors) {
      this.dataService.login(this.myForm.value)
        .subscribe((data) => {
          console.log(data)
          if(data.success){
            this.tokenService.persist(data.token);
            this.router.navigate(['/protected'])
          }else{
            this.errorMessge = "Invalid credentials";
          }
        }, (err) => console.log(err));
    }
  }

}
