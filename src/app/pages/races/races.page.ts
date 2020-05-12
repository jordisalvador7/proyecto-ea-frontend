import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Plugins } from '@capacitor/core';


import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

const { Geolocation } = Plugins;

type placeProfile = {
  name: string,
  N: number,
  E: number
}

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit {

  constructor(
    private http:HttpService,
    private authService:AuthService,
    public platform:Platform,
    )
    {
    this.platform.ready().then(() => {
      this.distance = '100000';
    })
   }

  //place: Place[];
  places2: Place2[];
  races: Race[];
  distance: string;
  latitude: number;
  longitude: number;

  ngOnInit(): void {
    this.getCurrentPosition();
    /*this.http.get<Place2[]>('/races/places').subscribe(
      (places2:Place2[]) => {
        this.places2= places2;
        console.log(this.places2)
        })*/
    this.http.get<Race[]>('/races/races').subscribe(
       (races:Race[]) => {
            this.races= races;
            console.log(this.races)
            })
  }

  getNearPlaces(){
    /*const url:string = '/races/places/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.http.get<Place2[]>(url).subscribe(
      (places2:Place2[]) => {
        this.places2= places2;
        console.log(this.places2)
        })*/

    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.http.get<Race[]>(url).subscribe(
      (races:Race[]) => {
          this.races= races;
          console.log(this.races)
        })
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
  }

}
interface Race{
  title: string,
  author: string,
  description: string,
  date: Date,
  startingPoint: LatLng,
  distance: number
}

interface Place2{
  name: string,
  location: LatLng
}

interface LatLng{
  type: string,
  coordinates: number
}
