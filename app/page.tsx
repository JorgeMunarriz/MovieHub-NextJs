import { getAccessToken, getSession } from "@auth0/nextjs-auth0";
import styles from "./page.module.css";
import { getDataApiPublicMovies } from "@/service/dataApiRequest.service";
import Cards from "@/components/Cards/Cards";
import { Suspense } from "react";
import SkeletonCards from "@/components/Skeleton/SkeletonCards";

async function Home() {
 
  

  const movies = await getDataApiPublicMovies();

  return (
    <div className={styles.homePage}>
      <div className={styles.homePage__header}>
        <h2 className={styles.homePage__header_title}>Public List of Movies</h2> 
      </div>
      <div className={styles.homePage__main}>
        <div className={styles.cardContainer}>
          {movies.map(
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
                  public={true}
                  description={movie.description}
                />

              </Suspense>
            )
          )}
        </div>
      </div>
      <div className={styles.homePage__footer}>
        <button className={styles.mainhomePage__footer_buttonViewMore}>View more</button>
      </div>
    </div>
  );
}
export default Home;
