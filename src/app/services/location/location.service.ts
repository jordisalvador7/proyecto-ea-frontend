import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GeolocationPosition, Geolocation } from '@capacitor/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LocationService {


  private headers: HttpHeaders;
  constructor(private http: HttpClient) { 
    this.headers = new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*',
      returnType: 'json'
    });
  }

  public getLocation = async ():Promise<GeolocationPosition> => {
    let lat:number;
    let lon:number;
    
    try{
      //la de la uni
      lat = 41.27555556;
      lon = 1.98694444;
      //intenta por ip
      const location = await this.http.get<any>(`http://ip-api.com/json/`, { headers: this.headers }).toPromise();
      console.log(location);
      if(location.status == 'success'){
        lat = location.lat;
        lon = location.lon;
      }
      //intenta por gps
      // const position = await Geolocation.getCurrentPosition();
      // console.log(position);
      // lat = position.coords.latitude;
      // lon = position.coords.longitude;
        
    }
    catch(err){
      console.log(err);
    }
    finally{
      let position:GeolocationPosition = Object({
        coords:{
          latitude: lat,
          longitude: lon
        }
      });
      return position;
    }
  }
}
