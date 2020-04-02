import { ToastService } from './../services/toast.service';
import { StorageService } from './../services/storage.service';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthConstants } from '../config/auth-constants';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { ILoginDto } from '../models/ILoginDto';
 
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  url: string = 'http://localhost:3700/auth/register';
  header = new HttpHeaders({'Content-Type':'application/json'});

  loginDto: ILoginDto = {
    Username: '',    
    Password: ''
  }

  loginReq = (dto: ILoginDto) => {
    console.log(`Sending: ${dto}`);
    this.http.post<any>(this.url, dto)
      .subscribe( res => { console.log(res) });
  }

  /*public postData = {
    header: 'auth-token',
    username : '',
    password : ''
  }*/

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  loginAction(){
    console.log(this.loginDto);
    this.loginReq(this.loginDto);
    
  }

  /*validateInputs(){
    let username = this.postData.username.trim();
    let password = this.postData.password.trim();

    return (
      this.postData.username &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0);
  }*/

  /*loginAction() {
    if(this.validateInputs()){
      console.log(this.postData);
    }
    else{
      console.log('Fill all the fields please');
    }
   
  }*/

}
