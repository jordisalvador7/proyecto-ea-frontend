import { InforaceService } from './../../services/inforace/inforace.service';
import { Racemodel } from './../../models/race/racemodel';
import { Usermodel } from './../../models/user/usermodel';
import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';
import {Platform} from '@ionic/angular';
import { Plugins } from '@capacitor/core';
//import { NavController } from 'ionic-angular';
import { RaceinfoPage } from '../raceinfo/raceinfo.page';



import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';
import { LocationService } from 'src/app/services/location/location.service';
import { StorageService } from 'src/app/services/storage/storage.service';
import { IProfile } from 'src/app/models/IProfile';
import { Router, NavigationExtras } from '@angular/router';
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
    private storageService: StorageService,
    private location: LocationService,
    public platform:Platform,
    private router: Router,
    private socketService: SocketService,
    private infoService: InforaceService,
    //public navCtrl: NavController
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
  me: Usermodel;
  subnumber : number;
  raceinfo: Racemodel;

  async ngOnInit(): Promise<void> {
    await this.http.setOptionsAsync();
    this.me = await this.http.get<Usermodel>('/profile').toPromise();


    this.getCurrentPosition();
    this.http.get<Racemodel[]>('/races/races').subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log(this.races);
        this.loadSubs();
      }
    );
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
          console.log(this.races);
          this.loadSubs();
        })
  }

  loadSubs(){
    this.races.forEach(race => {
      this.http.get<Usermodel[]>('/races/getsubs/' + race._id).subscribe(
        (subs:Usermodel[]) => {
          race.subscribers = subs;
        }
      )
    });
  }

  async getCurrentPosition() {
    const position = await this.location.getLocation();
    this.latitude = position.coords.latitude;
    this.longitude = position.coords.longitude;
    console.log('Current', position);
  }

  async Subscribe(race: Racemodel){
    console.log("subscribe to");
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    this.getNearPlaces()
  }
  async Unsubscribe(race: Racemodel){
    console.log("unsubscribe from");
    console.log(race);
    await this.http.post<any>('/races/unsubscribe/' +  race._id).toPromise();
    //window.location.reload();
    this.getNearPlaces();
  }

  AmISubscribed(race: Racemodel):Boolean{
    let veredict:boolean = false;
    race.subscribers.forEach(sub => {
      if(sub._id === this.me._id || sub === this.me._id){
        veredict = true;
      }
    });
    return veredict;
  }
  sendMessage() {
    this.socketService.sendMessage(this.message);
    let  date: string = new Date().toLocaleTimeString();
    this.message = `${date} ME: ${this.message}`;
    this.messages.push(this.message);
    this.message = "";
  }

 /*movePage() {
   this.navCtrl.push(RaceinfoPage)
 }*/

 async getRaceid(race: Racemodel) {
   console.log(race._id)
   //this.raceinfo = race;
   let navigationExtras: NavigationExtras = {
     queryParams : {
       special: JSON.stringify(race)
     }
   }
   this.router.navigate(['/raceinfo'], navigationExtras);
 }

}
