import { Racemodel } from './../../models/race/racemodel';
import { Usermodel } from './../../models/user/usermodel';
import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Plugins } from '@capacitor/core';


import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { LocationService } from 'src/app/services/location/location.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IProfile } from 'src/app/models/IProfile';
import { Router } from '@angular/router';

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
    private storageService: StorageService,
    private location: LocationService,
    public platform:Platform,
    private router: Router,
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
  me: Usermodel;

  async ngOnInit(): Promise<void> {
    await this.http.setOptionsAsync();
    this.me = await this.http.get<Usermodel>('/profile').toPromise();

    this.getCurrentPosition();
    this.http.get<Racemodel[]>('/races/races').subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log(this.races);
        this.loadSubs();
      }
    )
  }

  getNearPlaces(){
    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.http.get<Racemodel[]>(url).subscribe(
      (races:Racemodel[]) => {
          this.races= races;
          console.log(this.races);
          this.loadSubs();
        })
  }

  loadSubs(){
    this.races.forEach(race => {
      this.http.get<Usermodel[]>('/races/getsubs/' + race._id).subscribe(
        (subs:Usermodel[]) => {
          race.subscribers = subs;
        }
      )
    });
  }

  async getCurrentPosition() {
    const position = await this.location.getLocation();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
  }

  async Subscribe(race: Racemodel){
    console.log("subscribe to");
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    this.getNearPlaces()
  }
  async Unsubscribe(race: Racemodel){
    console.log("unsubscribe from");
    console.log(race);
    await this.http.post<any>('/races/unsubscribe/' +  race._id).toPromise();
    //window.location.reload();
    this.getNearPlaces();
  }

  AmISubscribed(race: Racemodel):Boolean{
    let veredict:boolean = false;
    race.subscribers.forEach(sub => {
      if(sub._id === this.me._id || sub === this.me._id){
        veredict = true;
      }
    });
    return veredict;
  }
}