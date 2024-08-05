import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await onLogout();
      navigate("/");
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
