import Cards from "@/components/Cards/Cards";
import { getDataApiMovies} from "@/service/dataApiRequest.service";
import React, { Suspense } from "react";
import styles from "./moviePage.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import { Metadata } from "next";
import SkeletonCards from "@/components/Skeleton/SkeletonCards";
import Redirect from "@/components/Redirect/Redirect";
import { getUserByID } from "@/service/userReques.service";
import { MoviesType } from "@/types/movies.types";
("@/global/serverUrl");

export const metadata: Metadata = {
  title: "Movie's page ",
  description: "Movies Page.",
  icons: {
    icon: "/assets/logo/movie-icon.webp",
  },
};

const Movie = async () => {
  const session = await getSession();

  const user = await getUserByID(session?.user.email);
  const movies = user.movies

  if (!session) {
    return <Redirect to="/" time={1000} />;
  }
  if (!movies) {
    return (
      <div className={styles.moviesPage}>
        <div className={styles.moviesPage__header}>
          <h2 className={styles.moviesPage__header_title}>{session?.user.name}'s Movies</h2>
        </div>
        <div className={styles.moviesPage__cardContainer}>Please add movies</div>
      </div>
    );
  }
  if (movies) {
    return (
      <div className={styles.moviesPage}>
        <div className={styles.moviesPage__header}>
          <h2 className={styles.moviesPage__header_title}>{session?.user.name}'s Movies</h2>
        </div>
        <div className={styles.moviesPage__cardContainer}>
          {movies?.map((movie: MoviesType) => (
            <Suspense key={movie.id} fallback={<SkeletonCards />}>
              <Cards
                id={movie.id}
                title={movie.title}
                score={movie.score}
                year={movie.year}
                country={movie.country}
                image={movie.image}
                imageId={movie.imageId}
                imageUrl={movie.imageUrl}
                genres={movie.genres}
                genresArray={movie.genresArray}
                createdAt={movie.createdAt}
                updatedAt={movie.updatedAt}
                users={movie.users}
                isLiked={movie.isLiked}
                public={false}
                description={movie.description}
              />
            </Suspense>
          ))}
        </div>
      </div>
    );
  }
};

export default Movie;
