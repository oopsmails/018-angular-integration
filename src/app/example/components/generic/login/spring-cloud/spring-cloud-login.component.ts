import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { SpringCloudLoginService } from './spring-cloud-login.service';
import { SpringCloudLoginFormData } from '@app/shared/model/spring-cloud-login-form-data';
import { ClientType } from '@app/shared/services/user-token/user-token.service';


@Component({
  selector: 'app-spring-cloud-login',
  templateUrl: './spring-cloud-login.component.html',
  styleUrls: ['./spring-cloud-login.component.scss']
})
export class SpringCloudLoginComponent implements OnInit {

  loginForm: FormGroup;
  invalidLogin: boolean = false;
  loginData: any = {
    username: 'user',
    password: 'password'
  }

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private springCloudLoginService: SpringCloudLoginService) { }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    const httpParams = new HttpParams()
      .set('username', this.loginForm.controls.username.value)
      .set('password', this.loginForm.controls.password.value)
      .set('grant_type', 'password');

    // following is working version 0
    // this.springCloudLoginService.login(httpParams.toString())
    //   .subscribe(
    //     data => {
    //       window.sessionStorage.setItem('token', JSON.stringify(data));
    //       console.log(window.sessionStorage.getItem('token'));
    //       this.router.navigate(['example/employees']);
    //     }, error => {
    //       alert(error.error.error_description)
    //     });

    const loginPayload = new SpringCloudLoginFormData();
    loginPayload.username = this.loginForm.controls.username.value;
    loginPayload.password = this.loginForm.controls.password.value;
    loginPayload.grant_type = 'password';
    
    this.springCloudLoginService.getUserToken(loginPayload, ClientType.SPRING_CLOUND_EMPLOYEE_SERVICE)
      .subscribe(
        data => {
          window.sessionStorage.setItem('token', JSON.stringify(data));
          console.log(window.sessionStorage.getItem('token'));
          this.router.navigate(['example/employees']);
        }, error => {
          alert(error.error.error_description)
        });
  }

  ngOnInit() {
    window.sessionStorage.removeItem('token');
    this.loginForm = this.formBuilder.group({
      username: [this.loginData.username, Validators.compose([Validators.required])],
      password: [this.loginData.password, Validators.required]
    });
  }

}
