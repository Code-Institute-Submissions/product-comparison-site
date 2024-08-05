import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from '../styles/Header.module.css';
import logo from '../assets/logo.jpg';

const Header = ({ user, onLogout }) => {
  const [menuActive, setMenuActive] = useState(false);
  const [searchActive, setSearchActive] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuActive(!menuActive);
  const toggleSearch = () => setSearchActive(!searchActive);

  return (
    <header className={styles.header}>
      <div className={styles.topHeader}>
        <div className={styles.burgerMenu} onClick={toggleMenu}>
          <div></div>
          <div></div>
          <div></div>
        </div>
        <div className={styles.logo}>
          <Link to="/">
            <img src={logo} alt="ProductComparison Logo" />
          </Link>
        </div>
        <button className={styles.searchButton} onClick={toggleSearch}>
          🔍
        </button>
        <div className={styles.navAndLogin}>
          <nav className={styles.navbar}>
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
          {user ? (
            <button className={styles.loginButton} onClick={onLogout}>Logout</button>
          ) : (
            <button className={styles.loginButton} onClick={() => navigate('/login')}>Login/Register</button>
          )}
        </div>
      </div>
      <div className={`${styles.mobileMenu} ${menuActive ? styles.active : ''}`}>
        <Link to="/" onClick={toggleMenu}>Home</Link>
        <Link to="/products" onClick={toggleMenu}>Products</Link>
        <Link to="/about" onClick={toggleMenu}>About</Link>
        <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        {user ? (
          <button className={styles.loginButton} onClick={onLogout}>Logout</button>
        ) : (
          <button className={styles.loginButton} onClick={() => { toggleMenu(); navigate('/login'); }}>Login/Register</button>
        )}
      </div>
      <div className={`${styles.searchBar} ${searchActive ? styles.active : ''}`}>
        <input type="text" placeholder="Search products..." />
      </div>
    </header>
  );
};

export default Header;
