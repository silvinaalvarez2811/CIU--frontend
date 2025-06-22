import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const { user, logout } = useContext(UserContext);

  console.log("Usuario actual en contexto:", user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  if (!user) {
    return <p>No hay usuario logueado.</p>;
  }

  return (
    <div className={styles.profileContainer}>
      <h2>Perfil de Usuario</h2>
      <p>
        <strong>Nick:</strong> {user.nickName}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </div>
  );
}

export default Profile;
