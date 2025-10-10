import React, { useState, useEffect, useRef } from 'react';

import styles from './Navbar.module.css';
import { getImageUrl } from "../../utils"

export const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
    <nav className={styles.navbar}>
        <a className={styles.title} href="/"> </a>
        <div className={styles.menu} ref={menuRef}>
            <img 
                className={styles.menuBtn}
                src={isMenuOpen ? getImageUrl("nav/closeIcon.png") : getImageUrl("nav/menuIcon.png")} alt="menu-button" 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                />
            <ul className={`${styles.menuItems} ${isMenuOpen && styles.menuOpen}`} onClick={() => setIsMenuOpen(false)}>
                <li><a href="#about">About</a></li>
                <li><a href="#experience">Experience</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </div>
    </nav>
    );
};