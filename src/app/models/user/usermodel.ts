import { Racemodel } from './../race/racemodel';
export class Usermodel {
    _id?:string;
    username:string;
    password:string;
    email:string;
    history: Racemodel[] | String[];
}
