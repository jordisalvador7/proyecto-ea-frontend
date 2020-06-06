import { Racemodel } from './race/racemodel';

export interface IProfile {
    _id: string,
    username: string,
    email: string,
    history: Racemodel[],
    pending?: Racemodel[]
  }
