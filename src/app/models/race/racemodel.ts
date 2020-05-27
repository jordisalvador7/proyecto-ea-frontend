import { Usermodel } from '../user/usermodel';

export class Racemodel {
        _id?: string;
        title: string;
        author: string;
        description: string;
        date: Date;
        startingPoint: LatLng;
        distance: number;
        subscribers: Usermodel[] | string[];
}

interface LatLng{
    type: string,
    coordinates: number[]
  }