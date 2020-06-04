import { Usermodel } from '../user/usermodel';
import { DatePipe } from '@angular/common';

export class Racemodel {
        _id?: string;
        title: string;
        author: string;
        description: string;
        date: Date;
        startingPoint: LatLng;
        distance: number;
        subscribers: Usermodel[] | string[];
        comments: string[];
}

interface LatLng{
    type: string,
    coordinates: number[]
  }

interface Comments{
        author: string;
        text: string;
}