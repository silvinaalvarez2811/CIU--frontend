import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const usuariosPrueba = ["joaquin", "valen", "oscar"];

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = (evento) => {
    evento.preventDefault();

    if (!usuariosPrueba.includes(userName)) {
      setError("Usuario Inexistente");
      return;
    }
    if (password !== "123456") {
      setError("Contraseña incorrecta");
      return;
    }
    setError("");
    //actualiza con el usuario logueado
    login(userName);

    navigate("/"); // redirecciona a home

    alert(`Bienvenido/a ${userName}!`);
  };

  return (
    <>
      <h2>Inicio de seción</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Usuario"
          value={userName}
          onChange={(evento) => setUserName(evento.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(evento) => setPassword(evento.target.value)}
          required
        />
        <button type="submit">Ingresar</button>
      </form>
      {/* despues ver como se maneja el error*/}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </>
  );
}

export default Login;
