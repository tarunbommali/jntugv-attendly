import React, { useMemo, useState } from "react";
import useAppContext from "../../context/AppContext";
import RequestTable from "../ui/RequestTable";
import ActionModal from "../ui/ActionModal";
import UserTable from "./UserTable";
import CreateUserModal from "../ui/CreateUserModal";

const HigherAuthorityDashboard = () => {
  const { currentUser, requests, viewRequest, handleConfirmAction } =
    useAppContext();

  const [selectedAction, setSelectedAction] = useState(null);
  const [isCreateUserModalOpen, setIsCreateUserModalOpen] = useState(false);

  const dashboardTitle = `${currentUser?.role?.toUpperCase()} Dashboard`;

  const pendingRequests = useMemo(() => {
    switch (currentUser?.role) {
      case "hod":
        return requests.filter((r) => r.status === "pending_hod");
      case "principal":
        return requests.filter((r) => r.status === "pending_principal");
      case "registrar":
        return requests.filter((r) => r.status === "pending_registrar");
      default:
        return [];
    }
  }, [currentUser, requests]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{dashboardTitle}</h2>

        {/* Registrar-only: Create User button */}
        {currentUser?.role === "registrar" && (
          <button
            onClick={() => setIsCreateUserModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            + Create User
          </button>
        )}
      </div>

      {/* Show all users */}
      <UserTable />

      {/* Pending approvals table */}
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

      {/* Modal for Create User */}
      <CreateUserModal
        isOpen={isCreateUserModalOpen}
        onClose={() => setIsCreateUserModalOpen(false)}
      />
    </div>
  );
};

export default HigherAuthorityDashboard;
