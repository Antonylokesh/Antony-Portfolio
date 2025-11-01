import React, { useState } from "react";

import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, images, imageSrc, description, skills, duration, difficulty, year, demo, source },
}) => {
  // Support both old (imageSrc) and new (images) format
  const projectImages = images || [imageSrc];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const goToNextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % projectImages.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + projectImages.length) % projectImages.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageCarousel}>
        <img
          src={getImageUrl(projectImages[currentImageIndex])}
          alt={`Screenshot ${currentImageIndex + 1} of ${title}`}
          className={styles.image}
        />
        
        {projectImages.length > 1 && (
          <>
            <button
              className={`${styles.carouselBtn} ${styles.prevBtn}`}
              onClick={goToPrevImage}
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              className={`${styles.carouselBtn} ${styles.nextBtn}`}
              onClick={goToNextImage}
              aria-label="Next image"
            >
              ›
            </button>
            
            <div className={styles.imageIndicators}>
              {projectImages.map((_, index) => (
                <button
                  key={index}
                  className={`${styles.indicator} ${
                    index === currentImageIndex ? styles.active : ''
                  }`}
                  onClick={() => goToImage(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
            
            <div className={styles.imageCounter}>
              {currentImageIndex + 1}/{projectImages.length}
            </div>
          </>
        )}
      </div>
      
      <h3 className={styles.title}>{title}</h3>
      <p className={styles.description}>{description}</p>
      
      <div className={styles.projectMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>📅 Year:</span>
          <span className={styles.metaValue}>{year}</span>
          <span className={styles.metaLabel}>⏱️ Duration:</span>
          <span className={styles.metaValue}>{duration}</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaLabel}>🎯 Difficulty:</span>
          <span className={`${styles.metaValue} ${styles.difficulty} ${styles[difficulty?.toLowerCase()]}`}>{difficulty}</span>
        </div>
      </div>

      <ul className={styles.skills}>
        {skills.map((skill, id) => {
          return (
            <li key={id} className={styles.skill}>
              {skill}
            </li>
          );
        })}
      </ul>
      {/* <div className={`${styles.links} ${!demo || demo.trim() === '' ? styles.singleLink : ''}`}>
        {demo && demo.trim() !== '' && (
          <a 
            href={demo} 
            className={`${styles.link} ${styles.demoBtn}`}
            target="_blank" 
            rel="noopener noreferrer"
          >
            <img 
              src={getImageUrl("projects/live.png")} 
              alt="Live Demo" 
              className={styles.buttonIcon}
            />
            Live Demo
          </a>
        )}
        <a 
          href={source} 
          className={`${styles.link} ${styles.sourceBtn}`}
          target="_blank" 
          rel="noopener noreferrer"
        >
          <img 
            src={getImageUrl("projects/github.png")} 
            alt="GitHub" 
            className={styles.buttonIcon}
          />
          Source Code
        </a>
      </div> */}
    </div>
  );
};