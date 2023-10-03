"use client"
import { useRouter } from 'next/navigation'
import React from 'react'
import styles from "./redirect.module.css"



const Redirect: React.FC<{to: string, time: number}> = ({to, time}) => {
    const router = useRouter()
    setTimeout(() =>{
        router.push(to)
    },time)
  return (
    <div className={styles.redirect}>
        <h2 className={styles.redirect_title}>
        You'll going to redirect to home.

        </h2>
        </div>
  )
}

export default Redirect