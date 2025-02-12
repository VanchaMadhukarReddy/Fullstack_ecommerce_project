import React from "react";
import { Navigate, Outlet } from "react-router-dom";
const Privatecomponent = () => {
  const auth = localStorage.getItem("user");
  return auth ? <Outlet /> : <Navigate to="/profile" />;
};

export default Privatecomponent;
