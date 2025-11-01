import React from "react";
import styles from "./Footer.module.css";

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p>&copy; 2025 Antony Lokesh B. All rights reserved.</p>
        <div className={styles.footerLinks}>
        </div>
      </div>
    </footer>
  );
};