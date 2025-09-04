
import React, { useState } from 'react';
import RequestTable from '../ui/RequestTable';
import NewRequestModal from '../ui/NewRequestModal';



const FacultyDashboard = ({ currentUser, requests, onCreateRequest, onViewRequest }) => {
    const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
    const myRequests = requests.filter(r => r.requesterId === currentUser.uid);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">My Dashboard</h2>
                <button onClick={() => setIsNewRequestModalOpen(true)} className="bg-indigo-600 text-white px-4 py-2 rounded-md">New Request</button>
            </div>
            <RequestTable title="My Requests" requests={myRequests} onView={onViewRequest} actionable={false} />
            <NewRequestModal isOpen={isNewRequestModalOpen} onClose={() => setIsNewRequestModalOpen(false)} onSubmit={onCreateRequest} currentUser={currentUser} />
        </div>
    );
};

export default FacultyDashboard;