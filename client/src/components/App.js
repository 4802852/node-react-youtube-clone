import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import auth from "../hoc/auth";

import NavBar from "./views/NavBar/NavBar";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import MovieDetail from "./views/MovieDetail/MovieDetail";
import FavoritePage from "./views/FavoritePage/FavoritePage";

function App() {
  const AuthLandingPage = auth(LandingPage, null);
  const AuthLoginPage = auth(LoginPage, false);
  const AuthRegisterPage = auth(RegisterPage, false);
  const AuthMovieDetail = auth(MovieDetail, null);
  const AuthFavoritePage = auth(FavoritePage, true);

  return (
    <Router>
      <NavBar />
      <div style={{ paddingTop: "55px", minHeight: "calc(100vh-80px)" }}>
        <Routes>
          <Route exact path="/" element={<AuthLandingPage />} />
          <Route exact path="/login" element={<AuthLoginPage />} />
          <Route exact path="/register" element={<AuthRegisterPage />} />
          <Route exact path="/movie/:movieId" element={<AuthMovieDetail />} />
          <Route exact path="/favorite" element={<AuthFavoritePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
