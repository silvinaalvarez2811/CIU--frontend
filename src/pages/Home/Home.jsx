import React from "react";
import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post/Post";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/posts");
        const data = await respuesta.json();
        setPosts(data);
        setCargando(false);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setCargando(false);
      }
    };
    obtenerPosts();
  }, []);
  return (
    <>
    <div className="container mt-4">
      <h2 className="text-center text-primary mb-4">Hola, {user.nickName}!</h2>
      {cargando ? (
        <p className="text-center">Cargando publicaciones...</p>
      ) : posts.length === 0 ? (
        <p className="text-center">No hay publicaciones para mostrar</p>
      ) : (
        <div className="row">
          {posts.map((post) => (
            <div key={post.id} className="col-md-4 mb-4">
              <Post post={post} />
            </div>
          ))}
        </div>
      )}
    </div>
    </>
  );
};
export default Home;
