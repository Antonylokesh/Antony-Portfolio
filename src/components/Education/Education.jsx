import React from "react";
import styles from "./Education.module.css";
import education from "../../data/education.json";

export const Education = () => {
    return (
        <section className={styles.container} id="education">
            <h2 className={styles.title}>Education</h2>
            <div className={styles.timeline}>
                {education.map((item, id) => {
                    return (
                        <div key={id} className={styles.timelineItem}>
                            <div className={styles.timelineMarker}>
                                <div className={styles.markerDot}></div>
                            </div>
                            <div className={styles.timelineContent}>
                                <div className={styles.dateRange}>
                                    {item.startDate} - {item.endDate}
                                </div>
                                <h3 className={styles.degree}>{item.degree}</h3>
                                <h4 className={styles.institution}>{item.institution}</h4>
                                <p className={styles.location}>{item.location}</p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};