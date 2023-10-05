"use client"
import { useRouter } from "next/navigation";
import {  BsChevronLeft } from "react-icons/bs";
import styles from "./navigationButton.module.css"


const NavigationButton = () => {
    const router = useRouter()
  const handleNavigationBack = () => {
    router.back();

  };

  return <button className={styles.button__navigation} onClick={handleNavigationBack}><BsChevronLeft/></button>;
};

export default NavigationButton;
