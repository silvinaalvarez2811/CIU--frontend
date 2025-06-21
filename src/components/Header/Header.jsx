import React from "react";
import { Link, NavLink } from "react-router-dom";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/" className={styles.navLink}>
          Inicio
        </NavLink>
        <NavLink to="/profile" className={styles.navLink}>
          Perfil
        </NavLink>
        <NavLink to="/newPost" className={styles.navLink}>
          Publicaciones
        </NavLink>
        <NavLink to="/login" className={styles.navLink}>
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
