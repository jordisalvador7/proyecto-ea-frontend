import { Placemodel } from './../../models/place/placemodel';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpService } from 'src/app/services/http/http.service';
import { Component, OnInit } from '@angular/core';

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

  
  

  constructor(private http:HttpService, private authService:AuthService) { }

  PlaceProfile: placeProfile;

  ngOnInit(): void {
    this.http.get('/races').subscribe(
      (place:Place) => {
        this.PlaceProfile.name = place.Name;
        })
  }


}
interface Place{
  Name: string,
  N: number,
  E: number
}
