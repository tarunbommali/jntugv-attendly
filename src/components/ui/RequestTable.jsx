import StatusBadge from './StatusBadge';

const RequestTable = ({ title, requests, onView, onAction, actionable }) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4 text-gray-800">{title}</h3>
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Requester</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dates</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                    {requests.length > 0 ? requests.map(req => (
                        <tr key={req.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.requesterName}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requesterDepartment}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.requestType}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><StatusBadge status={req.status} /></td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                <button onClick={() => onView(req)} className="text-indigo-600 hover:text-indigo-900">View</button>
                                {actionable && onAction && (
                                    <>
                                        <button onClick={() => onAction(req, 'approve')} className="text-green-600 hover:text-green-900">Approve</button>
                                        <button onClick={() => onAction(req, 'reject')} className="text-red-600 hover:text-red-900">Reject</button>
                                    </>
                                )}
                            </td>
                        </tr>
                    )) : (
                        <tr>
                           <td colSpan={6} className="text-center py-10 text-gray-500">No requests to display.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    </div>
);

export default RequestTable;