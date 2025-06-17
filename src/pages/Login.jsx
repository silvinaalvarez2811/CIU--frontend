import { useState } from "react";

const usuariosPrueba = ["joaquin", "valen", "oscar"];

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSunmit = (evento) => {
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
    //para simular un login
    localStorage.setItem("usuario", userName);
    alert(`Bienvenido ${userName}!`);
    //aqui deberia redireccionar a home
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSunmit}>
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
