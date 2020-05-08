import { Component } from '@angular/core';
import L from 'leaflet';
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  lat:any=''
  lng:any=''

  map: L.Map;
  center: L.PointTuple;
  startCoords = [this.lat, this.lng];

  constructor(
    public platform: Platform,
    private geolocation: Geolocation) 
  {
    this.center = this.startCoords;
    this.platform.ready().then(() =>
    {
      this.leafletMap();
    })
  }

  leafletMap()
  {
    this.map = L.map('mapId', 
    {
      center: this.center,
      zoom: 15
    });

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '', 
    }).addTo(this.map);

   
  }

  async getLocation(){
    this.geolocation.getCurrentPosition(
      {maximumAge: 1000, timeout: 5000,
       enableHighAccuracy: true }
      ).then((resp) => {
            // resp.coords.latitude
            // resp.coords.longitude
            //alert("r succ"+resp.coords.latitude)
            alert(JSON.stringify( resp.coords));
      
            this.lat=resp.coords.latitude
            this.lng=resp.coords.longitude
            },er=>{
              //alert("error getting location")
              alert('Can not retrieve Location')
            }).catch((error) => {
            //alert('Error getting location'+JSON.stringify(error));
            alert('Error getting location - '+JSON.stringify(error))
            });
  }
 
}
