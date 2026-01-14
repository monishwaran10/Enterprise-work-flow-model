import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/dashboard/Dashboard";
import UserContext from "./Context/UserContext";
import Register from "./Pages/auth/Register";
import {store} from  "./Redux/store";
import { Provider } from "react-redux";

const App = () => {

  // const [user, setUser] = useState({ username: "10decoders", role: "admin" });
  const [user, setUser] = useState(
  JSON.parse(localStorage.getItem("user")) || null
);


  return (
   <Provider store={store}>
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
        <Routes>
          <Route path="/register" element={<Register/>}/>
       
          <Route path="/" element={<Login />} />


        
          <Route path="/dashboard" element={<Dashboard />} />

        
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </UserContext.Provider>
    </Provider>
  );
};

export default App;
