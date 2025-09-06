/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import useAppContext from "../../context/AppContext";

const CreateUserModal = ({ isOpen, onClose }) => {
  const { currentUser, createUser } = useAppContext();

  if (!isOpen) return null;

  // Only registrar can create users
  if (!currentUser || currentUser.role !== "registrar") {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
          <p className="text-red-600 font-semibold text-center">
            ❌ You are not authorized to create users.
          </p>
          <div className="mt-4 flex justify-center">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "faculty",
    department: "IT",
    qualification: "",
    dateOfJoining: "",
    place: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createUser(form);
    onClose(); // close modal after submit
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Create New User</h2>

        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
            required
          />
          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          >
            <option value="faculty">Faculty</option>
            <option value="hod">HOD</option>
            <option value="principal">Principal</option>
            <option value="registrar">Registrar</option>
          </select>
          <input
            type="text"
            name="department"
            placeholder="Department"
            value={form.department}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            name="qualification"
            placeholder="Qualification"
            value={form.qualification}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="date"
            name="dateOfJoining"
            value={form.dateOfJoining}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="text"
            name="place"
            placeholder="Place"
            value={form.place}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-md"
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;
