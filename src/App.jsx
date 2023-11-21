import { PrivateRoute, PublicRoute } from "./routes";
import { Route, Routes } from "react-router-dom";

import Alert from "./components/Alert";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Profile from "./components/Profile";
import Register from "./components/Register";

const App = () => {
  return (
    <div>
      <Alert />
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<Login />} path="/" />
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route element={<Dashboard />} path="/dashboard" />
          <Route element={<Profile />} path="/profile" />
        </Route>
      </Routes>
    </div>
  );
};

export default App;
