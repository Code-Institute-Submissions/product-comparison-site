import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ProductList from './components/ProductList';
import Login from './components/Login';
import Register from './components/Register';
import Logout from './components/Logout';
import './styles/App.css';

const App = () => {
    return (
        <Router>
            <div className="app-container">
                <Header />
                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<ProductList />} />
                        <Route path="/products" element={<div>Products Page</div>} />
                        <Route path="/about" element={<div>About Page</div>} />
                        <Route path="/contact" element={<div>Contact Page</div>} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/logout" element={<Logout />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
