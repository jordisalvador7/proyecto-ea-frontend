import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http/http.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  private userProfile = {
    id: '',
    username: '',
    email: '',
    history: []
  }

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.http.get('/profile').pipe(map(profile => {
      this.userProfile.id = profile['_id'];
      this.userProfile.username = profile['Username'];
      this.userProfile.email = profile['Email'];
      this.userProfile.history = profile['History'];
    })).subscribe();
  }

}
