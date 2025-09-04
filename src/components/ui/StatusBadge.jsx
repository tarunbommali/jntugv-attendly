import React from 'react';

const StatusBadge = ({ status }) => {
    const statusStyles = {
        pending_hod: { text: 'Pending HOD', color: 'bg-yellow-100 text-yellow-800' },
        pending_principal: { text: 'Pending Principal', color: 'bg-yellow-100 text-yellow-800' },
        pending_registrar: { text: 'Pending Registrar', color: 'bg-yellow-100 text-yellow-800' },
        approved: { text: 'Approved', color: 'bg-green-100 text-green-800' },
        rejected_hod: { text: 'Rejected by HOD', color: 'bg-red-100 text-red-800' },
        rejected_principal: { text: 'Rejected by Principal', color: 'bg-red-100 text-red-800' },
        rejected_registrar: { text: 'Rejected by Registrar', color: 'bg-red-100 text-red-800' },
    };
    const style = statusStyles[status] || { text: 'Unknown', color: 'bg-gray-100 text-gray-800' };

    return (
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${style.color}`}>{style.text}</span>
    );
};


export default StatusBadge;