import useAppContext from "../context/AppContext";
import Header from "../components/Header";
import ProfileView from "../components/ProfileView";

const DashboardLayout = ({ children }) => {
  const { currentUser, logout } = useAppContext();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <Header onLogout={logout} />
      <ProfileView profile={currentUser} />
      {/* Page Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
