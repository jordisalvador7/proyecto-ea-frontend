import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';
import { IProfile } from 'src/app/models/IProfile';
import { HttpService } from 'src/app/services/http/http.service';

type UserProfile = {     
  id: string,
  username: string,
  email: string,
  history: any[]
}

@Component({
  selector: 'app-socket',
  templateUrl: './socket.page.html',
  styleUrls: ['./socket.page.scss'],
})
export class SocketPage implements OnInit {
  public userProfile: UserProfile = {
    id: '',
    username: '',
    email: '',
    history: []
  }
  message: string;
  messages: string[] = [];
  constructor(private socketService: SocketService, private http: HttpService) { }

  ngOnInit() {
    this.socketService.connect();
    this.socketService.joinRoom('default', 'username');
    this.sendMessage();
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

  sendMessage() {

    console.log('SENDING Hello World');
    this.socketService.sendMessage('Hello World');
    this.message = '';
  }
  getUserProfile = () => {
    this.http.get('/profile').subscribe( (profile: IProfile) => { 
      this.userProfile.id = profile._id;
      this.userProfile.username = profile.Username;
    });
  }
}
