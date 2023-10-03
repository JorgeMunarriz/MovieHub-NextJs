"use client"
import { BsFacebook, BsGithub, BsInstagram, BsTwitter, BsYoutube} from 'react-icons/bs'
import styles from "./footer.module.css";



const Footer = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__header}>
          <ul className={styles.footer__header_socialmedia}>
            <li className={styles.footer__header_socialmedia_list}><a href="https://www.facebook.com/"  className={styles.footer__header_socialmedia_list_link} target='_blanck'><BsFacebook/></a></li>
            <li className={styles.footer__header_socialmedia_list}><a href="https://www.github.com/"  className={styles.footer__header_socialmedia_list_link} ><BsGithub/></a></li>
            <li className={styles.footer__header_socialmedia_list}><a href="https://www.instagram.com/" className={styles.footer__header_socialmedia_list_link}  ><BsInstagram/></a></li>
            <li className={styles.footer__header_socialmedia_list}><a href="https://www.twitter.com/"  className={styles.footer__header_socialmedia_list_link} ><BsTwitter/></a></li>
            <li className={styles.footer__header_socialmedia_list}><a href="https://www.youtube.com/"  className={styles.footer__header_socialmedia_list_link} ><BsYoutube/></a></li>
          </ul>

        </div>
        <div className={styles.footer__main}>
          <ul className={styles.footer__main_terms}>
            <li className={styles.footer__main_terms_list}>Conditions of use</li>
            <li className={styles.footer__main_terms_list}>Privacy & Policy</li>
            <li className={styles.footer__main_terms_list}>Press Room</li>
            </ul>

        </div>
          <p className={styles.footer__footer_copyright}>© 2023 Copyright JorgeMunarrizdev</p>
        <div className={styles.footer__footer}>
        </div>
    </footer>
  )
}
export default Footer;
