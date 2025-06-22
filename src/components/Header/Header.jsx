import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

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
        {user ? (
          <>
            <span className={styles.navText}>Hola, {user.nickName}</span>
            <button onClick={handleLogout} className={styles.logoutButton}>
              Cerrar sesión
            </button>
          </>
        ) : (
          <NavLink to="/login" className={styles.navLink}>
            Login
          </NavLink>
        )}
      </nav>
    </header>
  );
};

export default Header;
