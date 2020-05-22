import { Racemodel } from './../../models/race/racemodel';
import { Usermodel } from './../../models/user/usermodel';
import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Plugins } from '@capacitor/core';


import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

const { Geolocation } = Plugins;


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

  races: Racemodel[];
  distance: string;
  latitude: number;
  longitude: number;

  ngOnInit(): void {
    this.getCurrentPosition();
    this.http.get<Racemodel[]>('/races/races').subscribe(
       (races:Racemodel[]) => {
            this.races= races;
            console.log(this.races)
            })
  }

  getNearPlaces(){
    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.http.get<Racemodel[]>(url).subscribe(
      (races:Racemodel[]) => {
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