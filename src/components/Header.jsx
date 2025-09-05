import { BellIcon, UserCircleIcon, LogOutIcon } from "./ui/icons";

const Header = ({ onLogout }) => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
      {/* Logo / Title */}
      <h1 className="text-2xl font-bold text-blue-600">Attendly</h1>

      {/* Right side */}
      <div className="flex items-center space-x-6">
        {/* Notifications */}
        <button className="relative p-2 rounded-full hover:bg-gray-100">
          <BellIcon className="h-6 w-6 text-gray-600 hover:text-gray-800" />
          {/* Badge */}
          <span className="absolute -top-0.5 -right-0.5 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
            3
          </span>
        </button>

        {/* User info */}
        <div className="flex items-center space-x-3">
          {/* Logout */}
          <button
            onClick={onLogout}
            className="p-2 rounded-full hover:bg-gray-100"
            title="Logout"
          >
            <LogOutIcon className="h-6 w-6 text-gray-600 hover:text-red-600" />
          </button>
        </div>
      </div>
    </div>
  </header>
);

export default Header;
