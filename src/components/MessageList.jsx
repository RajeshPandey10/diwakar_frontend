import React, { useEffect, useState } from "react";
import apiService from "../services/apiService"; // Fixed import
import { toast } from "react-toastify";

const MessageList = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const data = await apiService.fetchMessages();
        setMessages(data || []); // Ensure messages is an array
      } catch (error) {
        console.error("Error fetching messages:", error);
        toast.error("Failed to fetch messages");
      }
    };

    getMessages();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Messages</h1>
      <div className="space-y-4">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message._id} className="bg-gray-100 p-4 rounded shadow">
              <p className="font-bold">{message.name}</p>
              <p>{message.message}</p>
              <p className="text-sm text-gray-500">{message.email}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No messages available.</p>
        )}
      </div>
    </div>
  );
};

export default MessageList;
