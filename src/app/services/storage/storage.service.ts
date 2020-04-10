import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  storeToken = async (token: string)  => {
    this.storage.set('token', token);
  }

  retrieveToken = async () => {
    return new Promise((resolve, reject) => {
      this.storage.get('token').then((val) => { resolve(val); });
    });
  }
}
