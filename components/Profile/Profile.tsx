"use client";
import LogOutButton from "@/components/LogOutButton/LogOutButton";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";
import Image from "next/image";

const ProfileStyles = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .profileDiv {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: flex-start;
    &__div {
      display: flex;
      width: 100px;
      height: 100px;
      border: 1px solid rgba(0, 0, 0, 0.5);
      border-radius: 50%;
      overflow: hidden;
      &-img {
        display: block;
        width: 100px;
        height: 100%;
      }
    }
    &__h2 {
      font-size: 2rem;
      color: rgba(255, 255, 255, 0.8);
    }
    &__paragraph {
      font-size: 1.5rem;
      color: rgba(255, 255, 255, 0.4);
    }
  }
`;

export const Profile = () => {
  const { user, isLoading, error } = useUser();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error...</div>;
  }
  if (user) {
    return (
      user && (
        <ProfileStyles>
          <div className="profileDiv">
            <div className="profileDiv__div">
              <img className="profileDiv__div-img" src={user?.picture} alt={user?.name} width={100} height={100} />
            </div>
            <h2 className="profileDiv__h2">Hi, {user?.name}! </h2>
            <p className="profileDiv__paragraph">Your email: {user?.email}</p>
            <LogOutButton />
          </div>
        </ProfileStyles>
      )
    );
  }
};
export default Profile;
