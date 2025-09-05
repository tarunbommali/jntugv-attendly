/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { DUMMY_REQUESTS, DUMMY_USERS } from "../utils/data";
import { useNavigate } from "react-router-dom";
import { ViewRequestModal } from "../components/ui/ui";

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  // --- Load from localStorage or fallback to DUMMY
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem("currentUser");
    return saved ? JSON.parse(saved) : null;
  });

  const [requests, setRequests] = useState(() => {
    const saved = localStorage.getItem("requests");
    return saved ? JSON.parse(saved) : DUMMY_REQUESTS;
  });

  const [users, setUsers] = useState(() => {
    const saved = localStorage.getItem("users");
    return saved ? JSON.parse(saved) : DUMMY_USERS;
  });

  // --- Sync with localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("requests", JSON.stringify(requests));
  }, [requests]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
    } else {
      localStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // --- Authentication ---
  const login = (department, name, password) => {
    const foundUser = users.find(
      (u) =>
        u.department === department &&
        u.name === name &&
        u.password === password
    );

    if (foundUser) {
      setCurrentUser(foundUser);
      return true;
    } else {
      alert("Invalid credentials! Please try again.");
      return false;
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
    navigate("/login");
  };

  // --- Requests (create, update, confirm action) ---
  const addRequest = (newRequestData) => {
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

  const handleConfirmAction = (requestId, actionType, comment) => {
    if (!currentUser) return;
    const now = new Date().toISOString();
    let newStatus = null;
    let logAction = "";

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
      default:
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

  // --- Users ---
  const createUser = (newUserData) => {
    const newUser = {
      ...newUserData,
      uid: `${newUserData.role}${Date.now()}`, // simple UID
      password: newUserData.password || "default123",
    };
    setUsers((prev) => [...prev, newUser]);
    alert(`User ${newUser.name} created successfully!`);
  };

  // --- Modal (view request details) ---
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);

  const viewRequest = (request) => {
    setSelectedRequest(request);
    setIsViewModalOpen(true);
  };

  const closeViewRequest = () => {
    setSelectedRequest(null);
    setIsViewModalOpen(false);
  };

  // --- Profile View ---
  const [selectedProfile, setSelectedProfile] = useState(null);

  const viewProfile = (uid) => {
    const user = users.find((u) => u.uid === uid);
    if (user) {
      setSelectedProfile(user);
    }
  };

  const closeProfile = () => {
    setSelectedProfile(null);
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        requests,
        users,
        login,
        logout,
        addRequest,
        handleConfirmAction,
        createUser,
        // request modal
        viewRequest,
        closeViewRequest,
        selectedRequest,
        isViewModalOpen,
        // profile view
        selectedProfile,
        viewProfile,
        closeProfile,
      }}
    >
      {children}
      {/* Global View Modal */}
      <ViewRequestModal
        isOpen={isViewModalOpen}
        onClose={closeViewRequest}
        request={selectedRequest}
      />
    </AppContext.Provider>
  );
};

// Custom hook
const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};

export default useAppContext;
