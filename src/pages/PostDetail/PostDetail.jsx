import styles from "./PostDetal.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../../context/UserContext";

const PostDetail = () => {
  const { id } = useParams();
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        //traer el post
        const postResponse = await fetch(`http://localhost:3001/posts/${id}`);
        if (!postResponse.ok) {
          throw new Error("Error al cargar comentarios");
        }
        const postData = await postResponse.json();
        setPost(postData);
        //traer las imagenes
        const imagesResponse = await fetch(
          `http://localhost:3001/postimages/post/${id}`
        );
        if (!imagesResponse) {
          throw new Error("Error al cargar las imagenes");
        }
        const imagesData = await imagesResponse.json();
        setImages(imagesData);

        //traer comentarios
        const commentsResponse = await fetch(
          `http://localhost:3001/comments/post/${id}`
        );
        if (!commentsResponse.ok) {
          throw new Error("Error al cargar los comentarios");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);
  // crear comentario POST comments
  const createComment = async (evento) => {
    evento.preventDefault();
    if (!newComment.trim()) return;

    try {
      const response = await fetch("http://localhost:3001/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: newComment,
          userId: user.id,
          postId: id,
        }),
      });
      if (!response.ok) {
        throw new Error("Error al crear el comentario");
      }
      const createComment = await response.json();

      setComments([...comments, createComment]);
      setNewComment("");
    } catch (error) {
      setError("No se pudo agregar el comentario");
    }
  };
  if (loading) return <p>Cargando publicación...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-4">
      <h2>Detalle de la publicación</h2>

      <p>{post.description}</p>

      {post.Tags?.length > 0 && (
        <div className="mb-3">
          {post.Tags.map((tag) => (
            <span key={tag.id} className="badge bg-secondary me-2">
              #{tag.name}
            </span>
          ))}
        </div>
      )}

      {images.length > 0 && (
        <div className="mb-3">
          {images.map((img, idx) => (
            <img
              key={idx}
              src={img.url}
              alt={`Imagen ${idx + 1}`}
              className="img-fluid mb-2"
              style={{ maxHeight: "300px", maxWidth: "60%" }}
            />
          ))}
        </div>
      )}

      <hr />

      <h4>Comentarios ({comments.length})</h4>
      {comments.length === 0 ? (
        //<p>No hay comentarios aún.</p>
        ""
      ) : (
        <ul className="list-group mb-3">
          {comments.map((c) => (
            <li key={c.id} className="list-group-item">
              {c.content}
            </li>
          ))}
        </ul>
      )}

      <form onSubmit={createComment}>
        <div className="mb-3">
          <label htmlFor="comentario" className="form-label">
            Agregar comentario
          </label>
          <textarea
            id="comentario"
            className="form-control"
            value={newComment}
            onChange={(evento) => setNewComment(evento.target.value)}
            required
          />
        </div>
        <div className="d-flex gap-y-2 me-2">
          <button type="submit" className="btn btn-primary">
            Comentar
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/home")}
          >
            Terminar
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostDetail;
