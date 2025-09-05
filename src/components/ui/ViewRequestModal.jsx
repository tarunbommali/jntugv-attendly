import Modal from "./Modal";
import StatusBadge from "./StatusBadge";
import { CheckCircleIcon, XCircleIcon, ClockIcon } from "./icons";

const ViewRequestModal = ({ isOpen, onClose, request }) => {
  if (!request) return null;

  const getIconForAction = (action) => {
    if (action.toLowerCase().includes("approve"))
      return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
    if (action.toLowerCase().includes("reject"))
      return <XCircleIcon className="w-5 h-5 text-red-500" />;
    return <ClockIcon className="w-5 h-5 text-gray-500" />;
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Details for Request #${request.id}`}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-semibold text-gray-800">Requester:</p>
            <p className="text-gray-600">{request.requesterName}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Department:</p>
            <p className="text-gray-600">{request.requesterDepartment}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Leave Type:</p>
            <p className="text-gray-600">{request.requestType}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Duration:</p>
            <p className="text-gray-600">
              {new Date(request.startDate).toLocaleDateString()} to{" "}
              {new Date(request.endDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Current Status:</p>
            <StatusBadge status={request.status} />
          </div>
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">
            Reason Provided:
          </p>
          <p className="text-gray-600 bg-gray-50 p-3 rounded-md mt-1 text-sm">
            {request.reason}
          </p>
        </div>
        <div>
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Approval History
          </h4>
          <div className="border border-gray-200 rounded-md p-4 space-y-4">
            {request.historyLog.map((log, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div>{getIconForAction(log.action)}</div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    {log.action} by {log.user}
                  </p>
                  <p className="text-xs text-gray-500">
                    {new Date(log.timestamp).toLocaleString()}
                  </p>
                  {log.comment && (
                    <p className="text-sm mt-1 p-2 bg-red-50 border border-red-200 rounded-md text-red-700">
                      Comment: {log.comment}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewRequestModal;