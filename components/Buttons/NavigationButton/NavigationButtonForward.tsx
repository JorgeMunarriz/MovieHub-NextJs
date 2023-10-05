"use client"
import { useRouter } from "next/navigation";
import React from "react";
import {BsChevronRight } from "react-icons/bs";
import styles from "./navigationButton.module.css"

type Props = {};

const NavigationButton = (props: Props) => {
    const router = useRouter()
  const handleNavigationForward = () => {
    router.back();

  };

  return <button className={styles.button__navigation} onClick={handleNavigationForward}><BsChevronRight/></button>;
};

export default NavigationButton;
