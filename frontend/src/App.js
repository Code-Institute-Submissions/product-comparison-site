import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import authService from "./services/authService";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import "./styles/App.css";

const App = () => {
  const [productListKey, setProductListKey] = useState(0);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    console.log("Loaded User from Local Storage:", userData);
    if (userData) {
      setUser(userData);
    }
  }, []);

  const handleLogin = async (username, password) => {
    try {
      const tokens = await authService.login(username, password);
      const userData = await authService.fetchUserData(tokens.access); // New step to fetch user data
      const fullUserData = { ...tokens, ...userData }; // Combine tokens and user data
      console.log("Login Successful:", fullUserData);
      localStorage.setItem("user", JSON.stringify(fullUserData));
      setUser(fullUserData);
    } catch (error) {
      console.error("Failed to login", error);
      alert("Login failed: " + error.message);
    }
  };

  const handleLogout = () => {
    authService.logout();
    localStorage.removeItem("user");
    setUser(null);
  };

  const handleProductCreated = () => {
    setProductListKey((prevKey) => prevKey + 1);
  };

  const ProtectedRoute = ({ element, user, adminOnly }) => {
    if (!user) {
      return <Navigate to="/login" />;
    }

    if (adminOnly && !user.is_staff) {
      return <Navigate to="/" />;
    }

    return element;
  };

  return (
    <Router>
      <div className="app-container">
        <Header user={user} onLogout={handleLogout} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<ProductList key={productListKey} />} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/about" element={<div>About Page</div>} />
            <Route path="/contact" element={<div>Contact Page</div>} />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/add-product"
              element={
                <ProtectedRoute user={user} adminOnly={true}>
                  <ProductForm onProductCreated={handleProductCreated} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/logout"
              element={
                <ProtectedRoute user={user}>
                  <Logout onLogout={handleLogout} />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
