import React, { Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import auth from "../hoc/auth";

import LandingPage from "./views/LandingPage/LandingPage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import NavBar from "./views/NavBar/NavBar";
import Footer from "./views/Footer/Footer";
import VideoUploadPage from "./views/VideoUploadPage/VideoUploadPage";
import VideoDetailPage from "./views/VideoDetailPage/VideoDetailPage";
import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage";

function App() {
  const AuthLandingPage = auth(LandingPage, null);
  const AuthLoginPage = auth(LoginPage, false);
  const AuthRegisterPage = auth(RegisterPage, false);
  const AuthVideoUploadPage = auth(VideoUploadPage, true);
  const AuthVideoDetailPage = auth(VideoDetailPage, null);
  const AuthSubscriptionPage = auth(SubscriptionPage, true);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Router>
        <NavBar />
        <div style={{ minHeight: "100%", paddingTop: "69px" }}>
          <Routes>
            <Route exact path="/" element={<AuthLandingPage />} />
            <Route exact path="/login" element={<AuthLoginPage />} />
            <Route exact path="/register" element={<AuthRegisterPage />} />
            <Route exact path="/video/upload" element={<AuthVideoUploadPage />} />
            <Route exact path="/video/:videoId" element={<AuthVideoDetailPage />} />
            <Route exact path="/subscription" element={<AuthSubscriptionPage />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </Suspense>
  );
}

export default App;
