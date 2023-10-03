import { NEXT_URL_MOVIES, NEXT_URL_PUBLIC_MOVIES } from "@/global/serverUrl";
import { MoviesType } from "@/types/movies.types";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";

export const getDataApiMovies = async () => {
  const session = await getSession();
  if (!session) {
    return;
  }
  const { accessToken } = await getAccessToken();
  // console.log(accessToken)
  // const token = accessToken?.toString()
  // console.log(token)

  const response = await fetch(`${NEXT_URL_MOVIES}`, { method: "GET", cache: "no-store", headers: { authorization: `Bearer ${accessToken}` } });
  return (await response.json()) as MoviesType[];
};

export const getDataApiPublicMovies = async () => {
  const response = await fetch(`${NEXT_URL_PUBLIC_MOVIES}`);
  return (await response.json()) as MoviesType[];
};
