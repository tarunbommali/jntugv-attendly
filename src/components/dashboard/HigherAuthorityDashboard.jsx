import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import useAppContext from '../../context/AppContext';
import RequestTable from '../ui/RequestTable';
import ActionModal from '../ui/ActionModal';

const HigherAuthorityDashboard = () => {
  const { currentUser, requests, viewRequest, handleConfirmAction } = useAppContext();

  const [selectedAction, setSelectedAction] = useState(null); 
  // { request, type }

  const dashboardTitle = `${currentUser?.role?.toUpperCase()} Dashboard`;

  const pendingRequests = useMemo(() => {
    switch (currentUser?.role) {
      case 'hod':
        return requests.filter(r => r.status === 'pending_hod');
      case 'principal':
        return requests.filter(r => r.status === 'pending_principal');
      case 'registrar':
        return requests.filter(r => r.status === 'pending_registrar');
      default:
        return [];
    }
  }, [currentUser, requests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{dashboardTitle}</h2>
        {currentUser?.role === 'registrar' && (
          <Link
            to="/dashboard/registrar/create-user"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Create User
          </Link>
        )}
      </div>

      <RequestTable
        title="Pending For Your Approval"
        requests={pendingRequests}
        onView={viewRequest}
        actionable={true}
        onAction={(req, type) => setSelectedAction({ request: req, type })}
      />

      {/* Modal for Approve/Reject */}
      <ActionModal
        isOpen={!!selectedAction}
        onClose={() => setSelectedAction(null)}
        request={selectedAction?.request}
        actionType={selectedAction?.type}
        onConfirm={(id, comment) =>
          handleConfirmAction(id, selectedAction.type, comment)
        }
      />
    </div>
  );
};

export default HigherAuthorityDashboard;
