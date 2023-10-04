"use client";
import { BsHeartFill, BsHeart } from "react-icons/bs";
import styles from "./likeButton.module.css";
import { updateMovieLikedStatus } from "@/service/moviesRequest.service";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  id: string;
  isLiked: boolean;
};

const LikeButton = ({ id, isLiked }: Props) => {
  const router = useRouter();
  const [liked, setLiked] = useState(isLiked)

  const toggleLikedStatus = async (id: string) => {
    // Verifica si al usuario le gusta la película o no
    const isCurrentLiked = !isLiked;
    // Llama a la función de servicio para actualizar el estado "liked" en el servidor
    await updateMovieLikedStatus(id, isCurrentLiked);
    setLiked(isCurrentLiked)
    router.refresh();
  };

  const handleLiked = async () => {
    await toggleLikedStatus(id);
  };

  return liked ? (
    <button className={styles.divHeart_button} onClick={() => handleLiked()}>
      <BsHeartFill />
    </button>
  ) : (
    <button className={styles.divHeart_button} onClick={() => handleLiked()}>
      <BsHeart />
    </button>
  );
};

export default LikeButton;
