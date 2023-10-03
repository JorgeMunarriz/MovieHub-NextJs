export interface Character {
    id: number;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: string;
    location: Location;
    image: string;
    episodes: string
    url: string;
    created: Date
}

export interface Location {
    name: string;
    url: string
}