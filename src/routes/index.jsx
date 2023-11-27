import { Navigate, Outlet } from "react-router-dom";

import userStore from "../hook/userStore";

const PrivateRoute = () => {
  const { user } = userStore();

  // Check if the user is logged in and has admin privileges
  if (user.username !== "" && user.isAdmin) {
    return <Navigate to="/admin/dashboard" />;
  } else if (user.username !== "") {
    return <Outlet />;
  } else {
    return <Navigate to="/login" />;
  }
};

const PublicRoute = () => {
  const { user } = userStore();

  // Check if the user is not logged in
  if (user.username === "") {
    return <Outlet />;
  } else {
    return <Navigate to="/dashboard" />;
  }
};

const AdminRoute = () => {
  const { user } = userStore();

  // Check if the user is logged in and has admin privileges
  if (user && user.username !== "" && user.isAdmin) {
    return <Outlet />;
  } else {
    // Redirect to the login page if not logged in or not an admin
    return <Navigate to="/login" />;
  }
};

export { PrivateRoute, PublicRoute, AdminRoute };
