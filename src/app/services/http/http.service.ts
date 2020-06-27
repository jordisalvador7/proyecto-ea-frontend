import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../storage/storage.service';
import { Observable } from 'rxjs';
import { API_URL } from 'src/environments/custom';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private URL: string;
  public headers: HttpHeaders;

  constructor(private http: HttpClient, 
    private storage: StorageService,
    private router: Router) { 
    this.URL = API_URL;
    this.setOptions();
    console.log("constructor http headers:", this.headers);
    
     
  }
  async setOptionsAsync(){
    try{
      const token = await this.storage.retrieveToken();
      if (token == null || token == undefined){
        throw new Error("");
      }
      this.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': String(token),
        returnType: 'json'
      });
    }
    catch(err){
      //alert("Not logged in");
      this.router.navigateByUrl('/home');
    }
  }
  
  setOptions = () => { 
    this.storage.retrieveToken().then(authToken => { 
      this.headers = new HttpHeaders({
        'Content-Type':  'application/json',
        'auth-token': String(authToken),
        returnType: 'json'
      });

    })
  }

  get = <TResponse>(endpoint: string): Observable<TResponse> => {
     
    return this.http.get<TResponse>(`${this.URL}${endpoint}`, { headers: this.headers });
  }

  // get = (endpoint: string) => {
  //   this.http.get(`${this.URL}${endpoint}`, { headers: this.headers })
  //   .pipe(map(res => { console.log(res); return res })).subscribe();
  // }

  //post = <TResponse>(endpoint: string, body: object): Observable<TResponse> =>
    //this.http.post<TResponse>(`${this.URL}${endpoint}`, { headers: this.headers, body: body });
  
  post = <TResponse>(endpoint: string, body?: any): Observable<TResponse> => 
    this.http.post<TResponse>(`${this.URL}${endpoint}`, body, { headers: this.headers });
  
  
}
