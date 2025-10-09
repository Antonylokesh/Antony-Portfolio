import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2025 Mohamed Ali Walha. All rights reserved.</p>
        <div className={styles.footerLinks}>
        </div>
      </div>
    </footer>
  );
};