"use client";
import { MoviesType } from "@/types/movies.types";

import styles from "./card.module.css";
import LikeButton from "../Buttons/LikeButton/LikeButton";
import ModalDeleteMovie from "../Modals/ModalDeleteMovie/ModalDeleteMovie";
import ModalUpdateMovie from "../Modals/ModalUpdateMovie/ModalUpdateMovie";

const Cards = ({ ...props }: MoviesType) => {
  const isPublicMovie = props.public === true;

  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        {!isPublicMovie && (
          <div className={styles.card__header_divHeart}>
            <LikeButton id={props.id} isLiked={props.isLiked} />
          </div>
        )}
        <img className={styles.card__header_img} src={props.imageUrl} alt={props.title} />
      </div>
      <div className={styles.card__main}>
        <p className={styles.card__main_country}>
          {props.country},{props.year}
        </p>
        <h2 className={styles.card__main_titleMovie}>{props.title}</h2>
        <h3 className={styles.card__main_scoreMovie}>
          Score:{props.score}/100 <img className={styles.card__main_scoreMovie_imdbLogo} src={"/assets/logo/imdb.png"} alt={"imdb"} />
        </h3>
        <p></p>

        <div className={styles.card__main_div}>
          <h3 className={styles.card__main_div_genreMovie}>
            Genres:
            <ul className={styles.card__main_div_ul}>
              <li className={styles.card__main_div_ul_genresList}>{props.genresArray.join(", ")}</li>
            </ul>
          </h3>
        </div>
        {!isPublicMovie && (
          <div className={styles.card__footer}>
            <a className={styles.card__footer_detailsLink} href={`/movie/${props.id}`}>
              Details
            </a>
            <div className={styles.card__footer_div}>
              <ModalDeleteMovie key={props.id} {...props} />
              <ModalUpdateMovie
                id={props.id}
                title={props.title}
                score={props.score}
                year={props.year}
                country={props.country}
                image={props.image}
                genres={props.genres}
                genresArray={props.genresArray}
                createdAt={props.createdAt}
                updatedAt={props.updatedAt}
                users={props.users}
                imageId={props.imageId}
                imageUrl={props.imageUrl}
                isLiked={props.isLiked}
                description={props.description}
                public={false}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cards;
