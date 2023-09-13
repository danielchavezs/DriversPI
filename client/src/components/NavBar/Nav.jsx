import React from 'react';
import SearchBar from './SearchBar/SearchBar.jsx';
import styles from './Nav.module.css';
import { Link } from 'react-router-dom';

export default function Nav() {
  return (
    <div className={styles.container}>
      <Link to="/home">HOME</Link>
      <Link to="/create">ADD DRIVER!</Link>
      <Link to="/">LANDING</Link>
    </div>
  );
}
