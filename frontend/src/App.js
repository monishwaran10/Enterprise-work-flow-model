import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Login = lazy(() => import("./Pages/auth/Login"));
const Register = lazy(() => import("./Pages/auth/Register"));
const Dashboard = lazy(() => import("./Pages/dashboard/Dashboard"));

const App = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />
          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />

          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
