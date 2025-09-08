export type Character = {
    id: number;
    name: string;
    status: string;
    species: string;
    gender: string;
    origin: {
        name: string;
        dimension: string;
    }
    location: {
        name: string;
    }
    image: string;
    episode: Episode[]
}

export type FilterCharacter = {
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
}

export type Episode = {
    name: string;
    episode: string;
}