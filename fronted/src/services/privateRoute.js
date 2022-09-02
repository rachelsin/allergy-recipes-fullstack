/* import React from 'react';
import { Navigate, Outlet, Route } from 'react-router-dom';
import localStorageFunction from "./localStorage";

const PrivateRoute = () => {
    const currentUser = localStorageFunction.getCurrentUser();

    const auth = null;
    return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;


 */