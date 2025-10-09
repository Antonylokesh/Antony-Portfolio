import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
  <section className={styles.container} id="about">
    <h2 className={styles.title}>About</h2>
    <div className={styles.content}>
        <img className={styles.aboutImage} src={getImageUrl("about/aboutImage.png")} alt="Me sitting with a laptop"/>
        <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/code.png")} alt="Web Development Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>Web Development</h3>
                    <p>I build modern and user-friendly web applications that combine functionality, performance, and clean design. I enjoy transforming ideas into interactive experiences that make an impact.</p>
                </div>
            </li>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/ai.png")} alt="AI Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>Data Analytics</h3>
                    <p>I love working with data — collecting, analyzing, and visualizing it to extract valuable insights and support better decision-making.</p>
                </div>
            </li>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/database.png")} alt="Database Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>Databases & Cloud</h3>
                    <p>I design and manage reliable databases and cloud-based environments to ensure scalability, security, and smooth deployment of applications.</p>
                </div>
            </li>
        </ul>
    </div>
  </section>
  );
};

