"use client"
// import { Suspense, LazyExoticComponent, ComponentType, lazy, } from "react";
// import MyLoader from "@/public/skeleton/loader";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";
import Cards from "@/components/Cards/Cards";
import { getDataApiMovies, getDataApiPublicMovies } from "@/service/dataApiRequest.service";

const CardContainerStyles = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 20px;
`;

// const LazyCards: LazyExoticComponent<ComponentType<any>> = lazy(() => {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       return resolve(import("../Cards/Cards"));
//     }, 500);
//   });
// });

const CardContainer = async () => {
  // const { moviesData } = useMovieContext();
  const { user } = useUser();

  //   const [isLoading, setIsLoading] = useState(false)

  // const [searchParams, setSearchParams] = useSearchParams();
  // const query = searchParams.get('q') || '';

  // const handleChangeParams = ({target}: React.ChangeEvent<HTMLInputElement>) => {
  // 	setSearchParams({q: target.value});
  // };
  //   useEffect(() => {
  //     // fetchMovies();
  //   }, []);

  // const [movies, setMovies] = useState<MoviesType[]>([]);
  // useEffect(() => {
  //   const fetchMovies = async () => {
  //     const data = await getDataApiPublic();
  //     setMovies(data);
  //   };

  //   fetchMovies();
  // }, []);
  // console.log(moviesData)

  const movies = await getDataApiPublicMovies()
  const moviesData = await getDataApiMovies()
  console.log(moviesData)

  return (
    <>
      <CardContainerStyles>
        {moviesData && user
          ? moviesData.map(({ id, title, score, year, country, genres, genresArray, createdAt, updatedAt, image, imageUrl, imageId, users, isLiked }) => (
              // <Suspense key={id} fallback={<MyLoader />}>
                <Cards
                  key={id}
                  id={id}
                  title={title}
                  score={score}
                  year={year}
                  country={country}
                  genres={genres}
                  imageUrl={imageUrl}
                  genresArray={genresArray}
                  image={image}
                  imageId={imageId}
                  createdAt={createdAt}
                  updatedAt={updatedAt}
                  users={users}
                  isLiked={isLiked}
                />
              // </Suspense>
            ))
          : movies.map((movies) => (
              // <Suspense key={movies.id} fallback={<MyLoader />}>
                <Cards
                  key={movies.id}
                  id={movies.id}
                  title={movies.title}
                  score={movies.score}
                  year={movies.year}
                  country={movies.country}
                  genres={movies.genres}
                  imageUrl={movies.imageUrl}
                  genresArray={movies.genresArray}
                  image={movies.image}
                  imageId={movies.imageId}
                  createdAt={movies.createdAt}
                  updatedAt={movies.updatedAt}
                  users={movies.users}
                  isLiked={movies.isLiked}
                />
              // </Suspense>
            ))}
      </CardContainerStyles>
    </>
  );
};
export default CardContainer;


