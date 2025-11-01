import React from "react";

import styles from './Hero.module.css';
import { getImageUrl } from "../../utils";

export const Hero = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Antony Lokesh B</h1>
            <p className={styles.description}>I build fast, reliable, and scalable web applications.
Turning ideas into production-ready software with Java and Python.</p>
            <div className={styles.buttonGroup}>
                <a className={styles.contactBtn} href="mailto:lokeshb6623@gmail.com ">Contact me</a>
                <a className={styles.resumeBtn} href="/Lokesh SDE Resume.pdf" download="Lokesh SDE Resume.pdf">Download Resume</a>
            </div>
        </div>
        <img className={styles.heroImg} src={getImageUrl("hero/Hero.png")} alt="Hero image of me" />
        <div className={styles.topBlur}></div>
        <div className={styles.bottomBlur}></div>
    </section>; 
};