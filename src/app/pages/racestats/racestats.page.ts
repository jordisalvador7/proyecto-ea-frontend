import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { Racemodel } from 'src/app/models/race/racemodel';

@Component({
  selector: 'app-racestats',
  templateUrl: './racestats.page.html',
  styleUrls: ['./racestats.page.scss'],
})
export class RacestatsPage implements OnInit {

  constructor(private http: HttpService) { }

  async ngOnInit() {
    console.log('Executing');
    await this.http.setOptionsAsync();
    console.log(this.http.headers);
    this.http.get('/races').subscribe( (races: Racemodel[]) => { 
      console.log(races);
      });
  }

}
