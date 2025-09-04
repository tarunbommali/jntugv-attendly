import { Routes, Route, Navigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import ProtectedRoute from './ProtectedRoute';
import HomePage from '../pages/HomePage';
import LoginPage from '../pages/Login';
import DashboardLayout from '../pages/DashboardLayout';
import FacultyDashboardPage from '../dashboard/FacultyDashboardPage';

import HigherAuthorityDashboardPage from '../dashboard/HigherAuthorityDashboardPage';

import CreateUserPage from '../components/CreateUserPage';
import NotFoundPage from '../components/NotFound';

function AppRoutes() {
    const { currentUser } = useAppContext();
    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/" />} />
            <Route path="/dashboard/faculty" element={<ProtectedRoute role="faculty"><DashboardLayout><FacultyDashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/hod" element={<ProtectedRoute role="hod"><DashboardLayout><HigherAuthorityDashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/principal" element={<ProtectedRoute role="principal"><DashboardLayout><HigherAuthorityDashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/registrar" element={<ProtectedRoute role="registrar"><DashboardLayout><HigherAuthorityDashboardPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="/dashboard/registrar/create-user" element={<ProtectedRoute role="registrar"><DashboardLayout><CreateUserPage /></DashboardLayout></ProtectedRoute>} />
            <Route path="*" element={<NotFoundPage />} />
        </Routes>
    );
}

export default AppRoutes;
