export interface Movie{
    json(): void;
    //_id: string
    name: string,
    description: string,
    releaseDate: number,
    length: number,
    imbdRating: number,
    suspense: number,
    gore: number,
    spookiness: number,
    imageURL: string
    //__v: number
}