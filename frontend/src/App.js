import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/dashboard/Dashboard";
import UserContext from "./Context/UserContext";

const App = () => {

  // const [user, setUser] = useState({ username: "10decoders", role: "admin" });
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);


  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
       
          <Route path="/" element={<Login />} />

        
          <Route path="/dashboard" element={<Dashboard />} />

        
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
