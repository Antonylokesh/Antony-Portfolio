import React from "react";

import styles from "./About.module.css";
import { getImageUrl } from "../../utils";

export const About = () => {
  return (
  <section className={styles.container} id="about">
    <h2 className={styles.title}>About</h2>
    <div className={styles.content}>
        <img className={styles.aboutImage} src={getImageUrl("about/aboutImg.png")} alt="Me sitting with a laptop"/>
        <ul className={styles.aboutItems}>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/code.png")} alt="Web Development Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>Full-Stack Development</h3>
                    <p>I craft robust full-stack applications that blend performance with clean design.
Using Java, Python, and React, I transform ideas into reliable, scalable digital experiences.</p>
                </div>
            </li>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/ai.png")} alt="AI Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>AI & Data-Driven Solutions</h3>
                    <p>I integrate machine learning and analytics into real-world applications.
Whether it’s predictive maintenance or intelligent dashboards, I turn data into decisions that matter.</p>
                </div>
            </li>
            <li className={styles.aboutItem}>
                <img src={getImageUrl("about/database.png")} alt="Database Icon"/>
                <div className={styles.aboutItemText}>
                    <h3>Cloud & DevOps</h3>
                    <p>I love building cloud-native systems that are secure, automated, and easy to scale.
From Docker and Kubernetes to AWS and Terraform, I ensure smooth deployment from code to cloud.</p>
                </div>
            </li>
        </ul>
    </div>
  </section>
  );
};

