import { Racemodel } from './../../models/race/racemodel';
import { Usermodel } from './../../models/user/usermodel';
import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Plugins } from '@capacitor/core';


import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { SocketService } from 'src/app/services/socket/socket.service';

const { Geolocation } = Plugins;


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
    private socketService: SocketService
    )
    {
    this.platform.ready().then(() => {
      this.distance = '100000';
    })
   }
  messages: string[] = [];
  message: string;
  races: Racemodel[];
  distance: string;
  latitude: number;
  longitude: number;


  ngOnInit(): void {
    this.getCurrentPosition();
    this.http.get<Racemodel[]>('/races/races').subscribe(
       (races:Racemodel[]) => {
            this.races= races;
            console.log(this.races)
            });
      this.socketService.connect('races');
      this.socketService.joinRoom('default', 'username');
      this.socketService
        .getMessages()
        .subscribe((message: string) => {
          this.messages.push(message);
          console.log(message);
        });
      this.socketService
        .getNotifications()
        .subscribe((message: string) => {
      this.messages.push(message);
      console.log(`!Notify! ${message}`);
          });
            
  }

  getNearPlaces(){
    const url:string = '/races/races/nearest/'+ this.distance + '/' + this.latitude + '/' + this.longitude
    this.http.get<Racemodel[]>(url).subscribe(
      (races:Racemodel[]) => {
          this.races= races;
          console.log(this.races)
        })
  }

  async getCurrentPosition() {
    const position = await Geolocation.getCurrentPosition();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
  }

  sendMessage() {
    this.socketService.sendMessage(this.message);
    let  date: string = new Date().toLocaleTimeString();
    this.message = `${date} ME: ${this.message}`;
    this.messages.push(this.message);
    this.message = "";
  }

}