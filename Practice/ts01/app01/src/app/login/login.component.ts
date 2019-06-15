import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataApiService) {

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
        .subscribe((data) => console.log(data), (err) => console.log(err));
        // TODO redirect to /protected
    }
  }

}
