export interface UserTypes {
    id: string;
    name: string;
    email: string;
    movies: MoviesType[]; 
  }
  
  export interface MoviesType {
    id: string;
    title: string;
    score: number;
    year: number;
    country: string;
    description: string;
    image: FileList | null;
    imageId: string;
    imageUrl: string;
    genres: GenreType[];
    genresArray: string[];
    createdAt: string;
    updatedAt: string;
    users?: UserTypes;
    isLiked: boolean;
    public: boolean;
  }
  
  export interface GenreType {
    id: string;
    genre: string;
    createdAt: string;
    updatedAt: string;
    movies?: MoviesType[]; 
  }
  
  export interface ImageType {
    imageId: string;
    imageUrl: string;
  }

  export interface MovieFormData {
    id: string;
    title: string;
    score: number;
    year: number;
    country: string;
    description: string
    image: FileList | null;
    imageId: string;
    imageUrl: string;
    genres: Array<string>;
    genresArray: string[];
    createdAt: string;
    updatedAt: string;
    users?: UserTypes;
  }

  
  export type GetTokenFunction = () => Promise<string>;
  