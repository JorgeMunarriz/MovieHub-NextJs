"use client";
import LogOutButton from "@/components/Buttons/LogOutButton/LogOutButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createUser, getUserByID } from "@/service/userReques.service";
import { NEXT_URL_USERS } from "@/global/serverUrl";
import "./profile.css";
import ModalDeleteUser from "../Modals/ModalDeleteUser/ModalDeleteUser";
import { useEffect, useState } from "react";
import Redirect from "../Redirect/Redirect";

export const Profile = () => {
  const { user, isLoading, error } = useUser();
  const [id, setId] = useState("");

  const CreateUserData = async () => {
    if (user && user.email) {
      const userId = await getUserByID(user.email);
      setId(userId?.id);

      if (userId === null) {
        // If the user doesn't exist, create a new one
        createUser(NEXT_URL_USERS, user);
      }
    }
  };

  useEffect(() => {
    if (!isLoading && !error) {
      CreateUserData();
    }
  }, [user, isLoading, error]);

  if (isLoading) {
    return (
      <div className="profilePage__loading ">
        <h2 className="profilePage__container__h2">Please wait, is loading...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profilePage profilePage__container">
        <h2 className="profilePage__container__h2">Please wait, something went wrong...</h2>
      </div>
    );
  }

  if (!user) {
    return <Redirect to="/" time={1000} />;
  }

  return (
    <div className="profilePage">
      <div className="profilePage__container">
        <div className="profilePage__container__content">
          {user ? (
            <img className="profilePage__container__content-img" src={user?.picture || ""} alt={user?.name || ""} width={100} height={100} />
          ) : (
            <img className="profilePage__container__content-img" src={"/assets/img/deadpool-4K-small.jpg"} alt={"Deadpool Image"} width={100} height={100} />
          )}
        </div>
        <h2 className="profilePage__container__h2">Hi, {user?.name}! </h2>
        <p className="profilePage__container__paragraph">Your email: {user?.email}</p>
        <div className="profilePage__container__buttons">
          <LogOutButton />
          <ModalDeleteUser id={id} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
