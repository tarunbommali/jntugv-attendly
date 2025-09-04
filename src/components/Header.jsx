import {
  BellIcon,
  UserCircleIcon,
  LogOutIcon,
} from './ui/icons';


const Header = ({ user, onLogout }) => (
    <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
            <h1 className="text-2xl font-bold">Attendly</h1>
            <div className="flex items-center space-x-4">
                <div>
                    <p className="font-medium">{user?.name}</p>
                    <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button onClick={onLogout}><LogOutIcon className="h-6 w-6" /></button>
            </div>
        </div>
    </header>
);

export default Header;