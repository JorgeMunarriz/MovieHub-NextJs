import React from "react";
import { getSession } from "@auth0/nextjs-auth0";
import Login from "../Login/Login";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = async ({ children }: Props) => {
  const session = await getSession();
  if (!session) {
    return <Login/>
  }

  if (session) {
    return <>{children}</>;
  }
};

export default AuthProvider;
