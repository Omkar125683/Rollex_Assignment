import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Logout = () => {
    const notify = (msg) => toast.success(msg, {
        position: "top-right",
        autoClose: 1000,
        closeButton: false});
    const { logoutUser } = useUser();
    const navigate = useNavigate();

    useEffect(() => {
        logoutUser();
        navigate('/');
    }, [logoutUser, navigate]);

    return null;
};

export default Logout;
