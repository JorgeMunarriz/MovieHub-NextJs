import { BsHeartFill } from "react-icons/bs";
import { getMovieById } from "@/service/moviesRequest.service";
import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import "./moviesDetailPage.css";
import LikeButton from "@/components/Buttons/LikeButton/LikeButton";
import { getSession } from "@auth0/nextjs-auth0";
import Redirect from "@/components/Redirect/Redirect";
import ModalUpdateMovie from "@/components/Modals/ModalUpdateMovie/ModalUpdateMovie";
import ModalDeleteMovie from "@/components/ModalDeleteMovie/ModalDeleteMovie";

type Props = {
  params: {
    movieID: string;
  };
};

const MoviesPageDetail = async ({ params }: Props) => {
  const session = await getSession();

  const url = `${NEXT_URL_MOVIES}/${params.movieID}`;
  const movieData = await getMovieById(url);

  if (!session) {
    return <Redirect to="/" time={1000} />;
  }
  if (session) {
    return (
      <div className="movie">
        <div className="movieDetails__header">
          <img className="movieDetails__header-img" src={movieData.imageUrl} alt={movieData.title} />
        </div>
        <div className="movieDetails__main">
          <p className="movieDetails__main_country">
            Country: <span className="movieDetails__main_country_span">{movieData.country}, </span> <span className="movieDetails__main_country_span">year: {movieData.year}</span>
          </p>
          <h2 className="movieDetails__main-titleMovie">
            {movieData.title}
            <div className="movieDetails__main-titleMovie-divHeart">
              <LikeButton id={movieData.id} isLiked={movieData.isLiked} />
            </div>
          </h2>

          <h3 className="movieDetails__main-scoreMovie">
            Score: <span className="movieDetails__main-scoreMovie-span">{movieData.score}/100 </span>{" "}
            <img className="movieDetails__main-scoreMovie-imdbLogo" src={"/assets/logo/imdb.png"} alt="IMDB-logo" />
          </h3>
          <div className="movieDetails__main-genresMovie">
            <h3 className="movieDetails__main-genresMovie-title">
              Genres:
              <ul className="movieDetails__main-genresMovie-ul">
                <li className="movieDetails__main-genresMovie-ul-genresList">{movieData?.genresArray.join(", ")}</li>
              </ul>
            </h3>
          </div>
          <div className="movieDetails__footer">
            {session.user && (
              <div className="movieDetails__footer_containerButtons">
                <ModalDeleteMovie {...movieData} />
                <ModalUpdateMovie {...movieData} />
              </div>
            )}
            {session.user && (
              <div className="movieDetails__footer_containerDescription">
                <p className="movieDetails__footer_containerDescription_text">Movie's description: {movieData.description}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
};
export default MoviesPageDetail;
