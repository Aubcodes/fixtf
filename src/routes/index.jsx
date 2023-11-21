import { Navigate, Outlet } from "react-router-dom";

import userStore from "../hook/userStore";

const PrivateRoute = () => {
  const { user } = userStore();
  return user.username !== "" ? <Outlet /> : <Navigate to="/login" />;
};

const PublicRoute = () => {
  const { user } = userStore();
  return user.username === "" ? <Outlet /> : <Navigate to="/dashboard" />;
};

export { PrivateRoute, PublicRoute };
