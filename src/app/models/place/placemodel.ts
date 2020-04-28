export class Placemodel {
    name: string;
    N: number;
    E: number;

    constructor(name='', N = 0, E = 0){
        this.name = name;
        this.N = N;
        this.E = E;
    }
}
