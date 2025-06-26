import React, { useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import styles from "./Header.module.css";
import { TbLogout } from "react-icons/tb";
import { AiFillHome } from "react-icons/ai";
import Avatar from "../Avatar/Avatar";
import logo from "../../assets/antisocial-logo.png";

const Header = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <header className={styles.header}>
      <nav className={styles.navContainer}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="logo" className={styles.logoImg} />
          <p className={styles.logoText}>
            UnaHur Anti-Social <span className={styles.logoNet}>Net</span>
          </p>
        </div>
        <div className={styles.navCenter}>
          <NavLink to="/" className={styles.navLink}>
            <AiFillHome style={{ marginRight: "0.5rem" }} size={25} />
            Inicio
          </NavLink>
          <NavLink to="/profile" className={styles.navLink}>
            Perfil
          </NavLink>
          <NavLink to="/newPost" className={styles.navLink}>
            Publicar
          </NavLink>
        </div>
        {user ? (
          <div className={styles.navText}>
            <span>Hola, {user.nickName}</span>
            {user && <Avatar user={user} />}
            <button onClick={handleLogout} className={styles.logoutButton}>
              <TbLogout size={27} color="white" />
            </button>
          </div>
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
