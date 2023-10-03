import { useUser } from "@auth0/nextjs-auth0/client";
import styles from "./logOutButton.module.css"



const LogOutButton = () => {
  return <a href="/api/auth/logout" className={styles.buttonLogOut}>Log Out</a>;
};

export default LogOutButton;
