"use client";
import { useState, useEffect, Suspense } from "react";
import { NEXT_URL_MOVIES } from "../../global/serverUrl";
import { deleteMovie, getMovieById } from "@/service/moviesRequest.service";
import { MoviesType } from "@/types/movies.types";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./modalDeleteMovie.module.css";
import dynamic from "next/dynamic";

const LazyButtons = dynamic(() => import("../Skeleton/SkeletonButtons"));
const ButtonsModalDelete = dynamic(() => import("./ButtonsModalDelete/ButtonsModalDelete"));

const ModalDeleteMovie = ({ id }: MoviesType) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();

  const url = `${NEXT_URL_MOVIES}/${id}`;

  const handleDelete = async () => {
    await deleteMovie(url);
    setIsOpen(false);
  };

  useEffect(() => {
    if (modalIsOpen) {
      const url = `${NEXT_URL_MOVIES}/${id}`;
      getMovieById(url).then((movie) => {
        if (movie) {
          console.log(movie);
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

  return (
    <div className={styles.modal}>
      <Suspense fallback={<LazyButtons />}>
        {user && (
          <button id={id} className={styles.modal__btn_open} onClick={toggleModal}>
            Delete
          </button>
        )}
      </Suspense>
      {modalIsOpen && (
        <div className={styles.modal__container}>
          <div className={styles.modal__container__content}>
            <h2 className={styles.modal__container__content_title}>Are you sure to delete Movie?</h2>

            <button className={styles.modal__container__content_deleteButton} onClick={handleDelete}>
              Delete this movie
            </button>

            <button className={styles.modal__container__content_closeButton} onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDeleteMovie;
