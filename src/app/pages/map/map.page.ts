import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { HttpService } from 'src/app/services/http/http.service';
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
//import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Plugins } from '@capacitor/core';


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

  constructor(private http:HttpService, public platform:Platform)  { 
    this.platform.ready().then(() => {
    this.distance = '100000';
  }) }

  places2: Place2[];
  races: Race[];

  ionViewDidEnter() { 
    this.leafletMap();
    this.http.get<Race[]>('/races/races').subscribe(
      (races:Race[]) => {
        this.races= races;
        console.log((this.places2))
        for (let i=0; i<races.length; i++){
          marker([races[i].startingPoint.coordinates[1], races[i].startingPoint.coordinates[0]]).addTo(this.map)
      .bindPopup(races[i].title)
      .openPopup();

        }
      })
  }

  async leafletMap()
  {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
    this.map = new Map('mapId').setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Your Location')
      .openPopup();
  }


  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
    this.map.setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    marker([this.latitude, this.longitude]).addTo(this.map)
      .bindPopup('Your Location')
      .openPopup();
  }

  async getNearPlaces(){
    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.map.remove();
    this.map = new Map('mapId').setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
    marker([this.latitude, this.longitude]).addTo(this.map)
    .bindPopup('Your Location')
    .openPopup();
    this.http.get<Race[]>(url).subscribe(
      (races:Race[]) => {
        this.races= races;
        console.log((this.races))
        for (let i=0; i<races.length; i++){
          marker([races[i].startingPoint.coordinates[1], races[i].startingPoint.coordinates[0]]).addTo(this.map)
      .bindPopup(races[i].title)
      .openPopup();

        }
      })
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
