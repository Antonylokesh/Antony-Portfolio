import React, { useState, useEffect } from "react";

import styles from "./Projects.module.css";

import projectsData from "../../data/projects.json";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
    // Sort projects by year (newest first)
    const projects = [...projectsData].sort((a, b) => b.year - a.year);
    const [currentPage, setCurrentPage] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    
    // Check if screen is mobile size
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 680);
        };
        
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);
    
    const projectsPerPage = isMobile ? 1 : 2;
    const totalPages = Math.ceil(projects.length / projectsPerPage);

    const startIndex = currentPage * projectsPerPage;
    const currentProjects = projects.slice(startIndex, startIndex + projectsPerPage);
    
    // Check if this is the last page with only one project (show like mobile view)
    const isLastPageSingle = !isMobile && 
                            currentPage === totalPages - 1 && 
                            currentProjects.length === 1;

    const goToNext = () => {
        setCurrentPage((prev) => (prev + 1) % totalPages);
    };

    const goToPrev = () => {
        setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
    };

    const goToPage = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    return (
        <section className={styles.container} id="projects">
            <h2 className={styles.title}>Projects</h2>
            
            <div className={`${styles.projectsWrapper} ${isLastPageSingle ? styles.singlePageWrapper : ''}`}>
                <button 
                    className={styles.navBtn} 
                    onClick={goToPrev}
                    aria-label="Previous projects"
                >
                    ‹
                </button>
                
                <div className={`${styles.projects} ${isLastPageSingle ? styles.singleProject : ''}`}>
                    {currentProjects.map((project, id) => {
                        return (
                            <ProjectCard key={startIndex + id} project={project} />
                        );
                    })}
                </div>
                
                <button 
                    className={styles.navBtn} 
                    onClick={goToNext}
                    aria-label="Next projects"
                >
                    ›
                </button>
            </div>

            <div className={styles.pagination}>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={`${styles.paginationDot} ${
                            index === currentPage ? styles.active : ''
                        }`}
                        onClick={() => goToPage(index)}
                        aria-label={`Go to page ${index + 1}`}
                    />
                ))}
            </div>

            <div className={styles.projectCounter}>
                {currentPage * projectsPerPage + 1}-{Math.min((currentPage + 1) * projectsPerPage, projects.length)} of {projects.length} projects
            </div>
        </section>
    );
}