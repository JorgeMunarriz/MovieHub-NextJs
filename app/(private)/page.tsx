import React from "react";

import Redirect from "@/components/Redirect/Redirect";
import { getSession } from "@auth0/nextjs-auth0";

const PrivatePage = async () => {
  const session = await getSession();
  console.log(session)

  if (session) {
    return <Redirect to="/movie" time={0} />;
  }
  if (!session) {
    return <Redirect to="/" time={1000} />;
  }
};

export default PrivatePage;
