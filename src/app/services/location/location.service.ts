import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationPosition, Geolocation } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      returnType: 'json'
    });
  }

  async get():Promise<GeolocationPosition> {
    let position:GeolocationPosition;
    try{
      position = await Geolocation.getCurrentPosition();
      return position;
    }
    catch(err){
      console.log(err);
      try{
        this.http.get<any>(`http://ip-api.com/json/`, { headers: this.headers }).subscribe(
          (location:any) => {
            console.log(location);
            //pasar los datos al formato que toca
            //return position;
          })
        }
        catch(err){
          console.log(err);
        }
    }

    
    //y si ni asi puede pues la de la uni
    position.coords.latitude = 41.27555556;
    position.coords.longitude = 1.98694444;

    return position;
  }
}
