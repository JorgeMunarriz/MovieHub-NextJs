import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import { MovieFormData, MoviesType } from "@/types/movies.types";
import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import { revalidatePath, revalidateTag } from "next/cache";

export const createMovie = async (url: string, data: MovieFormData) => {
  // const session = await getSession();
  // if (!session?.user) {
  //   return;
  // }
  // const {accessToken} = await getAccessToken();
  // console.log(accessToken)
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("year", data.year.toString());
  formData.append("score", data.score.toString());
  formData.append("country", data.country);
  formData.append("description", data.description);
  if (Array.isArray(data.genres)) {
    for (const genre of data.genres) {
      formData.append("genres", genre);
    }
  }

  if (data.image) {
    formData.append("image", data.image[0]);
  }

  
  const response = await fetch(url, {
    method: "POST",cache: "no-store",
    // headers: {
    //   authorization: `Bearer ${accessToken}`,
    // },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("No response from the server");
  }
 
};

export const updateMovie = async (url: string, data: MovieFormData) => {
  
  // const {accessToken} = await getAccessToken();
  // console.log(accessToken)
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("year", data.year.toString());
  formData.append("score", data.score.toString());
  formData.append("country", data.country);
  formData.append("description", data.description);

  if (Array.isArray(data.genres)) {
    for (const genre of data.genres) {
      formData.append("genres", genre);
    }
  }
  if (data.image) {
    formData.append("image", data.image[0]);
  }
 
  const response = await fetch(url, {
    method: "PUT", cache: "no-store",
    // headers: {
    //   authorization: `Bearer ${accessToken}`,
    // },
    body: formData,
  });
  if (!response.ok) {
    throw new Error("No response from the server");
  }
};

export const deleteMovie = async (endpoint: string) => {
  // const session = await getSession();
  // if (!session) {
  //   return;
  // }
  // const {accessToken} = await getAccessToken();
  

  const response = await fetch(endpoint, {
    method: "DELETE", cache: "no-store",
    // headers: {
    //   authorization: `Bearer ${accessToken}`,
    // },
  });

  if (!response.ok) {
    throw new Error("No response at server");
  }
};
export const getMovieById = async (url: string) => {
  // const session = await getSession();
  // if (!session) {
  //   return;
  // }
  // const token = await getAccessToken();
  // console.log(token.accessToken)

  const response = await fetch(url, {
    method: "GET",
    // headers: {
    //   authorization: `Bearer ${token.accessToken}`,
    // },
  });

  return (await response.json()) as MoviesType;
};

export const updateMovieLikedStatus = async (movieID: string, isLiked: boolean) => {
  // const session = await getSession();
  // if (!session) {
  //   return;
  // }
  // const {accessToken} = await getAccessToken();
  // console.log(accessToken)
  // const token = accessToken?.toString()

  const response = await fetch(`http://localhost:3005/movies/like/${movieID}`, {
    method: "PUT", cache: "no-store",
    headers: {
      // authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isLiked }), // Send Liked status
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("No response from the server");
  }
};
