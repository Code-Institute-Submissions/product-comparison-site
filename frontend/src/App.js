import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import authService from "./services/authService";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProductList from "./components/ProductList";
import "./styles/App.css";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const userData = await authService.login(username, password);
      localStorage.setItem("user", JSON.stringify(userData));
      setUser(userData);
    } catch (error) {
      console.error("Failed to login", error);
    }
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/products" element={<div>Products Page</div>} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />
            {user && (
              <Route
                path="/logout"
                element={<Logout onLogout={handleLogout} />}
              />
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
