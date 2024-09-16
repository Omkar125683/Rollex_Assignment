// App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/HomePage';
import Login from './components/Auth/Login';
import AdminDashboard from './components/Admin/AdminDashboard';
import Signup from './components/Auth/Signup';
import StoreDetail from './components/User/StoreDetail';
import EditProfile from './components/User/EditProfile';
import ProtectedRoute from './auth/ProtectedRoute';
import Logout from './components/Auth/Logout';
import StoreOwnerDashboard from './components/Store/StoreDashboard';
import EditPassword from './components/User/EditPassword';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={
        <Home />
        } />
      <Route path="/login" element={<Login />} />
      
      <Route path="/admin/dashboard" element={
        <ProtectedRoute allowedRoles={['Admin']}>
            <AdminDashboard />
        </ProtectedRoute>} />
        <Route path="/store/dashboard" element={
        <ProtectedRoute allowedRoles={['StoreOwner']}>
            <StoreOwnerDashboard />
        </ProtectedRoute>} />
        <Route path="/admin/add_account" element={
        <ProtectedRoute allowedRoles={['Admin']}>
            <Signup roleChangeAllow={true} />
        </ProtectedRoute>} />
      <Route path="/register" element={
        <Signup roleChangeAllow={false}  />
        } />
      <Route path="/detail/:id" element={
        <StoreDetail/>
        } />
      <Route path="/profile/change_details" element={
        <ProtectedRoute allowedRoles={['Admin','User','StoreOwner']}>
        <EditProfile roleChangeAllow={false}/>
    </ProtectedRoute>
        } />
        <Route path="/profile/change_password" element={
        <ProtectedRoute allowedRoles={['Admin','User','StoreOwner']}>
        <EditPassword/>
    </ProtectedRoute>
        } />
        <Route path="/logout" element={
        <ProtectedRoute>
        <Logout/>
    </ProtectedRoute>
        } />
    </Routes>
  );
};

export default App;
