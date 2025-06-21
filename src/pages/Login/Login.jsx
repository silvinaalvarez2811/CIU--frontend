import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const Login = () => {
  const [nickName, setnickName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    try {
      //con el fetch al backend dado
      const response = await fetch("http://localhost:3001/users");
      const usuarios = await response.json();

      const usuarioEncontrado = usuarios.find((u) => u.nickName === nickName);

      if (!usuarioEncontrado) {
        setError("El usuario no existe");
        return;
      }

      if (password !== "123456") {
        setError("Contraseña incorrecta");
        return;
      }

      setError("");
      console.log("Usuario logueado:", usuarioEncontrado);
      login(usuarioEncontrado);
      navigate("/profile");
    } catch (error) {
      console.error("Error al hacer login:", error);
      setError("Error del servidor. Intentá más tarde.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Inicio de sesión
        </h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Usuario"
            value={nickName}
            onChange={(e) => setnickName(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white 
            focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition py-3 rounded font-semibold"
          >
            Ingresar
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

        <p className="mt-6 text-center text-gray-400">
          ¿No tenés cuenta?{" "}
          <Link
            to="/register"
            className="text-blue-500 hover:underline font-semibold"
          >
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
