import React, { useState } from "react";
import Modal from "./Modal";

const ActionModal = ({ isOpen, onClose, request, actionType, onConfirm }) => {
  const [comment, setComment] = useState("");

  if (!request) return null;

  const isApprove = actionType === "approve";
  const title = isApprove ? "Approve Request" : "Reject Request";
  const buttonClass = isApprove
    ? "bg-green-600 hover:bg-green-700"
    : "bg-red-600 hover:bg-red-700";

  const handleConfirm = () => {
    onConfirm(request.id, comment);
    setComment("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className="space-y-4">
        <p>
          Are you sure you want to {actionType} this request from{" "}
          <span className="font-semibold">{request.requesterName}</span>?
        </p>
        {!isApprove && (
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Reason for Rejection (Required)
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              required
              rows={3}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-red-500 focus:border-red-500"
            ></textarea>
          </div>
        )}
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className={`inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white ${buttonClass}`}
            disabled={!isApprove && !comment}
          >
            Confirm
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ActionModal;
