import { Component } from '@angular/core';
import L from "leaflet";
import 'leaflet-routing-machine';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage {

  map: L.Map;
  center: L.PointTuple;
  startCoords = [41.276048, 1.986713];

  constructor(public platform: Platform) 
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
 
}
