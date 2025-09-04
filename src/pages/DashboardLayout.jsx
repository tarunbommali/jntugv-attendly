import { useAppContext } from '../context/AppContext';
import Header from '../components/Header';

const DashboardLayout = ({ children }) => {
    const { currentUser, logout } = useAppContext();
    return (
        <div>
            <Header user={currentUser} onLogout={logout} />
            <main>{children}</main>
        </div>
    );
};

export default DashboardLayout;