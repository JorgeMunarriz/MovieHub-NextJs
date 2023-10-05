import Link from "next/link";
import LogOutButton from "@/components/Buttons/LogOutButton/LogOutButton";
import ModalCreateMovie from "@/components/Modals/ModalCreateMovie/ModalCreateMovie";
import styles from "./header.module.css";
import { getSession } from "@auth0/nextjs-auth0";
import NavigationButtonBack from "@/components/Buttons/NavigationButton/NavigationButtonBack";
import NavigationButtonForward from "@/components/Buttons/NavigationButton/NavigationButtonForward";

const Header = async () => {
  const session = await getSession();

  return (
    <header className={styles.header}>
      <div className={styles.header__left}>
        <h1 className={styles.header__left_title}>
          <Link className={styles.header__left_title_link} href={"/"}>
            MovieHub
          </Link>
        </h1>
        <NavigationButtonBack/>
        <NavigationButtonForward/>
      </div>
      <div className={styles.header__right}>
        {session ? (
          <div className={styles.header__right_div}>
            <Link href={"/profile"} className={styles.header__right_div_signbtn}>
              Profile
            </Link>
            <Link href={"/movie"} className={styles.header__right_div_signbtn}>
              Movie
            </Link>
            <LogOutButton />
            <ModalCreateMovie />
          </div>
        ) : (
          <a className={styles.header__right_div_signbtn} href={"/api/auth/login"}>
            Log In
          </a>
        )}
      </div>
    </header>
  );
};

export default Header;
