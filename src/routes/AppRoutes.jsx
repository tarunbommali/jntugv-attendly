import { Routes, Route, Navigate } from "react-router-dom";
import useAppContext from "../context/AppContext";

import LoginPage from "../pages/Login";
import HomePage from "../pages/HomePage";
import DashboardLayout from "../pages/DashboardLayout";
import ProtectedRoute from "./ProtectedRoute";
import { dashboardRoutes } from "../utils/dashboardRoutes";

function AppRoutes() {
  const { currentUser } = useAppContext();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={!currentUser ? <LoginPage /> : <Navigate to="/" />}
      />

      {/* Auto-generate dashboard routes */}
      {dashboardRoutes &&
        dashboardRoutes.map(({ path, role, element }) => (
          <Route
            key={path}
            path={path}
            element={
              <ProtectedRoute role={role}>
                <DashboardLayout>{element}</DashboardLayout>
              </ProtectedRoute>
            }
          />
        ))}

      {/* Fallback for unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default AppRoutes;
