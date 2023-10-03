import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import { MovieFormData, MoviesType } from "@/types/movies.types";
import { getAccessToken } from '@auth0/nextjs-auth0';
import { revalidatePath, revalidateTag } from "next/cache";


export const createMovie = async (endpoint: string, data: MovieFormData) => {
  // const {accessToken} = await getAccessToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("year", data.year.toString());
  formData.append("score", data.score.toString());
  formData.append("country", data.country);
  if (Array.isArray(data.genres)) {
    for (const genre of data.genres) {
      formData.append("genres", genre);
    }
  }

  if (data.image) {
    formData.append("image", data.image[0]);
  }
  console.log(NEXT_URL_MOVIES)

  // try {
    const response = await fetch(`http://localhost:3005/movies/${endpoint}`, {
      method: "POST",
      // headers: {
      //   authorization: `Bearer ${accessToken}`,
      // },
      body: formData,
    });
    console.log("formdata", formData);
    if (!response.ok)  {
      throw new Error("No response from the server");
    }
  // } catch (error) {
  //   console.log(error);
  // }
};

export const updateMovie = async (url: string, data: MovieFormData) => {
  const {accessToken} = await getAccessToken();
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("year", data.year.toString());
  formData.append("score", data.score.toString());
  formData.append("country", data.country);
  if (Array.isArray(data.genres)) {
    for (const genre of data.genres) {
      formData.append("genres", genre);
    }
  }
  if (data.image) {
    formData.append("image", data.image[0]);
  }

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error("No response from the server");
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteMovie = async (endpoint: string,) => {
  const {accessToken} = await getAccessToken();

  try {
    const response = await fetch(`http://localhost:3005/movies/${endpoint}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    console.log("funcionando");
    if (response.ok) {
      console.log(response);
    } else {
      throw new Error("No response at server");
    }
  } catch (error) {
    console.log(error);
  }
};
export const getMovieById = async (url: string) => {
  const {accessToken} = await getAccessToken();
console.log(accessToken)
  
    const response = await fetch(url, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
   
    return await response.json() as MoviesType;
    
    
  
};


export const updateMovieLikedStatus = async ( movieID: string, isLiked: boolean ) => {
  // const {accessToken} = await getAccessToken();
  // console.log(accessToken)
  // const token = accessToken?.toString()


  try {
    const response = await fetch(`http://localhost:3005/movies/like/${movieID}`, {
      method: "PUT",
      headers: {
        // authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isLiked }), // Send Liked status
    });
    console.log(response)
    if (response.ok) {
      console.log(response);
      revalidatePath("private/movies")
      return true; 
    } else {
      throw new Error("No response from the server");
    }
  } catch (error) {
    console.log(error);
    return false; 
  }
};