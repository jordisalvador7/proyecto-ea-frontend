import { Injectable } from '@angular/core';
import { IRegisterDto } from '../../models/dtos/IRegisterDto';
import { ILoginDto } from '../../models/dtos/ILoginDto';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';
import { HttpService } from '../http/http.service';
import { map } from 'rxjs/operators';
import { stringify } from 'querystring';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  URL: string = 'http://localhost:3700/auth';
  private header: HttpHeaders;
  private loginRedirect: string;

  constructor(private http: HttpClient, 
    private storageService: StorageService,
    private httpService: HttpService,
    private router: Router) {
      this.loginRedirect = '/races';
      this.header = new HttpHeaders({
        'Content-Type':  'application/json',
        responseType: 'json'
      });
     }

  register = (dto: IRegisterDto) => {
    this.http.post(`${this.URL}/register`, dto, { headers: this.header })
      .subscribe( res => { console.log(res) });
  }

  login = (dto: ILoginDto) => {
    this.http.post(`${this.URL}/login`, dto, { headers: this.header })
    .subscribe(res => {
      const token: string = res['auth-token'];
      this.storageService.storeToken(token).then(_ => this.router.navigateByUrl(this.loginRedirect));
    });
  } 
                // login = (dto: ILoginDto) => {
                //   const options =  { responseType: 'text' as 'json' };
              
                //   this.http.post<any>(this.URL+'/login', dto, options)
                    // .subscribe( res => { this.storageService.storeToken(res).then(_ => this.router.navigateByUrl('/profile'))});
                // }
                // setOptions = async (res: any) => {
                //   await this.storageService.storeToken(res);
                //   // await this.httpService.setOptions();
                // }
}
