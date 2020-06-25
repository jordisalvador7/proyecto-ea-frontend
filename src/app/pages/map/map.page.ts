import { Racemodel } from 'src/app/models/race/racemodel';
import { NavigationExtras, Router } from '@angular/router';
import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { HttpService } from 'src/app/services/http/http.service';
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Plugins } from '@capacitor/core';
import { LocationService } from 'src/app/services/location/location.service';


const { Geolocation } = Plugins;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  latitude: number;
  longitude: number;
  distance: string;

  map: Map;
  startCoords = [this.latitude, this.longitude];

  constructor(private http:HttpService, public platform:Platform, private location:LocationService, private router:Router)  { 
    this.platform.ready().then(() => {
    this.distance = '100000';
  }) }

  races: Racemodel[];

  async ionViewDidEnter() { 
    await this.http.setOptionsAsync();
    this.leafletMap();
    this.http.get<Racemodel[]>('/races/races').subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log((this.races))
        for (let i=0; i<races.length; i++){
          let navigationExtras: NavigationExtras = {
            queryParams : {
              special: JSON.stringify(this.races[i]._id)
            }
          }
          marker([races[i].startingPoint.coordinates[1], races[i].startingPoint.coordinates[0]])
          
          .on('dblclick', () => {
            this.map.off();
            this.map.remove();
            this.router.navigate(['/raceinfo'], navigationExtras);
          })
          .addTo(this.map)
          .bindPopup('<b>' + races[i].title + '</b>' + '<br>' + races[i].distance + 'km')
          .openPopup();
        }
        marker([this.latitude, this.longitude])
        
        .addTo(this.map)
        .bindPopup('<b> You are here </b>')
        .openPopup();
      })
  }

  async leafletMap()
  {
    if(this.map != undefined){
      this.map.off();
      this.map.remove();
      this.map = undefined;
    }
    
    this.map = new Map('mapId');
    const position = await this.location.getLocation();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.map.setView([this.latitude, this.longitude], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    this.getCurrentPosition();
  }


  async getCurrentPosition() {
    const position = await this.location.getLocation();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
    this.map.setView([this.latitude, this.longitude], 12);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('<b> You are here </b>')
      .openPopup();
  }

  async getNearPlaces(){
    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.map.remove();
    this.map = new Map('mapId').setView([this.latitude, this.longitude], 10);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    this.http.get<Racemodel[]>(url).subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log((this.races))
        for (let i=0; i<races.length; i++){
          marker([races[i].startingPoint.coordinates[1], races[i].startingPoint.coordinates[0]]).addTo(this.map)
      .bindPopup('<b>' + races[i].title + '</b>' + '<br>' + races[i].distance + 'km')
      .openPopup();

        }
      })
      marker([this.latitude, this.longitude]).addTo(this.map)
    .bindPopup('<b> You are here </b>')
    .openPopup();
  }

 

  async getRaceid(race: Racemodel) {
    this.map.off();
    this.map.remove();
    console.log(race._id)
    let navigationExtras: NavigationExtras = {
      queryParams : {
        special: JSON.stringify(race._id)
      }
    }
    this.router.navigate(['/raceinfo'], navigationExtras);
  }
}


 function onClick(e) { 
    alert(this.getRaceid());
  }