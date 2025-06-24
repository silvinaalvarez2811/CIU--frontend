import React from "react";
import { Link } from "react-router-dom";

const Post = ({ post }) => {
  return (
    <div className="card mb-4" style={{ width: "18rem" }}>
      {/* Imagen si existe */}
      {post.images && post.images.length > 0 && (
        <img
          src={post.images[0].url}
          className="card-img-top"
          alt="Imagen del post"
        />
      )}

      <div className="card-body">
        {/* Descripción */}
        <h5 className="card-title">{post.description}</h5>

        {/* Etiquetas (tags) - se muestran con span para verlas 
        a todas en una linea */}
        {post.tags && post.tags.length > 0 && (
          <div className="mb-2">
            {post.tags.map((tag) => (
              <span key={tag._id} className="badge bg-secondary me-1">
                #{tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Comentarios */}
        <p className="card-text">
          {post.comments?.length || 0} comentario
          {post.comments?.length !== 1 ? "s" : ""}
        </p>

        {/* Botón "Ver más" */}
        <Link to={`/post/${post._id}`} className="btn btn-primary">
          Ver más
        </Link>
      </div>
    </div>
  );
};

export default Post;
