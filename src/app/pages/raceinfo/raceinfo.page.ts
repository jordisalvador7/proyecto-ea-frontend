import { Usermodel } from './../../models/user/usermodel';
import { Racemodel } from './../../models/race/racemodel';
import { Comment } from './../../models/comment/comment';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Map, latLng, tileLayer, Layer, marker } from 'leaflet';

@Component({
  selector: 'app-raceinfo',
  templateUrl: './raceinfo.page.html',
  styleUrls: ['./raceinfo.page.scss'],
})
export class RaceinfoPage {

  raceId:any;
  constructor(
    private http:HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.special) {
        this.raceId = JSON.parse(params.special);
      }
    });
   }

  races: Racemodel;
  race: Racemodel = new Racemodel();
  me: Usermodel;
  map: Map;
  latitude: number;
  longitude: number;
  marker: string;
  newComment: Comment = new Comment();

  async ionViewDidEnter() {
    await this.http.setOptionsAsync();
    const me = await this.http.get<Usermodel>('/profile').toPromise();
    this.newComment.author = me.username;
    await this.getRace();
    this.leafletMap();
    marker([this.latitude, this.longitude]).addTo(this.map)
    .bindPopup('<b>' + this.marker + '</b>')
    .openPopup();
  }

  async ngOnInit(){
    await this.http.setOptionsAsync();
    this.me = await this.http.get<Usermodel>('/profile').toPromise();
    await this.getRace();
    this.newComment = {
      author: '',
      text: ''
    }
  }

  async leafletMap()
  {
    this.map = new Map('mapId');
    if (this.race.startingPoint != null){
      this.latitude = this.race.startingPoint.coordinates[1];
      this.longitude = this.race.startingPoint.coordinates[0];
      this.marker = 'Starting Point'
    }
    else{
      this.latitude= 41.27555556;
      this.longitude = 1.98694444;
      this.marker = 'Couldn\'t load starting point'
    }
    console.log(this.latitude , this.longitude);
    this.map.setView([this.latitude, this.longitude], 15);
    tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'edupala.com © ionic LeafLet',
    }).addTo(this.map);
  }

  async getRace(){
    const url:string = '/races/races/'+ this.raceId;
    this.race = await this.http.get<Racemodel>(url).toPromise();
    console.log(this.race);
    await this.loadSubs();
    this.loadComments();
  }

  async Subscribe(race: Racemodel){
    console.log('subscribe to');
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces()
    await this.loadSubs();
  }
  async Unsubscribe(race: Racemodel){
    console.log('unsubscribe from');
    console.log(race);
    await this.http.post<any>('/races/unsubscribe/' +  race._id).toPromise();
    await this.loadSubs();
  }

  AmISubscribed():Boolean{
    const race = this.race;
    if (race.subscribers === undefined) {
      return false;
    }
    let veredict:boolean = false;
    race.subscribers.forEach(sub => {
      if(sub._id === this.me._id || sub === this.me._id){
        veredict = true;
      }
    });
    return veredict;
  }

  async loadSubs(){
    const subs = await this.http.get<Usermodel[]>('/races/getsubs/' + this.race._id).toPromise();
        
    this.race.subscribers = subs;
        
  }

    loadComments(){
      this.http.get<Comment[]>('/races/getcomments/' + this.race._id).subscribe(
      (comments:Comment[]) => {
        this.race.comments = comments;
      }
    )
  };

  async save(){
    console.log(this.newComment);
    this.http.post('/races/comment', this.newComment).subscribe(( async res => {
      const anyres:any = res;
      const comment = this.newComment;
      console.log("posted");
      console.log(anyres);
      if(anyres._id){
      await this.http.post<any>('/races/comment/' +  this.race._id + '/' + anyres._id).toPromise();
      console.log(anyres._id);
      this.loadComments();
      }
      else{
        alert(anyres.race.message);
      }
    }));
    
  }
  
  }


