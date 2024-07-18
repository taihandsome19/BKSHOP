import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';

const ProtectedRoute = ({ component: Component, isProtected, redirectTo, trigger, ...rest }) => {
  const [isLogged, setIsLogged] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const res = await axios.get('http://localhost:3001/auth/log_state');
        setIsLogged(res.data.status);
        
        const l_islog = localStorage.getItem("isLogged");
        if(String(l_islog) !== String(res.data.status)){
            localStorage.setItem('isLogged', res.data.status);
            window.location.reload();
        }
      } catch (error) {
        setIsLogged(false);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLogged === null) {
    return null;
  }

  if (isProtected && isLogged === true && trigger) {
    return <Navigate to={redirectTo} />;
  }

  if (isProtected && isLogged === false && !trigger) {
    return <Navigate to={redirectTo} />;
  }

  return <Component {...rest} />;
};

export default ProtectedRoute;
