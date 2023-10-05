"use server"

import { NEXT_URL_USERS } from "@/global/serverUrl";
import { MoviesType } from "@/types/movies.types";
import { getAccessToken } from "@auth0/nextjs-auth0";

export type UserProps = {
  id: string;
  name: string;
  email: string;
  movies: MoviesType[];
};

export const createUser = async (url: string, data: any) => {
  // const token = await getAccessToken();

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // authorization: `Bearer ${token.accessToken}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("No response at server");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  // const token = await getAccessToken();
  try {
    const response = await fetch(NEXT_URL_USERS, {
        method: "GET",
        // headers: {
        //   authorization: `Bearer ${token.accessToken}`,
        // },
      });
    const users = await response.json();
    return users;
  } catch (error) {
    throw new Error("error fetching users");
  }
};

export const getUserByID = async (id: string | null | undefined) => {
    // const token = await getAccessToken();
    
  try {
    const response = await fetch(`${NEXT_URL_USERS}/${id}`, {
      next: {
        tags: ["getUserById"]
      }
    });
    const userById = await response.json();
    // console.log(userById)

    return userById;
  } catch (error) {
    throw new Error("error fetching users");
  }
};
export const updateUserByID = async (id: string) => {
  // const token = await getAccessToken();
  try {
    const response = await fetch(`${NEXT_URL_USERS}/${id}`, {
      method: "PUT",
      // headers: {
      //   authorization: `Bearer ${token.accessToken}`,
      // },
    });
    const userById = await response.json();

    return userById;
  } catch (error) {
    throw new Error("error fetching users");
  }
};

export const deleteUser = async (id: string) => {
  // const token = await getAccessToken();

  try {
    const response = await fetch(`${NEXT_URL_USERS}/${id}`, {
      method: "DELETE",
      // headers: {
      //   authorization: `Bearer ${token.accessToken}`,
      // },
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
