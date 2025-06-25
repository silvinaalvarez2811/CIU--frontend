import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  //useStste podria ser []en images? probar
  const [images, setImages] = useState([]);

  useEffect(() => {
    const obtenerImagen = async () => {
      try {
        const respuesta = await fetch(
          `http://localhost:3001/postimages/post/${post.id}`
        );
        if (!respuesta.ok) throw new Error("Error en la respuesta");
        const data = await respuesta.json();
        setImages(data);
      } catch (error) {
        console.error("Error al obtener imágenes:", error);
        setImages([]); //para que no quede undefined
      }
    };
    obtenerImagen();
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
          {post.comments?.length || 0} comentario
          {post.comments?.length !== 1 ? "s" : ""}
        </p>

        <Link to={`/post/${post.id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Post;
