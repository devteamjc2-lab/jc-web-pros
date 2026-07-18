import { useEffect, useMemo, useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import Login from "../pages/login";
import Dashboard from "../pages/admin/dashboard";
import Users from "../pages/admin/users";
import Chat from "../pages/Chat";

import AuthMiddleware from "../middleware/AuthMiddleware";
import PublicMiddleware from "../middleware/PublicMiddleware";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";



const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/login" element={<PublicMiddleware><Login /></PublicMiddleware>} />
      <Route path="/chat" element={<AuthMiddleware><Chat /></AuthMiddleware>} />

      {/* admin routes */}
      <Route path="/dashboard" element={<AuthMiddleware><Dashboard /></AuthMiddleware>} />
      <Route path="/admin/users" element={<AuthMiddleware><Users /></AuthMiddleware>} />
      <Route path="/users" element={<AuthMiddleware><Users /></AuthMiddleware>} />
      {/* <Route path="/admin/chat" element={<AuthMiddleware><ChatPage /></AuthMiddleware>} /> */}

    </Routes>
  );

 

  
};

export default AppRoutes;