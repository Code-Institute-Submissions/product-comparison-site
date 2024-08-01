import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/setupAxios';

const Logout = () => {
  const history = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('/accounts/logout/');
      history.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
