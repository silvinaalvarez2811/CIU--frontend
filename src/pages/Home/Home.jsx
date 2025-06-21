import React from "react";
import styles from "./Home.module.css";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <>
          <h2 className="text-3xl text-center text-blue-600">
            Hola, {user.nickName}! Bienvenido/a
          </h2>
        </>
      ) : (
        <div>
          <h2>Bienvenido/a </h2>
          <p>Por favor, inicia sesión o regístrate para comenzar.</p>
        </div>
      )}
    </>
  );
};

export default Home;
