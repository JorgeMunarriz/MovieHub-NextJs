
import Link from "next/link";
import LogOutButton from "@/components/LogOutButton/LogOutButton";
import ModalCreateMovie from "@/components/ModalCreateMovie/ModalCreateMovie";
import styles from './header.module.css'
import { getSession } from "@auth0/nextjs-auth0";


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
      </div>
      <div className={styles.header__right}>
        {session ? (
          <div className={styles.header__right_div}>
            <Link href={"/private/profile"} className={styles.header__right_div_signbtn}>
              Profile
            </Link>
            <Link href={"/private/movie"} className={styles.header__right_div_signbtn}>
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
