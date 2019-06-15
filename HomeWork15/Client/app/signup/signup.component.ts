import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

import {Observable} from 'rxjs'
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder,
  FormArray
} from "@angular/forms";
import { DataApiService } from '../data-api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent implements OnInit {
  myForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService : DataApiService, private router: Router) {

    this.myForm = formBuilder.group({
      'userData': formBuilder.group({
        'firstname': ['', [Validators.required]],
        'lastname': ['', [Validators.required]],
        'email': ['', [
          Validators.required,
          Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
        ]]
      }),
      'password': ['', Validators.required],
      'confirmpassword': ['', Validators.required, this.matchOtherValidator('password')]
    });

    this.myForm.valueChanges.subscribe(
      (data: any) => console.log(data)
    );

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.myForm);
    if(!this.myForm.errors){
      this.dataService.signup(this.myForm.value)
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['/login'])
      }, (err) => console.log(err));
    }
  }

  matchOtherValidator(otherControlName: string) {

    let thisControl: FormControl;
    let otherControl: FormControl;

    return function matchOtherValidate(control: FormControl): Promise<any> | Observable<any> {
      return new Promise<any>((resolve, reject) => {
          setTimeout(() => {

            if (!control.parent) {
              resolve(null);
            }

            // Initializing the validator.
            if (!thisControl) {
              thisControl = control;
              otherControl = control.parent.get(otherControlName) as FormControl;
              if (!otherControl) {
                reject(new Error('matchOtherValidator(): other control is not found in parent group'));
              }
              otherControl.valueChanges.subscribe(() => {
                thisControl.updateValueAndValidity();
              });
            }

            if (!otherControl) {
              resolve(null);
            }

            if (otherControl.value !== thisControl.value) {
              resolve({
                matchOther: true
              });
            }

            resolve(null);

          }, 200);
        })
    }

  }
}
