import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
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

  const handleProductCreated = () => {
    setProductListKey(prevKey => prevKey + 1);
  };

  // Checks if the user is authenticated. If not, it redirects the user to the login page
  const ProtectedRoute = ({ element, user, ...rest }) => {
    return user ? element : <Navigate to="/login" {...rest} />;
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
            {user && (
              <>
                <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
                <Route 
                  path="/add-product" 
                  element={<ProtectedRoute element={<ProductForm onProductCreated={handleProductCreated} />} user={user} />}
                />
              </>
            )}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
