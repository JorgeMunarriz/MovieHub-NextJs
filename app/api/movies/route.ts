import { NEXT_URL } from "@/global/serverUrl";
import { MoviesType } from "@/types/movies.types";

 const getDataApiPublic = async () => {  
    try {
      const response = await fetch(`${NEXT_URL}publicmovies`);
      return await response.json() as MoviesType[];
      
      
    } catch (error) {
      throw new Error("error fetching data");
    }
}
export default getDataApiPublic