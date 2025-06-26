import styles from "./Avatar.module.css";
const Avatar = ({ user }) => {
  const getInitials = (name) => {
    if (!name) {
      return "";
    }
    // eliminamos espacios y dividimos en palabras (no caracteres)
    const nombres = name.trim().split(" ");
    if (nombres.length === 1) {
      // devuelve la primera letra en mayúscula
      return nombres[0][0].toUpperCase();
    } else {
      // devuelve la primera letra de la primera y segunda palabra
      return (nombres[0][0] + nombres[1][0]).toUpperCase();
    }
  };

  return <div className={styles.avatar}>{getInitials(user.nickName)}</div>;
};

export default Avatar;
