import { getEnvVar } from "@/utils/getEnvVar";
import dotenv from 'dotenv';

dotenv.config();

// Define tipos para las variables de entorno
export const NEXT_URL: string = process.env.NEXT_URL || '';
export const NEXT_URL_USERS: string = process.env.NEXT_URL_USERS || '';
export const NEXT_URL_MOVIES: string = process.env.NEXT_URL_MOVIES || '';
export const NEXT_URL_PUBLIC_MOVIES: string = process.env.NEXT_URL_PUBLIC_MOVIES || '';
export const NEXT_URL_GENRES: string = process.env.NEXT_URL_GENRES || '';


console.log(NEXT_URL),
console.log(NEXT_URL_MOVIES)