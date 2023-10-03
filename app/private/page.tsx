import React from "react";

import Redirect from "@/components/Redirect/Redirect";
import { getSession } from "@auth0/nextjs-auth0";

const PrivatePage = async () => {
  const session = await getSession();

  if (session) {
    return <Redirect to="/private/movie" time={0} />;
  }
  if (!session) {
    return <Redirect to="/" time={1000} />;
  }
};

export default PrivatePage;
