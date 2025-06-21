import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Profile from "./pages/Profile/Profile";
import NewPost from "./pages/NewPost/NewPost";
import PostDetail from "./pages/PostDetail/PostDetail";
import RutaProtegida from "./components/RutaProtegida";
import Header from "./components/Header/Header";
function App() {
  const location = useLocation();
  const rutasSinHeader = ["/login", "/register"];

  return (
    <>
      {!rutasSinHeader.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/*Rutas Protegidas*/}

        <Route
          path="/profile"
          element={
            <RutaProtegida>
              <Profile />
            </RutaProtegida>
          }
        />
        <Route
          path="/newPost"
          element={
            <RutaProtegida>
              <NewPost />
            </RutaProtegida>
          }
        />
        <Route
          path="/post/:id"
          element={
            <RutaProtegida>
              <PostDetail />
            </RutaProtegida>
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
