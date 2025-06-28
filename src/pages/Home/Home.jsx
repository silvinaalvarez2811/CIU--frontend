import styles from "./Home.module.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/UserContext";
import Post from "../../components/Post/Post";
import { Link } from "react-router-dom";
import { MdOutlinePostAdd } from "react-icons/md";
import Banner from "../../components/Banner/Banner";

const Home = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPosts = async () => {
      try {
        const respPost = await fetch("http://localhost:3001/posts");
        const dataPost = await respPost.json();
        setPosts(dataPost);

        const respAutor = await fetch("http://localhost:3001/posts");

        setCargando(false);
      } catch (error) {
        console.error("Error al obtener los posts:", error);
        setError(true);
        setCargando(false);
      }
    };
    obtenerPosts();
  }, []);
  return (
    <>
      <div className={styles.bannerDemo}>
        <Banner />
      </div>
      <div className={styles.container}>
        <div className={styles.createPost}>
          <Link to={`/newPost/${posts.id}`} className={styles.navigate}>
            <MdOutlinePostAdd /> <p>¿</p>
          </Link>
        </div>
        {cargando ? (
          <p className={styles.textCenter}>Cargando publicaciones...</p>
        ) : posts.length === 0 ? (
          <p className={styles.textCenter}>No hay publicaciones para mostrar</p>
        ) : (
          <div className={styles.row}>
            {posts.map((post) => (
              <div key={post.id} className={styles.rowPost}>
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
