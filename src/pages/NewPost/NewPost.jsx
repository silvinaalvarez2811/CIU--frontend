import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([""]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [error, setError] = useState("");

  // Traer las etiquetas disponibles
  useEffect(() => {
    const obtenerTags = async () => {
      try {
        const respuesta = await fetch("http://localhost:3001/tags");
        const data = await respuesta.json();
        setTags(data);
      } catch (error) {
        console.error("Error al traer tags:", error);
      }
    };
    obtenerTags();
  }, []);

  const handleSubmit = async (evento) => {
    evento.preventDefault();

    if (!description.trim()) {
      setError("La descripción es obligatoria");
      return;
    }

    try {
      // Crear el post
      const resPost = await fetch("http://localhost:3001/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          description,
          userId: user.id,
          tagIds: selectedTags, // asi??
        }),
      });

      const nuevoPost = await resPost.json();

      // Crear imágenes (si hay URLs)
      const imagenesValidas = imageUrls.filter((url) => url.trim() !== "");
      for (const url of imagenesValidas) {
        await fetch("http://localhost:3001/postimages", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            url,
            postId: nuevoPost.id,
          }),
        });
      }

      navigate("/home");
    } catch (error) {
      console.error("Error al crear el post:", error);
      setError("Error al crear la publicación");
    }
  };

  const handleTagChange = (e) => {
    const tagId = parseInt(e.target.value);
    if (e.target.checked) {
      setSelectedTags([...selectedTags, tagId]);
    } else {
      setSelectedTags(selectedTags.filter((id) => id !== tagId));
    }
  };

  const handleImageChange = (index, value) => {
    const nuevasUrls = [...imageUrls];
    nuevasUrls[index] = value;
    setImageUrls(nuevasUrls);
  };

  const agregarCampoImagen = () => {
    setImageUrls([...imageUrls, ""]);
  };

  return (
    <div className="container mt-4">
      <h2 className="text-primary">Crear nueva publicación</h2>
      {error && <p className="text-danger">{error}</p>}
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="mb-3">
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label className="form-label">URLs de imágenes</label>
          {imageUrls.map((url, index) => (
            <input
              key={`imagen-${index}`}
              type="text"
              value={url}
              onChange={(e) => handleImageChange(index, e.target.value)}
              className="form-control mb-2"
              placeholder="Pegá la URL de tu imagen, ej: https://miweb.com/imagen.jpg"
            />
          ))}
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={agregarCampoImagen}
          >
            Agregar otra imagen
          </button>
        </div>

        <div className="mb-3">
          <label className="form-label">Etiquetas</label>
          <div className="d-flex flex-wrap gap-2">
            {tags.map((tag) => (
              <div key={tag.id} className="form-check">
                <input
                  type="checkbox"
                  value={tag.id}
                  onChange={handleTagChange}
                  className="form-check-input"
                  id={`tag-${tag.id}`}
                />
                <label className="form-check-label" htmlFor={`tag-${tag.id}`}>
                  #{tag.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Publicar
        </button>
      </form>
    </div>
  );
};

export default NewPost;
