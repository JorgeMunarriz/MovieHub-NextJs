
import { BsHeartFill } from "react-icons/bs";
import { getMovieById } from "@/service/moviesRequest.service";
import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import "./moviesDetailPage.css"
import LikeButton from "@/components/LikeButton/LikeButton";


type Props = {
  params: {
    movieID: string
  }
}


 const MoviesPageDetail = async ({params}: Props) => {
  
  
  const url = `${NEXT_URL_MOVIES}/${params.movieID}`;
  const movieData = await getMovieById(url)
  

  return (
    <div className="movie">
      <div className="movieDetails__header">
        <img className="movieDetails__header-img" src={movieData.imageUrl} alt={movieData.title} />
      </div>
      <div className="movieDetails__main">
        <p className="movieDetails__main-country">
          {movieData.country},{movieData.year}
        </p>
        <h2 className="movieDetails__main-titleMovie">{movieData.title}
        <div className="movieDetails__main-titleMovie-divHeart">
          <LikeButton id={movieData.id} isLiked={movieData.isLiked} />
        </div></h2>
        
        <h3 className="movieDetails__main-scoreMovie">
          Score: {movieData.score}/100 <img className="movieDetails__main-scoreMovie-imdbLogo" src={"/assets/logo/imdb.png"} alt="IMDB-logo" /> 
        </h3>
        <div className="movieDetails__main-div">
          <h3 className="movieDetails__main-div-genreMovie">
            Genres:
            <ul className="movieDetails__main-div-ul">
              <li className="movieDetails__main-div-ul-genresList">{movieData?.genresArray.join(", ")}</li>
            </ul>
          </h3>
        </div> 
       {/* {user && 
        <div>
          <button>Delete Movie</button>
          {/* <ModalUpdateMovie  {...movieData}/> }
       </div> 
       } */}
       </div> 
    </div>
  );
};
export default MoviesPageDetail