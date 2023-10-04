"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { MoviesType } from "@/types/movies.types";
import styled from "styled-components";
import { getMovieById, updateMovie } from "@/service/moviesRequest.service";
import { useUser } from "@auth0/nextjs-auth0/client";
import "./modalUpdateMovie.css";
import { useRouter } from 'next/navigation';
import { NEXT_URL_MOVIES } from "@/global/serverUrl";



const ModalUpdateMovie = ({ id, title, score, year, country, genresArray, image, genres, description }: MoviesType) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const [movieData, setMovieData] = useState({ title, year, score, country, genresArray, image, genres, description });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>();
  const { register, handleSubmit } = useForm<MoviesType>();
  const router = useRouter()
  

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
    router.refresh()
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
              <button className="form__modal-btnAddMovie" type="submit">
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
