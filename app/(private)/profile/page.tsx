import Profile from "@/components/Profile/Profile";
import Redirect from "@/components/Redirect/Redirect";
import { getSession } from "@auth0/nextjs-auth0";

const ProfilePage = async () => {
  const session = await getSession();

  if (session) {
    return <Profile />;
  }
  if (!session) {
    return <Redirect to="/" time={1000} />;
  }
};
export default ProfilePage;
