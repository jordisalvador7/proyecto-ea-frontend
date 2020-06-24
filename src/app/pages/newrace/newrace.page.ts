import { Component, OnInit } from '@angular/core';
import { Map, PointTuple, map, tileLayer, marker, Marker, LatLng } from 'leaflet';

import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { delay } from 'rxjs/operators';
import { HttpService } from 'src/app/services/http/http.service';
import { Racemodel} from 'src/app/models/race/racemodel';
import { Router } from '@angular/router';
import { LocationService } from 'src/app/services/location/location.service';
import { Usermodel } from 'src/app/models/user/usermodel';

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
    private location: LocationService,
    private router: Router) 
  {
    this.center = this.startCoords;
  }
  async ionViewDidEnter(){
    await this.leafletMap();
    await this.http.setOptionsAsync();
    const me = await this.http.get<Usermodel>('/profile').toPromise();
    this.newRace.author = me.username;
    console.log(this.newRace);
  }
  async ngOnInit(){
    this.newRace = {
      title: 'Untitled',
      author: '',
      date: new Date(),
      description:'',
      distance: 1,
      startingPoint: {
        coordinates: [this.lat, this.lng],
        type: ''
      },
      subscribers: [],
      comments: []
    }
  }
  async leafletMap()
  {
    this.map = map('mapId', 
    {
      center: this.center,
      zoom: 15
    });
    const position = await this.location.getLocation();
    console.log('Current', position);
    this.map.setView([position.coords.latitude, position.coords.longitude], 12);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: '', 
    }).addTo(this.map);

    this.startMarker = marker([position.coords.latitude, position.coords.longitude], {draggable: true}).addTo(this.map)
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
    this.newRace.startingPoint.coordinates[0] = coord.lng;
    this.newRace.startingPoint.coordinates[1] = coord.lat;
    this.newRace.date = new Date();
    console.log(this.newRace);
    this.http.post('/races', this.newRace).subscribe(( async res => {
      console.log(res);
      const anyres:any = res;
      console.log("posted");
      if(anyres._id){
      await this.http.post<any>('/races/subscribe/' +  anyres._id).toPromise();
      this.router.navigateByUrl('/races');
      }
      else{
        alert(anyres.race.message);
      }
    }));
  }
}