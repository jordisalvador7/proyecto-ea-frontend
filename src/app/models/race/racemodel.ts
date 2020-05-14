export class Racemodel {
        title: string;
        author: string;
        description: string;
        date: Date;
        startingPoint: LatLng;
        distance: number
}

interface LatLng{
    type: string,
    coordinates: number[]
  }