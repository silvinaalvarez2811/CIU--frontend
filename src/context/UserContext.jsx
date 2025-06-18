import { createContext, useState, useEffect } from "react";

//createContext - para crear el contexto que permite guardar globalmente info
//useEffect - para cargar info desde el localStorage si la hay

export const UserContext = createContext();

//se crea el componente que envuelve a app y que da acceso a los datos aqui definidos
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("usuario");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);
  //funcion para logear -  guarda en useState y en localstorage
  const login = (userName) => {
    setUser(userName);
    localStorage.setItem("usuario", userName);
  };
  //limpia el estado y el localstorage
  const logout = () => {
    setUser(null);
    localStorage.removeItem("usuario");
  };
  //esto es lo que todos los componentes va a poder obtener
  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
