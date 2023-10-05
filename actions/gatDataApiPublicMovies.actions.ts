"use server"
import { NEXT_URL_PUBLIC_MOVIES } from "@/global/serverUrl";
import { MoviesType } from "@/types/movies.types";



export const getDataApiPublicMovies = async () => {
  const response = await fetch(`${NEXT_URL_PUBLIC_MOVIES}`);
  return (await response.json()) as MoviesType[];
};
