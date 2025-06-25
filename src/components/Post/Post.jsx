import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  //useStste podria ser []en images? probar
  const [images, setImages] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //traer imagenes
        const imagesResponse = await fetch(
          `http://localhost:3001/postimages/post/${post.id}`
        );
        if (!imagesResponse.ok) {
          throw new Error("Error al cargar las imagenes");
        }
        const imagesdata = await imagesResponse.json();
        setImages(imagesdata);

        //obtener comentarios
        const commentsResponse = await fetch(
          `http://localhost:3001/comments/post/${post.id}`
        );
        if (!commentsResponse.ok) {
          throw new Error("Error al cargar los comentarios");
        }
        const commentsData = await commentsResponse.json();
        setComments(commentsData);

        setLoading(false);
      } catch (error) {
        console.error("Error en fetchs del post:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [post.id]);

  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      {images.length > 0 && (
        <div>
          {images.map((imagen, index) => (
            <img
              key={index}
              src={imagen.url}
              className="card-img-top mb-2"
              alt={`Imagen ${index + 1}`}
            />
          ))}
        </div>
      )}

      <div className="card-body">
        <h5 className="card-title">{post.description}</h5>

        {post.Tags && post.Tags.length > 0 && (
          <div className="mb-2">
            {post.Tags.map((tag) => (
              <span key={tag.id} className="badge bg-secondary me-1">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        <p className="card-text">
          <strong>Autor:</strong> {post.User?.nickName || "Desconocido"}
        </p>

        <p className="card-text">
          <strong>Comentarios:</strong> {comments.length}{" "}
          {comments.length === 1 ? "comentario" : "comentarios"}
        </p>

        {comments.length > 0 && (
          <div>
            <p>
              <strong>Primeros comentarios:</strong>
            </p>
            <ul className="list-unstyled">
              {comments.slice(0, 2).map((comentario) => (
                <li key={comentario.id} className="mb-1">
                  🗨️ {comentario.content} —{" "}
                  <em>{comentario.User?.nickName || "Anon"}</em>
                </li>
              ))}
            </ul>
          </div>
        )}

        <Link to={`/post/${post.id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Post;
