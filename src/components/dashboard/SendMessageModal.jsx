import React, { useState } from "react";

const SendMessageModal = ({ isOpen, onClose, selectedUsers }) => {
  const [message, setMessage] = useState("");
  const [method, setMethod] = useState("email"); // "email" or "whatsapp"

  if (!isOpen) return null;

  const handleSend = () => {
    if (method === "email") {
      alert(`📧 Sending Email to: ${selectedUsers.map((u) => u.email).join(", ")}\n\nMessage: ${message}`);
    } else {
      alert(`📱 Sending WhatsApp to: ${selectedUsers.map((u) => u.whatsapp).join(", ")}\n\nMessage: ${message}`);
    }
    setMessage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Send Message</h2>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message here..."
          className="w-full border p-2 rounded-md h-28"
        />

        <div className="flex gap-4 mt-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === "email"}
              onChange={() => setMethod("email")}
            />
            Email
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              checked={method === "whatsapp"}
              onChange={() => setMethod("whatsapp")}
            />
            WhatsApp
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="bg-gray-300 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessageModal;
