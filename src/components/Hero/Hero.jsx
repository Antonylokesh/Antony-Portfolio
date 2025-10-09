import React from "react";

import styles from './Hero.module.css';
import { getImageUrl } from "../../utils";

export const Hero = () => {
    return <section className={styles.container}>
        <div className={styles.content}>
            <h1 className={styles.title}>Hi, I'm Dali</h1>
            <p className={styles.description}>I bridge web development and data analytics to build smart, meaningful solutions that turn data into stories and technology into experiences.</p>
            <div className={styles.buttonGroup}>
                <a className={styles.contactBtn} href="mailto:walhamohamedali@gmail.com">Contact me</a>
                <a className={styles.resumeBtn} href="/resume.pdf" download="Mohamed_Ali_Walha_Resume.pdf">Download Resume</a>
            </div>
        </div>
        <img className={styles.heroImg} src={getImageUrl("hero/heroImage.png")} alt="Hero image of me" />
        <div className={styles.topBlur}></div>
        <div className={styles.bottomBlur}></div>
    </section>; 
};