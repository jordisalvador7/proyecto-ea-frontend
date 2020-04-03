import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { StorageService } from './storage.service';
import { IRegisterDto } from '../models/Dtos/IRegisterDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ILoginDto } from '../models/Dtos/ILoginDto';
// import { NavController } from 'ionic-angular';

@Injectable({
providedIn: 'root'
})
export class AuthService {
constructor(
  private http: HttpClient,
  private storageService: StorageService,
  private router: Router
) {}

url: string = 'http://localhost:3700/auth';
registerDto: IRegisterDto = {
  Username: '',
  Email: '',
  Password: ''
}
register = (dto: IRegisterDto) => {
  console.log(`Sending: ${dto}`);
  this.http.post<any>(this.url+'/register', dto)
    .subscribe( res => { console.log(res) });
}
loginReq = (dto: ILoginDto) => {
  const responseType =  { responseType: 'text' as 'json' };
  console.log(`Sending: ${dto}`);
  this.http.post<any>(this.url+'/login', dto, responseType)
    .subscribe( res => { 
      console.log(res);
      this.storageService.storeToken(res);
      // this.navCtrl.setRoot(anOtherPage);
     });
}


// login(postData: any): Observable<any> {
// return this.httpService.post('login', postData);
// }

// signup(postData: any): Observable<any> {
// return this.httpService.post('signup', postData);
// }

/*logout() {
this.storageService.removeStorageItem(AuthConstants.AUTH).then(res => {
  this.router.navigate(['']);
});
}*/
}