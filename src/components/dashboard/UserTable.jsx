import React, { useState, useMemo } from "react";
import { Mail, Phone } from "lucide-react";
import useAppContext from "../../context/AppContext";
import SendMessageModal from "./SendMessageModal";

const UserTable = () => {
  const { users } = useAppContext();

  const [search, setSearch] = useState("");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Sorting function
  const sortData = (data) => {
    if (!sortConfig.key) return data;

    return [...data].sort((a, b) => {
      let aVal, bVal;

      if (sortConfig.key === "experience") {
        aVal = new Date().getFullYear() - new Date(a.dateOfJoining).getFullYear();
        bVal = new Date().getFullYear() - new Date(b.dateOfJoining).getFullYear();
      } else if (sortConfig.key === "rating") {
        aVal = a.rating;
        bVal = b.rating;
      } else {
        aVal = a[sortConfig.key];
        bVal = b[sortConfig.key];
      }

      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  };

  // Apply filters + search
  const filteredUsers = useMemo(() => {
    const data = users.filter((u) => {
      const matchesSearch =
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      const matchesDept =
        departmentFilter === "all" || u.department === departmentFilter;

      const matchesRole = roleFilter === "all" || u.role === roleFilter;

      return matchesSearch && matchesDept && matchesRole;
    });

    return sortData(data);
  }, [users, search, departmentFilter, roleFilter, sortConfig]);

  // Toggle selection
  const toggleUser = (uid) => {
    setSelectedUsers((prev) =>
      prev.includes(uid) ? prev.filter((id) => id !== uid) : [...prev, uid]
    );
  };

  // Select all
  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.uid));
    }
  };

  // Sort handler
  const requestSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key && prev.direction === "asc") {
        return { key, direction: "desc" };
      }
      return { key, direction: "asc" };
    });
  };

  // Render sort indicator
  const renderSortArrow = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? " ↑" : " ↓";
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Search + Filters */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full sm:w-1/3"
        />

        <div className="flex gap-3">
          <select
            value={departmentFilter}
            onChange={(e) => setDepartmentFilter(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="all">All Departments</option>
            <option value="IT">IT</option>
            <option value="Administration">Administration</option>
          </select>

          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border px-2 py-1 rounded-md"
          >
            <option value="all">All Roles</option>
            <option value="faculty">Faculty</option>
            <option value="hod">HOD</option>
            <option value="principal">Principal</option>
            <option value="registrar">Registrar</option>
          </select>
        </div>
      </div>

      {/* Bulk Action */}
      {selectedUsers.length > 0 && (
        <div className="mb-3 flex gap-2">
          <button
            onClick={() => setIsMessageModalOpen(true)}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Send Message ({selectedUsers.length})
          </button>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  checked={
                    selectedUsers.length > 0 &&
                    selectedUsers.length === filteredUsers.length
                  }
                  onChange={toggleSelectAll}
                />
              </th>
              <th
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                onClick={() => requestSort("name")}
              >
                Name {renderSortArrow("name")}
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((u) => {
                const experience =
                  new Date().getFullYear() -
                  new Date(u.dateOfJoining).getFullYear();

                return (
                  <tr key={u.uid}>
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(u.uid)}
                        onChange={() => toggleUser(u.uid)}
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {u.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {u.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">
                      {u.role}
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                      <a
                        href={u.emailLink}
                        className="text-indigo-600 hover:text-indigo-900 flex items-center gap-1"
                      >
                        <Mail size={16} /> Email
                      </a>
                      <a
                        href={u.whatsapp}
                        target="_blank"
                        rel="noreferrer"
                        className="text-green-600 hover:text-green-900 flex items-center gap-1"
                      >
                        <Phone size={16} /> WhatsApp
                      </a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-10 text-gray-500"
                >
                  No users to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Send Message Modal */}
      <SendMessageModal
        isOpen={isMessageModalOpen}
        onClose={() => setIsMessageModalOpen(false)}
        selectedUsers={users.filter((u) => selectedUsers.includes(u.uid))}
      />
    </div>
  );
};

export default UserTable;
