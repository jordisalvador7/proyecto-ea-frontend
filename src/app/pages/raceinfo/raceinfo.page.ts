import { Usermodel } from './../../models/user/usermodel';
import { Racemodel } from './../../models/race/racemodel';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-raceinfo',
  templateUrl: './raceinfo.page.html',
  styleUrls: ['./raceinfo.page.scss'],
})
export class RaceinfoPage {

  data:any;

  constructor(
    private http:HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
   }

  races: Racemodel[];
  me: Usermodel;
  map: Map;
  latitude: number;
  longitude: number;

  async ionViewDidEnter() {
    await this.http.setOptionsAsync();
    this.leafletMap();
    marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('<b> Starting Point </b>')
      .openPopup();
  }

  async leafletMap()
  {
    this.map = new Map('mapId');
    this.latitude = this.data.startingPoint.coordinates[1];
    this.longitude = this.data.startingPoint.coordinates[0];
    console.log(this.latitude , this.longitude);
    this.map.setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
  }

  

  async Subscribe(race: Racemodel){
    console.log("subscribe to");
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces()
  }
  async Unsubscribe(race: Racemodel){
    console.log("unsubscribe from");
    console.log(race);
    await this.http.post<any>('/races/unsubscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces();
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
