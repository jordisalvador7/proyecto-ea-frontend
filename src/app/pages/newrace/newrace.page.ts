import { Component, OnInit } from '@angular/core';
import { Map, PointTuple, map, tileLayer, marker, Marker } from 'leaflet';
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';

@Component({
  selector: 'app-newrace',
  templateUrl: './newrace.page.html',
  styleUrls: ['./newrace.page.scss'],
})

export class NewracePage implements OnInit {

  lat:any='41.27555556'
  lng:any='1.98694444'

  map: Map;
  center: PointTuple;
  startCoords: PointTuple = [this.lat, this.lng];
  startMarker: Marker;

  constructor(
    private http: HttpService,
    public platform: Platform,
    private geolocation: Geolocation) 
  {
    this.center = this.startCoords;
    this.platform.ready().then(() =>
    {
      this.leafletMap();
    })
  }
  ngOnInit(){
  }
  leafletMap()
  {
    this.map = map('mapId', 
    {
      center: this.center,
      zoom: 15
    });

    tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '', 
    }).addTo(this.map);

    this.startMarker = marker(this.startCoords, {draggable: true}).addTo(this.map)
      .bindPopup('Ionic <br> Leaflet.')
      .on('dragend', function() {
        this.startMarker.bindPopup('Starting Point <br>' + String(this.startMarker.getLatLng()));
      });
   
  }

  save(){
    this.http.post('/races',)
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
