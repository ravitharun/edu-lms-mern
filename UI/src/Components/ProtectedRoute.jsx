import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { UserName } from "../Apis/Islogin";

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Not logged in
    if (!UserName) {
        return <Navigate to="/login" replace />;
    }

    const role = UserName.role;

    // Role not allowed
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/access-restricted" replace />;
    }

    // Allowed
    return children;
};

export default ProtectedRoute;