import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../../Mobxconfig/storage";
import { useNavigate } from "react-router-dom";

const Login = observer(() => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    userStore.loginUser({ email, password },navigate);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Login</h2>

      {userStore.error && (
        <p style={{ color: "red" }}>{userStore.error}</p>
      )}

      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
          style={{ width: "100%", padding: "10px" }}
          disabled={userStore.loading}
        >
          {userStore.loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
});

export default Login;
