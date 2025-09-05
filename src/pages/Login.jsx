import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../context/AppContext";
import { EyeIcon, EyeOffIcon } from "lucide-react"; // 👈 install lucide-react for icons

const LoginForm = () => {
  const { users, login } = useAppContext();
  const navigate = useNavigate();

  const [department, setDepartment] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state

  // Extract unique departments
  const departments = [...new Set(users.map((u) => u.department))];

  // Filter users based on selected department
  const filteredUsers = users.filter((u) => u.department === department);

  // Auto-fill password when name changes (dev only)
  useEffect(() => {
    const selectedUser = filteredUsers.find((u) => u.name === name);
    if (selectedUser) {
      setPassword(selectedUser.password);
    } else {
      setPassword("");
    }
  }, [name, filteredUsers]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const success = login(department, name, password);

    if (success) {
      alert("Login successful!");

      const user = users.find(
        (u) => u.department === department && u.name === name
      );

      if (user) {
        switch (user.role) {
          case "faculty":
            navigate("/faculty/requests");
            break;
          case "hod":
            navigate("/hod/approvals");
            break;
          case "principal":
            navigate("/principal/approvals");
            break;
          case "registrar":
            navigate("/registrar/dashboard");
            break;
          default:
            navigate("/dashboard");
        }
      }
    } else {
      setPassword("");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 space-y-4"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Login
        </h2>

        {/* Department */}
        <div>
          <label className="block font-medium text-gray-700">Department</label>
          <select
            value={department}
            onChange={(e) => {
              setDepartment(e.target.value);
              setName("");
            }}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium text-gray-700">Name</label>
          <select
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded-lg p-2 mt-1 focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="">Select Name</option>
            {filteredUsers.map((user) => (
              <option key={user.uid} value={user.name}>
                {user.name} ({user.role})
              </option>
            ))}
          </select>
          {name && (
            <p className="text-sm text-gray-500 mt-1">
              Role: {filteredUsers.find((u) => u.name === name)?.role}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block font-medium text-gray-700">Password</label>
          <div className="relative mt-1">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded-lg p-2 pr-10 focus:ring-2 focus:ring-blue-500"
              placeholder="Enter password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOffIcon className="h-5 w-5" />
              ) : (
                <EyeIcon className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginForm;
