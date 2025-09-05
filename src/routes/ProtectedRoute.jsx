// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import useAppContext from "../context/AppContext";

const ProtectedRoute = ({ children, role }) => {
  const { currentUser } = useAppContext();

  if (!currentUser) {
    // not logged in → go to login
    return <Navigate to="/login" replace />;
  }

  if (role && currentUser.role !== role) {
    // logged in but wrong role → go to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
