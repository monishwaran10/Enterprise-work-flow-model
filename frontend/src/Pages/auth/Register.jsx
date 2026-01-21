import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { observer } from "mobx-react-lite";
import { registerUser } from "../../Redux/ReduxSlice";
import { userStore } from "../../Mobxconfig/storage";

const Register = observer(() => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    role: "employee",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    console.log(e.target.value)
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const err = {};
    if (!data.username) err.username = "Username required";
    if (!data.email) err.email = "Email required";
    if (!data.password || data.password.length < 6)
      err.password = "incorrect characters";
    if (!data.role) err.role = "Role required";
    return err;
  };

  const handleRegister = () => {
    const err = validate();
    console.log(err);
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

   
    dispatch(registerUser(data));

   
    userStore.storeregister(data);

    localStorage.setItem("user", JSON.stringify(data));
    alert("Registered successfully");

    setData({
      username: "",
      email: "",
      password: "",
      role: "employee",
    });
  };

  return (
    <div style={{ maxWidth: "400px", margin: "100px auto" }}>
      <h2>Register</h2>

      <input name="username" value={data.username} onChange={handleChange} />
      {errors.username && <p style={{ color: "red" }}>{errors.username}</p>}

      <input name="email" value={data.email} onChange={handleChange} />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <select name="role" value={data.role} onChange={handleChange}>
        <option value="employee">Employee</option>
        <option value="manager">Manager</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
});

export default Register;
