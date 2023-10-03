"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import { MoviesType } from "@/types/movies.types";
import styled from "styled-components";
import { getMovieById, updateMovie } from "@/service/moviesRequest.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import "./modalUpdateMovie.css"

// const ModalUpdateMovieStyles = styled.div`
//   display: flex;
//   .modal__btn-open {
//     display: flex;
//     align-items: center;
//     justify-content: space-around;
//     gap: 0.5rem;
//     padding: 8px 16px;
//     background-color: rgba(230, 55, 55, 0.6);
//     color: #fff;
//     border: none;
//     border-radius: 20px;
//     cursor: pointer;
//     transition: all 0.3s;
//     &:hover {
//       background-color: rgba(230, 55, 55, 0.9);
//     }
//   }
// `;

// const ModalUpdateContainer = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   right: 0;
//   bottom: 0;
//   background-color: rgba(0, 0, 0, 0.5);
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   z-index: 100;
// `;

// const ModalUpdateContent = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   width: 50vw;
//   background-color: #fff;
//   padding: 20px;
//   border-radius: 8px;
//   box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
//   .form__div {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     border-bottom: 1px solid rgba(0, 0, 0, 0.9);
//     &-title {
//       font-size: 2.5rem;
//     }
//   }
//   .form__modal {
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 0.5rem;
//     width: 40vw;
//     &-div {
//       display: flex;
//       flex-direction: column;
//       &-label {
//         font-size: 1rem;
//         color: rgba(50, 50, 50, 0.8);
//         &-uploadFile {
//           padding: 15px;
//         }
//       }
//       &-input {
//         font-size: 1rem;
//         color: rgba(50, 50, 50, 0.8);
//         border-radius: 15px;
//         padding: 5px;
//       }
//       &-img {
//         display: flex;
//         flex-direction: row-reverse;
//         &-imgPreview {
//           width: 100px;
//         }
//       }
//     }
//     &-btnAddMovie {
//       margin-top: 10px;
//       width: 200px;
//       padding: 8px 16px;
//       background-color: rgba(0, 123, 250, 0.8);
//       color: #fff;
//       border: none;
//       border-radius: 20px;
//       cursor: pointer;
//       &:hover {
//         background-color: rgba(0, 123, 250, 0.6);
//       }
//     }
//   }
// `;
// const ModalUpdateButton = styled.button`
//   margin-top: 10px;
//   padding: 8px 16px;
//   width: 200px;
//   background-color: rgba(50, 50, 50, 0.8);
//   color: #fff;
//   border: none;
//   border-radius: 20px;
//   cursor: pointer;
//   &:hover {
//     background-color: rgba(50, 50, 50, 0.6);
//   }
// `;

const ModalUpdateMovie = ({ id, title, score, year, country, genresArray, image, genres, description }: MoviesType) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const [movieData, setMovieData] = useState({ title, year, score, country, genresArray, image, genres, description });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const { register, handleSubmit } = useForm<MoviesType>();
  console.log(user);

  useEffect(() => {
    if (modalIsOpen) {
      const url = `${NEXT_URL_MOVIES}/${id}`;
      getMovieById(url).then((movie) => {
        console.log(movie);
        if (movie) {
          setMovieData({
            title: movie.title,
            year: movie.year,
            score: movie.score,
            country: movie.country,
            genresArray: movie.genresArray,
            image: movie.image,
            genres: movie.genres,
            description: movie.description
          });
          setImagePreview(movie.imageUrl);
        } else {
          console.log("Movie not found");
        }
        return movie;
      });
    }
  }, [modalIsOpen, id]);

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onsubmit = handleSubmit((data: any) => {
    const url = `${NEXT_URL_MOVIES}/${id}`;
    const updatedData = {
      ...data,
      genres: data.genres.split(",").map((genre: string) => genre.trim()),
    };
    updateMovie(url, updatedData);
    setIsOpen(!modalIsOpen);
  });

  return (
    <div className="modal">
      {user && (
        <button className="modal__btn-open" onClick={toggleModal}>
          Update
        </button>
      )}

      {modalIsOpen && (
        <div className="modal__container">
          <div className="modal__container-content">
            <h2>Update Movie</h2>
            <form className="form__modal" onSubmit={onsubmit}>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalTitle">
                  Movie's Name
                </label>
                <input
                  className="form__modal-div-input"
                  type="text"
                  id="formModalTitle"
                  {...register("title")}
                  value={movieData.title}
                  onChange={(e) => setMovieData({ ...movieData, title: e.target.value })}
                />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalScore">
                  Movie's Score
                </label>
                <input
                  className="form__modal-div-input"
                  type="number"
                  id="formModalScore"
                  {...register("score")}
                  value={movieData.score.toString()}
                  onChange={(e) => setMovieData({ ...movieData, score: parseInt(e.target.value, 10) })}
                />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalYear">
                  Movie's Year
                </label>
                <input
                  className="form__modal-div-input"
                  type="number"
                  id="formModalYear"
                  {...register("year")}
                  value={movieData.year.toString()}
                  onChange={(e) => setMovieData({ ...movieData, year: parseInt(e.target.value, 10) })}
                />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalCountry">
                  Movie's Country
                </label>
                <input
                  className="form__modal-div-input"
                  type="text"
                  id="formModalCountry"
                  {...register("country")}
                  value={movieData.country}
                  onChange={(e) => setMovieData({ ...movieData, country: e.target.value })}
                />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalGenre">
                  Movie's Genres
                </label>
                <input
                  className="form__modal-div-input"
                  type="text"
                  id="formModalGenre"
                  {...register("genres")}
                  value={movieData.genresArray}
                  onChange={(e) => setMovieData({ ...movieData, genresArray: e.target.value.split(",") })}
                />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalDescription">
                  Movie's Description
                </label>
                <input className="form__modal-div-input" type="text" id="formModalDescription" placeholder="Description" {...register("description")} />
              </div>
              <div className="form__modal-div-img">
                {selectedFile ? (
                  <img className="form__modal-div-img-imgPreview" src={URL.createObjectURL(selectedFile)} alt="Preview" />
                ) : (
                  <img className="form__modal-div-img-imgPreview" src={imagePreview} alt="Preview" />
                )}
                <label className="form__modal-div-label-uploadFile" htmlFor="formModalFile">
                  Upload Image
                </label>
                <input className="form__modal-div-input" type="file" id="formModalFile" {...register("image")} onChange={handleFileChange} />
              </div>
              <button className="form__modal-btnAddMovie" type="submit" onClick={toggleModal}>
                Update Movie
              </button>
            </form>
            <button className="modal__container-content-button" onClick={toggleModal}>Close Modal</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalUpdateMovie;
