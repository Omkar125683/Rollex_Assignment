import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const UserContext = createContext({ userInfo: null, loginUser: null, logoutUser: null });

export const UserProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loginUser = async (credentials) => {
    setLoading(true);
    try {
      const { data } = await axios.post('http://localhost:5000/api/auth/login', credentials);
      setUserInfo(data);
      setError(null);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setUserInfo(null);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = () => {
    setUserInfo(null);
  };

  return (
    <UserContext.Provider value={{ userInfo, loading, error, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
