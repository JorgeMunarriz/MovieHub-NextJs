import React from 'react'
import styles from './login.module.css'

type Props = {

}

const Login = (props: Props) => {
  return (
    <div className={styles.div__login}>
    <div className={styles.div__loginPage_background}>
        <div className={styles.div__loginPage_content}>
        <div className={styles.div__loginPage_header}>
        <h2 className={styles.div__loginPage_content_header_title}>Please Log in.</h2>

        </div>
        <div className={styles.div__loginPage_content_main}>
            <a className={styles.div__loginPage_content_main_link} href="/api/auth/login">Log in</a>
        </div>
        <span className={styles.div__loginPage_content_main_span}>Or i'm going to kill you.</span>

        </div>

    </div>

    </div>
  )
}

export default Login