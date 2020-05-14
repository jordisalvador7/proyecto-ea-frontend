import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = 'http://localhost:3001/races';
  private socket;    

  constructor() { 
    this.socket = io(this.url);
  }

  public sendMessage(message) {
    this.socket.emit('chatMessage', message);
  }

  public connect() {
    // this.socket.on('notify', (msg) => {
    //   console.log(`Notify! ${msg}`);
    // });
    // this.socket.on('message', (msg) => console.log(`${msg}`));
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


