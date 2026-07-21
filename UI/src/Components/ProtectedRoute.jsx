import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { UserRole } from "../Apis/Islogin";

const ProtectedRoute = ({ allowedRoles, children }) => {
    // Not logged in
    if (!UserRole) {
        return <Navigate to="/login" replace />;
    }
    if (UserRole.AccountStatus) {
        return <Navigate to="/AccountDeactivate" replace />;
    }
    const role = UserRole.role;

    // Role not allowed
    if (!allowedRoles.includes(role)) {
        return <Navigate to="/access-restricted" replace />;
    }

    // Allowed
    return children;
};

export default ProtectedRoute;