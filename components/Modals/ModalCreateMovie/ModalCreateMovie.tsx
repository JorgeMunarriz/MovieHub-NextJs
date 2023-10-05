"use client";

import { NEXT_URL_MOVIES } from "@/global/serverUrl";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import "./modalCreateMovie.css";
import { useRouter } from "next/navigation";
import { createMovie } from "@/service/moviesRequest.service";

const ModalCreateMovie = () => {
  
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const { register, handleSubmit } = useForm();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };
  const onsubmit = handleSubmit((data: any) => {
    if (data.title && data.score && data.year && data.country && data.genres && data.description) {
      const movieData = {
        ...data,
        genres: data.genres.split(",").map((genre: string) => genre.trim()),
      };
      // const urlEndpont = `${user?.email}`;

      createMovie(`${NEXT_URL_MOVIES}/${user?.email}`, movieData);
      router.refresh();
      setIsOpen(!modalIsOpen);
    } else {
      console.error("The data does not have the correct structure.");
    }
  });
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="modal">
      {user && (
        <button className="modal__btn-open" onClick={toggleModal}>
          Add
        </button>
      )}

      {modalIsOpen && (
        <div className="modal__container">
          <div className="modal__container-content">
            <h2 className="modal__container-content-title">Add Movie</h2>
            <form className="form__modal" onSubmit={onsubmit}>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalTitle">
                  Movie's Name
                </label>
                <input className="form__modal-div-input" type="text" id="formModalTitle" placeholder="Iron Man" {...register("title")} />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalScore">
                  Movie's Score
                </label>
                <input className="form__modal-div-input" type="text" id="formModalScore" placeholder="1-100" {...register("score")} />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalYear">
                  Movie's Year
                </label>
                <input className="form__modal-div-input" type="text" id="formModalYear" placeholder="2008" {...register("year")} />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalCountry">
                  Movie's Country
                </label>
                <input className="form__modal-div-input" type="text" id="formModalCountry" placeholder="USA" {...register("country")} />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalGenre">
                  Movie's Genres
                </label>
                <input className="form__modal-div-input" type="text" id="formModalGenre" placeholder="Action, Adventure..." {...register("genres")} />
              </div>
              <div className="form__modal-div">
                <label className="form__modal-div-label" htmlFor="formModalDescription">
                  Movie's Description
                </label>
                <textarea className="form__modal-div-textarea" id="formModalDescription" placeholder="Description" {...register("description")} />
              </div>
              <div className="form__modal-div-img">
                {selectedFile && <img className="form__modal-div-img-imgPreview" src={URL.createObjectURL(selectedFile)} alt="Preview" />}
                <label className="form__modal-div-label-uploadFile" htmlFor="formModalFile">
                  Upload Image
                </label>
                <input className="form__modal-div-input-img" type="file" id="formModalFile" {...register("image")} onChange={handleFileChange} />
              </div>
              <button className="form__modal-btnAddMovie" type="submit">
                Add Movie
              </button>
            </form>
            <button className="modal__container-content-button" onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default ModalCreateMovie;
