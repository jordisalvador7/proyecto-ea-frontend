import { Injectable } from '@angular/core';
import { IRegisterDto } from '../../models/Dtos/IRegisterDto';
import { ILoginDto } from '../../models/Dtos/ILoginDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';
import { API_URL } from 'src/environments/custom';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = API_URL + '/auth';
  private header: HttpHeaders;
  private loginRedirect: string;
  private profileRedirect: string;

  constructor(private http: HttpClient, 
    private storageService: StorageService,
    private httpService: HttpService,
    private router: Router) {
      this.loginRedirect = '/profile';
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        responseType: 'json'
      });
     }

  register = (dto: IRegisterDto) => {
    this.http.post(`${this.URL}/login`, dto, { headers: this.header })
      .subscribe( res => { 
        console.log(res);
        const token: string = res['auth-token'];
        this.storageService.storeToken(token).then(_ => this.router.navigateByUrl(this.loginRedirect));
      }, error => {
        console.log(error);
        alert(error.error);
      });
  }

  login = (dto: ILoginDto) => {
    console.log('Login IN');
    this.http.post(`${this.URL}/login`, dto, { headers: this.header })
    .subscribe(res => {
      const token: string = res['auth-token'];
      this.storageService.storeToken(token).then(_ => this.router.navigateByUrl(this.loginRedirect));
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }

  oauthLogin = () => {
    console.log('Oauth Login IN');
    this.http.get<auth>('http://localhost:3700/oauth/facebook/callback').subscribe((auth: auth) => {
      console.log('TOKEN');
      console.log(auth);
    })
  } 

}
interface auth {
  authToken: string,
}
