import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
providedIn: 'root'
})
export class HttpService {
constructor(private http: HttpClient) {}

post(serviceName: string, data: any) {
const headers = new HttpHeaders();
const options = { headers: new HttpHeaders({
    'Authorization' : 'auth-token'
    })
};
const url = environment.apiUrl + serviceName;

return this.http.post(url, JSON.stringify(data), options);
}
}