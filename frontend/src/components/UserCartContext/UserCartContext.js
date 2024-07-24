import React, { createContext, useState, useEffect } from 'react';

export const UserCartContext = createContext();

export const UserCartProvider = ({ children }) => {
  const [User_cart, setUserCart] = useState(() => {
    return parseInt(localStorage.getItem('User_cart')) || 0;
  });

  useEffect(() => {
    localStorage.setItem('User_cart', User_cart);
  }, [User_cart]);

  return (
    <UserCartContext.Provider value={{ User_cart, setUserCart }}>
      {children}
    </UserCartContext.Provider>
  );
};
