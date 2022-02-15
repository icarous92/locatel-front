import React, { useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import { AuthWrapper } from './context';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Cuenta from './components/Cuenta';

const RoutesContent = props => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (localStorage['token'] && localStorage['user'] && ['/', '/register'].indexOf(location.pathname) > -1) navigate("/home");
  }, [location, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<AuthWrapper> <Home /> </AuthWrapper>} />      
      <Route path="/cuenta" element={<AuthWrapper> <Cuenta /> </AuthWrapper>} />
    </Routes>
  );
}

export default RoutesContent
