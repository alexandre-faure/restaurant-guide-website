import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import MainLayout from "./layouts/MainLayout";
import RestaurantPage from "./pages/RestaurantPage";
import About from "./pages/About";
import Error404 from "./pages/Error404";
import Error500 from "./pages/Error500";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/restaurant/:id" element={<RestaurantPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/error404" element={<Error404 />} />
          <Route path="/error500" element={<Error500 />} />
          <Route path="*" element={<Navigate to="/error404" replace />} />
        </Routes>
      </MainLayout>
    </Router>
  </React.StrictMode>
);
