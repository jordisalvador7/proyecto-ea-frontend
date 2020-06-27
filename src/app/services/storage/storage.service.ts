import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IProfile } from 'src/app/models/IProfile';

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

  clear = () => {
    return new Promise((resolve, reject) => {
      this.storage.clear().then(() => { resolve(); });
    });
  }

  storeProfile = async (profile: IProfile) => {
    this.storage.set('profileId', profile._id);
    this.storage.set('profileUsername', profile.username);
  }

  retrieveProfileId = async () => {
    return new Promise((resolve, reject) => {
      this.storage.get('profileId').then((val) => { resolve(val); });
    });
  }

  retrieveProfileUsername = async () => {
    return new Promise((resolve, reject) => {
      this.storage.get('profileUsername').then((val) => { resolve(val); });
    });
  }
}
