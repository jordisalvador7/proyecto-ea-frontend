import { Usermodel } from './../../models/user/usermodel';
import { Racemodel } from './../../models/race/racemodel';
import { HttpService } from './../../services/http/http.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-raceinfo',
  templateUrl: './raceinfo.page.html',
  styleUrls: ['./raceinfo.page.scss'],
})
export class RaceinfoPage implements OnInit {

  data:any;

  constructor(
    private http:HttpService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.route.queryParams.subscribe(params => {
      console.log('params:', params);
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
   }

  races: Racemodel[];

  ngOnInit() {
    /*this.http.get<Racemodel[]>('/races/races').subscribe(
      (races:Racemodel[]) => {
        this.races= races;
        console.log(this.races);
        this.loadSubs();
      }
    );*/
  }

  /*loadSubs(){
    this.races.forEach(race => {
      this.http.get<Usermodel[]>('/races/getsubs/' + race._id).subscribe(
        (subs:Usermodel[]) => {
          race.subscribers = subs;
        }
      )
    });
  }

  async Subscribe(race: Racemodel){
    console.log("subscribe to");
    console.log(race);
    await this.http.post<any>('/races/subscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces()
  }
  async Unsubscribe(race: Racemodel){
    console.log("unsubscribe from");
    console.log(race);
    await this.http.post<any>('/races/unsubscribe/' +  race._id).toPromise();
    //window.location.reload();
    //this.getNearPlaces();
  }*/

}
