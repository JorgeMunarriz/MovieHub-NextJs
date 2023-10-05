
import { NEXT_URL_MOVIES } from '@/global/serverUrl';
import { deleteMovie, getMovieById } from '@/service/moviesRequest.service';
import { useUser } from '@auth0/nextjs-auth0/client';
import React, { useEffect, useState } from 'react'
import styles from "../modalDeleteMovie.module.css"
import { getSession } from '@auth0/nextjs-auth0';
type Props = {
    id: string
    className: string;
    children: React.ReactNode
}

const ButtonsModalDelete = async ({id, className, children}: Props) => {
    const [modalIsOpen, setIsOpen] = useState(false);


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
    <>
    <button onClick={toggleModal} className={className} >{children}</button>

    
    {modalIsOpen && (
        <div className={styles.modal__container}>
          <div className={styles.modal__container__content}>
            <h2 className={styles.modal__container__content_title}>Are you sure to delete Movie?</h2>

            <button className={styles.modal__container__content_deleteButton} onClick={handleDelete}>Delete this movie</button>

            <button className={styles.modal__container__content_closeButton} onClick={toggleModal}>Close Modal</button>
          </div>
        </div>
      )}
    </>
  )
}

export default ButtonsModalDelete