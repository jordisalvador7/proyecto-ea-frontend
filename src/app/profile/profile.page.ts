import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  url: string = 'http://localhost:3700/auth';
  header = new HttpHeaders({'token-auth': String(this.storage.retrieveToken())});

  constructor(private http: HttpClient,
    private storage: StorageService) { }

  ngOnInit() {

  }

  getProfile = () => {
    console.log(this.header);
    this.http.get<any>(this.url, { headers: this.header })
    .subscribe(res => {
      const body = res.body;
      console.log(`Received Message: ${body}`)
    });
    // return receivedMessage;
  }
}
