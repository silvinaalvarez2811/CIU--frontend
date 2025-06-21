import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nickName, setNickName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (evento) => {
    evento.preventDefault();
    setError(""); // limpio error previo

    try {
      const response = await fetch("http://localhost:3001/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickName, email }),
      });

      if (!response.ok) {
        const dataError = await response.json();
        setError(dataError.error || "Error al registrar el usuario");
        return;
      }

      const nuevoUsuario = await response.json();
      console.log("Usuario recibido del backend:", nuevoUsuario);

      login(nuevoUsuario); // guardo usuario en contexto y localStorage
      alert(`Te has registrado correctamente, ${nuevoUsuario.nickName}`);
      navigate("/profile");
    } catch (error) {
      console.error("Error en registro:", error);
      setError("Hubo un error al registrarte. Por favor, volvé a intentar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white px-4">
      <div className="max-w-md w-full bg-gray-800 p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">Registro</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="p-3 rounded bg-gray-700 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 transition py-3 rounded font-semibold"
          >
            Registrarse
          </button>
        </form>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
};

export default Register;
