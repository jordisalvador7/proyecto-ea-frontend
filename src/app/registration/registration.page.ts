import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  postData = {
    Username: '',
    Email: '',
    Password: ''
  };

  
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {}

  validateInputs() {
    console.log(this.postData);
    let username = this.postData.Username.trim();
    let password = this.postData.Password.trim();
    let email = this.postData.Email.trim();
    return (
    this.postData.Username &&
    this.postData.Password &&
    this.postData.Email &&
    username.length > 0 &&
    email.length > 0 &&
    password.length > 0
    );
  }

  registerAction(){
    if(this.validateInputs()){
      console.log(this.postData);
    }
    else{
      console.log('Fill all the fields please');
    }

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

