import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";

import Signup from '../pages/auth/Signup';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/login" element={<Login />} />
<Route path="/signup" element={<Signup />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
};

export default AppRoutes;

