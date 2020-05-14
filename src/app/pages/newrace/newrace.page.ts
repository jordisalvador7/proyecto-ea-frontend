import { Component, OnInit } from '@angular/core';
import { Map, PointTuple, map, tileLayer, marker, Marker, LatLng } from 'leaflet';

import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { Racemodel} from 'src/app/models/race/racemodel';

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

  newRace: Racemodel;

  constructor(
    private http: HttpService,
    public platform: Platform,
    private geolocation: Geolocation) 
  {
    this.center = this.startCoords;
    this.platform.ready().then(() =>
    {
      console.log("platform ready");
      this.leafletMap();

    })
  }
  ngOnInit(){
    this.newRace = {
      title: '',
      author: '',
      date: new Date(),
      description:'',
      distance: 0,
      startingPoint: {
        coordinates: [this.lat, this.lng],
        type: ''
      }
    }

    this.leafletMap();
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
      .bindPopup('Starting point')
      .on('dragend', function() {
        console.log("dragged");
        //console.log(this);
        //this.startMarker.bindPopup('Starting Point <br>' + String(this.startMarker.getLatLng()));
      });
   
  }

  async save(){
    console.log(this.newRace);
    const coord :LatLng = this.startMarker.getLatLng();
    this.newRace.startingPoint.coordinates[0] = coord.lat;
    this.newRace.startingPoint.coordinates[1] = coord.lng;
    this.newRace.date = new Date();
    console.log(this.newRace);
    //const res = await this.http.post('/races', this.newRace);
    this.http.post('/races', this.newRace).subscribe(( res => { console.log(res) }));
    console.log("posted");
    //console.log(res);
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
interface LatLng2{
  type: string,
  coordinates: number
}