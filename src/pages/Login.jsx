import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';


const LoginPage = () => {
    const { users, login, currentUser } = useAppContext();
    const [selectedUserId, setSelectedUserId] = useState(users[0]?.uid || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (currentUser) navigate(`/dashboard/${currentUser.role}`);
    }, [currentUser, navigate]);
    
    const handleLogin = (e) => {
        e.preventDefault();
        const user = users.find(u => u.uid === selectedUserId);
        if (user) login(user);
    };

    return (
        <div className="min-h-screen bg-gray-50 flex justify-center items-center">
            <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-center text-3xl font-extrabold text-gray-900">Sign in</h2>
                <form className="mt-8 space-y-6" onSubmit={handleLogin}>
                    <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full p-2 border rounded-md">
                        {users.map(user => <option key={user.uid} value={user.uid}>{user.name} ({user.role})</option>)}
                    </select>
                    <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white rounded-md">Sign In</button>
                </form>
            </div>
        </div>
    );
};


export default LoginPage;