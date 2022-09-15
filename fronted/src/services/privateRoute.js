import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import localStorageFunction from "./localStorage";

const PrivateRoute = () => {
    const currentUser = localStorageFunction.getCurrentUser();
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;


