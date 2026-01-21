import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../Redux/ReduxSlice";

const USERS = [
  { username: "10decodersadmin", password: "10decodersadmin@123", role: "admin" },
  { username: "10decodersmanager", password: "10decoders@123", role: "manager" },
  { username: "10decodersemployee", password: "10deemp@123", role: "employee" },
];

const Login = () => {
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      dispatch(loginUser(storedUser));
    }
  }, [dispatch]);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (user) {
      dispatch(loginUser(user));
      localStorage.setItem("user", JSON.stringify(user));
      setError("");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button style={{ width: "100%", padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
