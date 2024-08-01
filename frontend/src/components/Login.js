import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/setupAxios';

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/accounts/login/', { login, password });
      
      if (response.status === 200) {
        // Set authentication token or session
        console.log('Login successful');
        navigate('/'); // Redirect after successful login
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Email or Username"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
