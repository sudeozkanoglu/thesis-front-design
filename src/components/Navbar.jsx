"use client";

import React, {useState, useEffect} from "react";
import { Bell } from "lucide-react";
import NotificationBell from "./NotificationBell";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const title = "TriLingua";

  const userId = typeof window !== "undefined" ? localStorage.getItem("userId") : null;

  useEffect(() => {
    if (!userId) return;

    const fetchNotifications = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/notifications/${userId}`);
        const data = await res.json();
        if (data.success) {
          setNotifications(data.notifications);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    fetchNotifications();
  }, [userId]);

  const handleRemoveNotification = async (id) => {
    try {
      await fetch(`http://localhost:4000/api/notifications/${id}`, {
        method: "DELETE",
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to remove notification:", err);
    }
  };

  return (
    <nav className="fixed top-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 z-50">
      <div className="flex justify-between items-center">
        <div className="w-32" />
        <h1 className="text-2xl font-bold text-center text-blue-500">
          {title}
        </h1>
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <Bell className="w-6 h-6 text-slate-600" />
          </button>
          {showNotifications && (
            <NotificationBell
              notifications={notifications}
              onRemove={handleRemoveNotification}
            />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
