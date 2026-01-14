
import React, { useState, useEffect, useContext } from "react";
import Dashboard from "../dashboard/Dashboard";
import Modal from "../../Components/Modal";
import UserContext from "../../Context/UserContext";
import "./Login.css";

const USERS = [
  { username: "10decodersadmin", password: "10decodersdmin@123", role: "admin" },
  { username: "10decodersmanager", password: "10decoders@123", role: "manager" },
  { username: "10decodersemployee", password: "10deemp@123", role: "employee" }
];

const Login = () => {
  const { user, setUser } = useContext(UserContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const alreadyuser = JSON.parse(localStorage.getItem("user"));
    if (alreadyuser?.username && alreadyuser?.role) {
      setUser(alreadyuser);
    }
  }, [setUser]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    name === "username" ? setUsername(value) : setPassword(value);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const User = USERS.find(
      (u) => u.username === username && u.password === password
    );

    if (User) {
      setUser(User);
      localStorage.setItem("user", JSON.stringify(User));
      setError("");
    } else {
      setError("Invalid username or password");
      setShowModal(true);
    }
  };

 

  return (
    <div className="login-container">
  {user ? (
    <Dashboard username={user.username} role={user.role} />
  ) : (
    <form className="login-form" onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="text"
        name="username" 
        placeholder="Username"
        value={username}
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={handleChange}
      />
      <button type="submit">Login</button>
    </form>
  )}
  {showModal && <Modal message={error} onClose={() => setShowModal(false)} />}
</div> 
  );
};

export default Login;
