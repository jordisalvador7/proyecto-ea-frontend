import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { IRegisterDto } from '../models/Dtos/IRegisterDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {
  registerDto: IRegisterDto = {
    Username: '',
    Email: '',
    Password: ''
  }

  getHome = () => {

  }

  
  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }
    
    ngOnInit() {}
    
    // validateInputs() {
  //   console.log(this.registerData);
  //   let username = this.registerData.Username.trim();
  //   let password = this.registerData.Password.trim();
  //   let email = this.registerData.Email.trim();
  //   return (
  //   this.registerData.Username &&
  //   this.registerData.Password &&
  //   this.registerData.Email &&
  //   username.length > 0 &&
  //   email.length > 0 &&
  //   password.length > 0
  //   );
  // }

 registerAction(){
    console.log(this.registerDto);
    this.authService.register(this.registerDto);
    // if(this.validateInputs()){
    //   console.log(this.registerData);
    // }
    // else{
    //   console.log('Fill all the fields please');
    // }
  }

  /*POST: add a new hero to the database 
  addUser (hero: Hero): Observable<Hero> {
  return this.http.post<Hero>(this.heroesUrl, hero, httpOptions)
    .pipe(
      catchError(this.handleError('addHero', hero))
    );
}*/

}

const rememberUser : JSON = <JSON><unknown>{
  "username" : this.postData.value.Username,
  "password" : this.postData.value.Password,
  "email" : this.postData.value.Email  
}

