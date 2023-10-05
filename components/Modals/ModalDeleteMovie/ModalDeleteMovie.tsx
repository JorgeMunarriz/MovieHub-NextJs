"use client";
import { useState, Suspense } from "react";
import { deleteMovie} from "@/actions/movies.actions";
import { MoviesType } from "@/types/movies.types";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./modalDeleteMovie.module.css";
import { useRouter } from "next/navigation";
import SkeletonButtons from "@/components/Skeleton/SkeletonButtons";
import { NEXT_URL_MOVIES } from "@/global/serverUrl";



const ModalDeleteMovie = ({ id }: MoviesType) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const url = `${NEXT_URL_MOVIES}/${id}`;

  const handleDelete = async () => {
    await deleteMovie(url);
    router.refresh();
    setIsOpen(false);
  };

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  return (
    <div className={styles.modal}>
      <Suspense key={`${id}ModalDelete`} fallback={<SkeletonButtons />}>
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
