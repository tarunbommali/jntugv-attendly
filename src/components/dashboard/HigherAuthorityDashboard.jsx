
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import RequestTable from '../ui/RequestTable';


const HigherAuthorityDashboard = ({ currentUser, requests, onViewRequest, onAction }) => {
    const dashboardTitle = `${currentUser.role.toUpperCase()} Dashboard`;
    const pendingRequests = useMemo(() => {
        switch (currentUser.role) {
            case 'hod': return requests.filter(r => r.status === 'pending_hod');
            case 'principal': return requests.filter(r => r.status === 'pending_principal');
            case 'registrar': return requests.filter(r => r.status === 'pending_registrar');
            default: return [];
        }
    }, [currentUser, requests]);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">{dashboardTitle}</h2>
                {currentUser.role === 'registrar' && (
                    <Link to="/dashboard/registrar/create-user" className="bg-indigo-600 text-white px-4 py-2 rounded-md">Create User</Link>
                )}
            </div>
            <RequestTable title="Pending For Your Approval" requests={pendingRequests} onView={onViewRequest} onAction={onAction} actionable={true} />
        </div>
    );
};

export default HigherAuthorityDashboard;