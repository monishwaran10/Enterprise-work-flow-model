
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { saveUser } from "../../Redux/ReduxSlice";
import axios from "axios";

const Register = () => {
  const dispatch = useDispatch();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({}); 
  const [loading, setLoading] = useState(false); 


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  
  const validate = () => {
    const newErrors = {};

    if (!data.name.trim()) newErrors.name = "Name is required";
    if (!data.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(data.email))
      newErrors.email = "Email is invalid";

    if (!data.password.trim()) newErrors.password = "Password is required";
    else if (data.password.length < 6)
      newErrors.password = "Password is invalid";

    return newErrors;
  };

 
  const handleRegister = async () => {
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

   

     
      dispatch(saveUser(data));

      alert("User registered successfully!");
      setData({ name: "", email: "", password: "" });
   
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Enterprise Portal Registration</h2>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={data.name}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}

      <input
        type="email"
        name="email"
        placeholder="Email"
        value={data.email}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={data.password}
        onChange={handleChange}
        style={{ width: "100%", margin: "10px 0", padding: "8px" }}
      />
      {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}

      <button
        onClick={handleRegister}
        style={{
          width: "100%",
          padding: "10px",
          backgroundColor: loading ? "gray" : "blue",
          color: "white",
          border: "none",
          cursor: loading ? "not-allowed" : "pointer",
        }}
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </div>
  );
};

export default Register;
