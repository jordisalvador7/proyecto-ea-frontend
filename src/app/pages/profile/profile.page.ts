import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { map } from 'rxjs/operators';
import { IProfile } from 'src/app/models/IProfile';
import { HttpHeaders } from '@angular/common/http';
import { Racemodel } from 'src/app/models/race/racemodel';

// Objeto modesto
type UserProfile = {     
  id: string,
  username: string,
  email: string,
  history: any[]
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  
  public userProfile: UserProfile = {
    id: '',
    username: '',
    email: '',
    history: []
  }
  public pendingRaces: Racemodel[];

  constructor(
    private http: HttpService, 
    private authService:AuthService,

    ) { }
  
  async ngOnInit() {

    // this.http.get('/profile').pipe(map(profile => {
    //     this.userProfile.id = profile['_id'];
    //     this.userProfile.username = profile['Username'];
    //     this.userProfile.email = profile['Email'];
    //     this.userProfile.history = profile['History'];
    //   })).subscribe();
    await this.http.setOptionsAsync();
    console.log(this.http.headers);
    this.getProfile();
    this.getPending();
  }
  getPending(){
    this.http.get<Racemodel[]>('/races/races/getpending').subscribe(
      (races:Racemodel[]) => {
          this.pendingRaces = races;
        });
  }
  Run(race: Racemodel){
    let profile = 
    this.http.post('/races/savetohistory/' + race._id).subscribe(
      (res:any) => {
          console.log(res);
          this.getPending();
          this.getProfile();
        });
  }
  getProfile(){
    this.http.get('/profile').subscribe( (profile: IProfile) => { 
      this.userProfile.id = profile._id;
      this.userProfile.username = profile.username;
      this.userProfile.email = profile.email;
      this.userProfile.history = profile.history;
    });
  }
  clearHistory(){
    this.http.post('/profile/clearhistory').subscribe( (res: any) => { 
      this.getPending();
      this.getProfile();
    });
  }

}
  interface Profile {
    _id: string,
    username: string,
    email: string,
    history: any[] //tipar
  }
