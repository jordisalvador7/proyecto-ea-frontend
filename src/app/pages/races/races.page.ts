import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';

type placeProfile = {
  name: string,
  N: number,
  E: number
}

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit {

  constructor(
    private http:HttpService,
    private authService:AuthService,
    public platform:Platform,
    )
    {
    this.platform.ready().then(() => {
      this.distance = '100000';
    })
   }

  place: Place[];
  places2: Place2[];
  distance: string;

  ngOnInit(): void {
    this.http.get<Place2[]>('/races/places').subscribe(
      (places2:Place2[]) => {
        this.places2= places2;
        console.log(this.places2)
        })
  }

  getNearPlaces(){
    const url:string = '/races/places/nearest/'+ this.distance
    this.http.get<Place2[]>(url).subscribe(
      (places2:Place2[]) => {
        this.places2= places2;
        console.log(this.places2)
        })
  }

}
interface Place{
  name: string,
  N: number,
  E: number
}

interface Place2{
  name: string,
  location: {

  }
}
