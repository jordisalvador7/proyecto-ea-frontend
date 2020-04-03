import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core';
import { async } from '@angular/core/testing';

const { Storage } = Plugins;

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: Storage) { }

  storeToken = async (token: string)  => {
    await this.storage.set('token', token);
  }

  retrieveToken = async () => {
    // try {
    //   return this.storage.getItem('token');
    // } catch (err) {
    //   console.log(err);
    // 
      return this.storage.getItem('token');
  }
  }

  // async store (storageKey: string, value:any){
  //   const encryptedValue = btoa (escape(JSON.stringify(value)));
  //   await Storage.set({
  //     key: storageKey,
  //     value: encryptedValue
  //   });
  // }

  // //Get the value
  // async get (storageKey: string) {
  //   const ret = await Storage.get({ key: storageKey });
  //   return JSON.parse(unescape(atob(ret.value)));
  // }

  // async removeStorageItem(storageKey: string) {
  //   await Storage.remove ({ key: storageKey});
  // }

  // //Clear storage
  // async clear() {
  //   await Storage.clear();
  // }
// }
