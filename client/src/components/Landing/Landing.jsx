import React from 'react';
import { Link } from 'react-router-dom'; 
import styles from './Landing.module.css';

const Landing = () => {
  return (
    <div className={styles.landing}>
      <div className={styles.overlay}></div>
      <div className={styles.content}>
        <h1>Welcome to this F1 Drivers website!</h1>
        <p>Find all the information about your favorite pilots in one place!</p>
        <Link to="/home" className={styles.button}>
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default Landing;