import React from "react";

import styles from "./Experience.module.css";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
    return (
        <section className={styles.container} id="experience">
            <h2 className={styles.title}>Experience</h2>
            <ul className={styles.history}>
                {history.map((item, id) => {
                    return <li key={id} className={styles.historyItem}>
                        <img src={getImageUrl(item.imageSrc)} alt={`${item.organisation} Logo`} />
                        <div className={styles.historyItemDetails}>
                            <h3>{`${item.role}, ${item.organisation}`}</h3>
                            <p>{`${item.startDate} - ${item.endDate}`}</p>
                            <ul>{item.experiences.map((experience, id) => {
                                return <li key={id}>{experience}</li>;
                            })}</ul>
                        </div>
                    </li>;
                })}
            </ul>
        </section>
    );
};
