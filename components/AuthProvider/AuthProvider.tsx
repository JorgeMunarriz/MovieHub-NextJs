

import React from "react";
import Header from "@/components/MainContainer/Header/Header";
import { getSession } from "@auth0/nextjs-auth0";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = async ({ children }: Props) => {
  const session = await getSession();
  return <>{children}</>;
};

export default AuthProvider;
