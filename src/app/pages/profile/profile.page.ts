import { AuthService } from 'src/app/services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { map } from 'rxjs/operators';
import { IProfile } from 'src/app/models/IProfile';

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
  constructor(private http: HttpService, private authService:AuthService) { }
  
  ngOnInit() {

    // this.http.get('/profile').pipe(map(profile => {
    //     this.userProfile.id = profile['_id'];
    //     this.userProfile.username = profile['Username'];
    //     this.userProfile.email = profile['Email'];
    //     this.userProfile.history = profile['History'];
    //   })).subscribe();
      
      this.http.get('/profile').subscribe( (profile: IProfile) => { 
        this.userProfile.id = profile._id;
        this.userProfile.username = profile.username;
        this.userProfile.email = profile.email;
        this.userProfile.history = profile.history;
      });
    }

  }
  interface Profile {
    _id: string,
    username: string,
    email: string,
    history: any[] //tipar
  }
