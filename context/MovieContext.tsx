"use client"
import { createContext, useState, ReactNode, useEffect } from "react";
import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import { useUser } from '@auth0/nextjs-auth0/client';
import { getDataApi } from "@/service/dataApiRequest.service";
import { MoviesType } from "@/types/movies.types";
import { updateMovieLikedStatus } from "@/service/moviesRequest.service";

// Interface's context
export interface MovieContextState {
  moviesData: MoviesType[];
  fetchMovies: () => void;
  likedMovies: {[movieId: string]: boolean };
  toggleLikedStatus: (movieId: string) => void; 

}

// CreateContext
export const MovieContext = createContext<MovieContextState | undefined>(undefined);

type TypeProps = {
  children: ReactNode;
};

export const MovieProvider = (props: TypeProps) => {
  const [moviesData, setMoviesData] = useState<MoviesType[]>([]); 
  const [likedMovies, setLikedMovies] = useState<{ [movieId: string]: boolean }>({}); 
  const { user } = useUser();

  const url = `users/${user?.email}`;

  const fetchMovies = async () => {
    const data = await getDataApi(url );
    setMoviesData(data);
  }; 
  const toggleLikedStatus = async (movieId: string) => {
    try {
      // Verifica si al usuario le gusta la película o no
      const isLiked = likedMovies[movieId] || false;

      // Llama a la función de servicio para actualizar el estado "liked" en el servidor
      await updateMovieLikedStatus(NEXT_URL_MOVIES, movieId, !isLiked, );

      // Actualiza el estado "likedMovies" para reflejar el cambio
      setLikedMovies((prevLikedMovies) => ({
        ...prevLikedMovies,
        [movieId]: !isLiked,
      }));
    } catch (error) {
      console.error("Failed to toggle 'liked' status:", error);
    }
  };

  useEffect(() => {
    if(!user){
      return
    } else {
      const fetchInterval = setInterval(() => fetchMovies(), 1000);
      return () => clearInterval(fetchInterval);
    }
    
  }, [url]);
  useEffect(() => {}, [moviesData]);

  const contextValue: MovieContextState = {
    moviesData,
    fetchMovies,
    likedMovies, 
    toggleLikedStatus,
  };

  return <MovieContext.Provider value={contextValue}>{props.children}</MovieContext.Provider>;
};



