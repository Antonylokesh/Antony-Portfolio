import React from "react";
import styles from "./TechShowcase.module.css";
import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";

export const TechShowcase = () => {
    
    const duplicatedSkills = [...skills, ...skills];

    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Technologies I have worked with</h2>
            <div className={styles.container}>
                <div className={styles.scrollContainer}>
                    <div className={styles.scrollTrack}>
                        {duplicatedSkills.map((skill, index) => (
                            <div key={index} className={styles.techItem}>
                                <img 
                                    src={getImageUrl(skill.imageSrc)} 
                                    alt={skill.title}
                                    className={styles.techIcon}
                                />
                                <span className={styles.techTitle}>{skill.title}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};