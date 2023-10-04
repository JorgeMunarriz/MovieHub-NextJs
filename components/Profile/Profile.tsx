"use client";
import LogOutButton from "@/components/Buttons/LogOutButton/LogOutButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import { createUser, getUserByID } from "@/service/userReques.service";
import { NEXT_URL_USERS } from "@/global/serverUrl";
import "./profile.css";
import ModalDeleteUser from "../Modals/ModalDeleteUser/ModalDeleteUser";
import { useEffect, useState } from "react";

export const Profile = () => {
  const { user, isLoading, error } = useUser();
  const [id, setId] = useState("");

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
        <h2 className="profilePage__container__h2">Please wait, something go wrong...</h2>
      </div>
    );
  }
  if (user) {
    useEffect(() => {
      const userByEmail = async () => {
        if (user.email) {
          const userId = await getUserByID(user?.email);
          console.log(userId);
          setId(userId.id);
        }
      };
      userByEmail();
      if (getUserByID === undefined) {
        createUser(NEXT_URL_USERS, user);
      }
    }, [user.email]);
  }
  if (user) {
    return (
      user && (
        <div className="profilePage">
          <div className="profilePage__container">
            <div className="profilePage__container__content">
              {user ? (
                <img className="profilePage__container__content-img" src={user?.picture} alt={user?.name} width={100} height={100} />
              ) : (
                <img className="profilePage__container__content-img" src={"/assets/img/deadpool-4K-small.jpg"} alt={"Deadpool Image"} width={100} height={100} />
              )}
            </div>
            <h2 className="profilePage__container__h2">Hi, {user?.name}! </h2>
            <p className="profilePage__container__paragraph">Your email: {user?.email}</p>
            <LogOutButton />
            <ModalDeleteUser id={id} />
          </div>
        </div>
      )
    );
  }
};
export default Profile;
