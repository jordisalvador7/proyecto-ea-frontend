import { Component } from '@angular/core';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
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

  map: Map;
  //center: PointTuple;
  startCoords = [this.latitude, this.longitude];

  constructor()  {  }

  ionViewDidEnter() { this.leafletMap(); }

  leafletMap()
  {
    this.map = new Map('mapId').setView([41.27555556, 1.98694444], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);

  }

  /*async getLocation(){
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
  }*/

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
      .bindPopup('You are here')
      .openPopup();
  }
 
}
