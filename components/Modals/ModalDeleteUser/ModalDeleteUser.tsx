"use client";
import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./modalDeleteUser.module.css";
import { deleteUser } from "@/actions/users.actions";
import { useRouter } from "next/navigation";
import { useState, } from "react";

type Props = {
  id: string
}
const ModalDeleteUser = ({id}: Props) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const toggleModal = () => {
    setIsOpen(!modalIsOpen);
  };

  const handleDeleteUser = async () => {
    deleteUser(id);
    router.refresh();
  };

  return (
    <div className={styles.modal}>
      {user && (
        <button id={id} className={styles.modal__btn_open} onClick={toggleModal}>
          Delete User
        </button>
      )}
      {modalIsOpen && (
        <div className={styles.modal__container}>
          <div className={styles.modal__container__content}>
            <h2 className={styles.modal__container__content_title}>Are you sure to delete Movie?</h2>
            <a href="/api/auth/logout" onClick={() => handleDeleteUser()} className={styles.modal__container__content_deleteButton}>
              Delete user
            </a>
            <button className={styles.modal__container__content_closeButton} onClick={toggleModal}>
              Close Modal
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalDeleteUser;
