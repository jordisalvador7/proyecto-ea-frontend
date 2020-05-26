import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private baseUrl = 'http://localhost:3001';
  private socket;    

  constructor() {
  }
  
  public connect(endPoint: string) {
    const url: string = `${this.baseUrl}/${endPoint}` ;
    this.socket = io(url);
  }

  public sendMessage(message) {
    this.socket.emit('chatMessage', message);
  }

  public joinRoom(room: string, username: string) {
    this.socket.emit('joinRoom', room, username);
  }

  public getMessages = () => {
    return Observable.create(_ => {
        this.socket.on('message', (message) => {
            _.next(message);
        });
    });
  }
  
  public getNotifications = () => {
    return Observable.create(_ => {
        this.socket.on('notify', (message) => {
            _.next(message);
        });
    }); 
  }
}


