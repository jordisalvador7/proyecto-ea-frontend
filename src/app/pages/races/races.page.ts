import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';

type RaceProfile = {
  title: string,
  author: string,
  description: string
}

@Component({
  selector: 'app-races',
  templateUrl: './races.page.html',
  styleUrls: ['./races.page.scss'],
})
export class RacesPage implements OnInit {

  private raceProfile:RaceProfile = {
    title: '',
    author: '',
    description: ''
  }

  constructor(private http:HttpService, private authService:AuthService) { }

  ngOnInit() {
    this.http.get('/').subscribe( (race: Race) => {
      this.raceProfile.title = race.Title;
      this.raceProfile.author = race.Author;
      this.raceProfile.description = race.Description;
    });
  }

  gotoProfile(){
    this.authService.goToProfile();
  }


}
interface Race{
  Title: string,
  Author: string,
  Description: string
}
