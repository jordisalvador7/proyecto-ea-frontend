import { ToastService } from './../services/toast.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { HttpClient } from  '@angular/common/http';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public postData = {
    header: 'auth-token',
    username : '',
    password : ''
  }

  constructor(
    private router: Router,
    private authService: AuthService,
    private storageService: StorageService,
    private toastService: ToastService,
    private http: HttpClient
    ) { }

  ngOnInit() {
  }

  validateInputs(){
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();

    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0);
  }

  loginAction() {
    if(this.validateInputs()){
      console.log(this.postData);
    }
    else{
      console.log('Fill all the fields please');
    }
   
  }

}
