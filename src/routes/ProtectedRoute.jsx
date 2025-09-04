import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const ProtectedRoute = ({ children, role }) => {
    const { currentUser } = useAppContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!currentUser || currentUser.role !== role) {
            navigate('/login', { replace: true });
        }
    }, [currentUser, navigate, role]);

    return (currentUser && currentUser.role === role) ? children : null;
};

export default ProtectedRoute;