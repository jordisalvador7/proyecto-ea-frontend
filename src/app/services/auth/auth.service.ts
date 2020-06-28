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
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { auth } from 'firebase';
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
    private router: Router,
    public angularFire: AngularFireAuth) {
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

  oauthLogin = (dto: ILoginDto) => {
    console.log('OAUTH Login IN');
    this.http.post(`${this.URL}/oauthlogin`, dto, { headers: this.header })
    .subscribe(res => {
      const token: string = res['auth-token'];
      this.storageService.storeToken(token).then(_ => this.router.navigateByUrl(this.loginRedirect));
    }, err => {
      console.log(err);
      alert(err.error);
    });
  }
  
  signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    const scopes = ['profile', 'email'];
    return this.socialSignIn(provider.providerId, scopes);
  }

  signInWithFacebook() {
    const provider = new auth.FacebookAuthProvider();
    return this.socialSignIn(provider.providerId);
  }
  

  socialSignIn = (providerName: string, scopes?: Array<string>): Promise<any>  => {
    const provider = new auth.OAuthProvider(providerName);

    // add any permission scope you need
    if (scopes) {
      scopes.forEach(scope => {
        provider.addScope(scope);
      });
    }
    return this.angularFire.signInWithPopup(provider);
  }
  logout = () => {
    console.log('Logging out...');
    this.storageService.clear().then(() => {
      console.log('logged out');
      this.router.navigateByUrl('/home');
    })
  }
}
interface auth1 {
  authToken: string,
}
