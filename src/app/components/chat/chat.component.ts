import { Component, OnInit } from '@angular/core';
import { SocketService } from 'src/app/services/socket/socket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  constructor(private socketService: SocketService) { }

  messages: string[] = [];
  ngOnInit() {

  }

}
