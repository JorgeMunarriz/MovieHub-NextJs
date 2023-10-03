import Cards from "@/components/Cards/Cards";
import { getDataApiMovies, getDataApiPublicMovies } from "@/service/dataApiRequest.service";
import React, { Suspense } from "react";
import styles from "./moviePage.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import { Metadata } from "next";import SkeletonCards from "@/components/Skeleton/SkeletonCards";
import Redirect from "@/components/Redirect/Redirect";
"@/global/serverUrl";

export const metadata: Metadata = {
  title: "Movie's page ",
  description: "Movies Page.",
  icons: {
    icon: "/assets/logo/movie-icon.webp",
  },
};

const Movie = async () => {
  const session = await getSession()
  const movies = await getDataApiMovies();
  

  if (!session) {
    return <Redirect to="/" time={1000} />;
  }

  return (
    <div className={styles.moviesPage}>
      <div className={styles.moviesPage__header}>
      <h2 className={styles.moviesPage__header_title}>{session?.user.name}'s Movies</h2>
      </div>
      <div className={styles.moviesPage__cardContainer}>
      {movies?.map(
        (movie) => (
          <Suspense fallback={<SkeletonCards/>}>
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
            />

          </Suspense>
        )
       
      )}
      </div>
    </div>
  );
};

export default Movie;
