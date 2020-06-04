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

  raceId:any;

  constructor(
    private http:HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.special) {
        this.raceId = JSON.parse(params.special);
      }
    });
   }

  races: Racemodel;
  race: Racemodel = new Racemodel();
  me: Usermodel;
  map: Map;
  latitude: number;
  longitude: number;
  marker: string;

  async ionViewDidEnter() {
    this.getRace();

    await this.http.setOptionsAsync();
    this.leafletMap();
    /*this.map.off();
    this.map.remove();
    this.leafletMap();*/
    marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('<b>' + this.marker + '</b>')
      .openPopup();
  }

  async leafletMap()
  {
    this.map = new Map('mapId');
    this.getRace();
    if (this.race.startingPoint != null){
      this.latitude = this.race.startingPoint.coordinates[1];
      this.longitude = this.race.startingPoint.coordinates[0];
      this.marker = 'Starting Point'
    }
    else{
      this.latitude= 41.27555556;
      this.longitude = 1.98694444;
      this.marker = 'Couldn\'t load starting point'
    }
    
    console.log(this.latitude , this.longitude);
    this.map.setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
  }

  async getRace(){
    const url:string = '/races/races/'+ this.raceId;
    this.http.get<Racemodel>(url).subscribe(
      (race:Racemodel) => {
          this.race= race;
          console.log(this.race);
          console.log(this.race.comments);
          this.loadSubs();
        })
  }

  async Subscribe(race: Racemodel){
    console.log('subscribe to');
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces()
  }
  async Unsubscribe(race: Racemodel){
    console.log('unsubscribe from');
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

  loadSubs(){
        this.http.get<Usermodel[]>('/races/getsubs/' + this.race._id).subscribe(
        (subs:Usermodel[]) => {
          this.race.subscribers = subs;
        }
      )
    };
  }


