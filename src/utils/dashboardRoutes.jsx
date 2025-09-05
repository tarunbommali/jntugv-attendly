// src/utils/dashboardRoutes.js
import FacultyDashboard from '../components/dashboard/FacultyDashboard';
import HigherAuthorityDashboard from '../components/dashboard/HigherAuthorityDashboard';
 
export const dashboardRoutes = [
  { path: "/dashboard/faculty", role: "faculty", element: <FacultyDashboard /> },
  { path: "/dashboard/hod", role: "hod", element: <HigherAuthorityDashboard /> },
  { path: "/dashboard/principal", role: "principal", element: <HigherAuthorityDashboard /> },
  { path: "/dashboard/registrar", role: "registrar", element: <HigherAuthorityDashboard /> },
 ];
