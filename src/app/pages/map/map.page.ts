import { Racemodel } from './../../models/race/racemodel';
import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { HttpService } from 'src/app/services/http/http.service';
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
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
  //center: PointTuple;
  startCoords = [this.latitude, this.longitude];

  constructor(private http:HttpService, public platform:Platform, private location:LocationService)  { 
    this.platform.ready().then(() => {
    this.distance = '100000';
  }) }

  races: Racemodel[];

  ionViewDidEnter() { 
    this.leafletMap();
    this.http.get<Racemodel[]>('/races/races').subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log((this.races))
        for (let i=0; i<races.length; i++){
          marker([races[i].startingPoint.coordinates[1], races[i].startingPoint.coordinates[0]]).addTo(this.map)
      .bindPopup('<b>' + races[i].title + '</b>' + '<br>' + races[i].distance + 'km')
      .openPopup();

        }
        marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('<b> You are here </b>')
      .openPopup();
      })
  }

  async leafletMap()
  {
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
}
