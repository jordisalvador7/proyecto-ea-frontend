import { Injectable } from '@angular/core';
import { API_URL } from 'src/environments/custom';

@Injectable({
  providedIn: 'root'
})
export class InforaceService {
  URL: string = API_URL + '/races';

  constructor() { }
  
}
