 
import React, { useState, useMemo } from "react";

import { DUMMY_REQUESTS, DUMMY_USERS } from "./utils/data";

import {
  BellIcon,
  UserCircleIcon,
  LogOutIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
} from "./components/ui/icons";

import {
  StatusBadge,
  ActionModal,
  RequestTable,
  NewRequestModal,
  ViewRequestModal,
} from "./components/ui/ui";

 

const FacultyDashboard = ({
  currentUser,
  requests,
  onCreateRequest,
  onViewRequest,
}) => {
  const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
  const myRequests = requests.filter((r) => r.requesterId === currentUser.uid);
  const activeRequests = myRequests.filter(
    (r) =>
      ![
        "approved",
        "rejected_hod",
        "rejected_principal",
        "rejected_registrar",
      ].includes(r.status)
  );
  const historyRequests = myRequests.filter((r) =>
    [
      "approved",
      "rejected_hod",
      "rejected_principal",
      "rejected_registrar",
    ].includes(r.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
        <button
          onClick={() => setIsNewRequestModalOpen(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
        >
          Create New Request
        </button>
      </div>

      <RequestTable
        title="Active Requests"
        requests={activeRequests}
        onView={onViewRequest}
        actionable={false}
      />
      <RequestTable
        title="Request History"
        requests={historyRequests}
        onView={onViewRequest}
        actionable={false}
      />

      <NewRequestModal
        isOpen={isNewRequestModalOpen}
        onClose={() => setIsNewRequestModalOpen(false)}
        onSubmit={onCreateRequest}
        currentUser={currentUser}
      />
    </div>
  );
};

const HigherAuthorityDashboard = ({
  currentUser,
  requests,
  onViewRequest,
  onAction,
}) => {
  const dashboardTitle = `${currentUser.role.toUpperCase()} Dashboard`;

  const pendingRequests = useMemo(() => {
    switch (currentUser.role) {
      case "hod":
        return requests.filter(
          (r) =>
            r.status === "pending_hod" &&
            DUMMY_USERS.find((u) => u.uid === r.requesterId)?.department ===
              currentUser.department
        );
      case "principal":
        return requests.filter((r) => r.status === "pending_principal");
      case "registrar":
        return requests.filter((r) => r.status === "pending_registrar");
      default:
        return [];
    }
  }, [currentUser, requests]);

  const processedRequests = useMemo(() => {
    return requests.filter((req) =>
      req.historyLog.some((log) => log.user === currentUser.name)
    );
  }, [currentUser, requests]);

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">{dashboardTitle}</h2>
      <RequestTable
        title="Pending For Your Approval"
        requests={pendingRequests}
        onView={onViewRequest}
        onAction={onAction}
        actionable={true}
      />
      <RequestTable
        title="Processed Requests History"
        requests={processedRequests}
        onView={onViewRequest}
        actionable={false}
      />
    </div>
  );
};

// --- LOGIN COMPONEN44T ---

const LoginScreen = ({ onLogin }) => {
  const [selectedUserId, setSelectedUserId] = useState(DUMMY_USERS[0].uid);

  const handleLogin = (e) => {
    e.preventDefault();
    const user = DUMMY_USERS.find((u) => u.uid === selectedUserId);
    if (user) {
      onLogin(user);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center items-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <svg
            className="h-12 w-auto text-indigo-600 mx-auto"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5-10-5-10 5z" />
          </svg>
          <h2 className="mt-4 text-3xl font-extrabold text-gray-900">
            Attendly for JNTU-GV
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Permission & Leave Management System
          </p>
        </div>
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="user-select"
              className="block text-sm font-medium text-gray-700"
            >
              Select User to Login As (Demo)
            </label>
            <select
              id="user-select"
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
            >
              {DUMMY_USERS.map((user) => (
                <option key={user.uid} value={user.uid}>
                  {user.name} ({user.role.toUpperCase()})
                </option>
              ))}
            </select>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// --- MAIN APP COMPONENT ---

export default function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [requests, setRequests] = useState(DUMMY_REQUESTS);

  // State for modals
  const [viewedRequest, setViewedRequest] = useState(null);
  const [actionRequest, setActionRequest] = useState(null);
  const [actionType, setActionType] = useState("approve");

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleViewRequest = (request) => {
    setViewedRequest(request);
  };

  const handleActionModalOpen = (request, type) => {
    setActionRequest(request);
    setActionType(type);
  };

  const handleCreateRequest = (newRequestData) => {
    const newRequest = {
      ...newRequestData,
      id: `req${Date.now()}`,
      status: "pending_hod",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      historyLog: [
        {
          action: "Submitted by Faculty",
          user: newRequestData.requesterName,
          timestamp: new Date().toISOString(),
        },
      ],
    };
    setRequests((prev) => [newRequest, ...prev]);
  };

  const handleConfirmAction = (requestId, comment) => {
    if (!currentUser) return;

    const now = new Date().toISOString();
    let newStatus = null;
    let logAction = "";

    const request = requests.find((r) => r.id === requestId);
    if (!request) return;

    switch (currentUser.role) {
      case "hod":
        newStatus =
          actionType === "approve" ? "pending_principal" : "rejected_hod";
        logAction =
          actionType === "approve" ? "Approved by HOD" : "Rejected by HOD";
        break;
      case "principal":
        newStatus =
          actionType === "approve" ? "pending_registrar" : "rejected_principal";
        logAction =
          actionType === "approve"
            ? "Approved by Principal"
            : "Rejected by Principal";
        break;
      case "registrar":
        newStatus =
          actionType === "approve" ? "approved" : "rejected_registrar";
        logAction =
          actionType === "approve"
            ? "Final Approval by Registrar"
            : "Final Rejection by Registrar";
        break;
    }

    if (newStatus) {
      const newLog = {
        action: logAction,
        user: currentUser.name,
        timestamp: now,
      };
      if (comment) newLog.comment = comment;

      setRequests((prev) =>
        prev.map((r) =>
          r.id === requestId
            ? {
                ...r,
                status: newStatus,
                updatedAt: now,
                historyLog: [...r.historyLog, newLog],
              }
            : r
        )
      );
    }
  };

  // Render logic
  if (!currentUser) {
    return <LoginScreen onLogin={handleLogin} />;
  }

  const renderDashboard = () => {
    switch (currentUser.role) {
      case "faculty":
        return (
          <FacultyDashboard
            currentUser={currentUser}
            requests={requests}
            onCreateRequest={handleCreateRequest}
            onViewRequest={handleViewRequest}
          />
        );
      case "hod":
      case "principal":
      case "registrar":
        return (
          <HigherAuthorityDashboard
            currentUser={currentUser}
            requests={requests}
            onViewRequest={handleViewRequest}
            onAction={handleActionModalOpen}
          />
        );
      default:
        return <div>Invalid Role. Please log out.</div>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Header user={currentUser} onLogout={handleLogout} />
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderDashboard()}
        </div>
      </main>

      <ViewRequestModal
        isOpen={!!viewedRequest}
        onClose={() => setViewedRequest(null)}
        request={viewedRequest}
      />
      <ActionModal
        isOpen={!!actionRequest}
        onClose={() => setActionRequest(null)}
        request={actionRequest}
        actionType={actionType}
        onConfirm={handleConfirmAction}
      />
    </div>
  );
}
