"use client";

import React, {useState} from "react";
import { Bell } from "lucide-react";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const title = "TriLingua";
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "System Update",
      message: "New features will be available next week",
      color: "yellow",
    },
    {
      id: 2,
      title: "System Maintenance",
      message: "Scheduled maintenance on Dec 25",
      color: "blue",
    },
  ]);

  const handleRemoveNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };



  return (
    <nav className="fixed top-4 left-4 right-4 bg-white/80 backdrop-blur-sm rounded-lg shadow-md p-4 z-50">
      <div className="flex justify-between items-center">
        {/* Boş alan veya logo konumlandırmak için */}
        <div className="w-32" />

        {/* Başlık */}
        <h1 className="text-2xl font-bold text-center text-blue-500">
          {title}
        </h1>

        {/* Bildirim Butonu ve Bildirimler */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <Bell className="w-6 h-6 text-slate-600" />
          </button>
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-gray-50/70 backdrop-blur-lg rounded-lg shadow-lg p-4">
              {notifications.length === 0 ? (
                <p className="text-sm text-gray-500 text-center">
                  No notifications available
                </p>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className="mb-4 p-3 bg-neutral-200/70 backdrop-blur-sm rounded-md relative shadow-lg"
                  >
                    <button
                      onClick={() => handleRemoveNotification(notification.id)}
                      className="absolute top-2 right-2 text-slate-500 hover:text-slate-700"
                    >
                      ×
                    </button>
                    <h3
                      className={`font-semibold text-${notification.color}-600`}
                    >
                      {notification.title}
                    </h3>
                    <p className={`text-sm text-${notification.color}-600`}>
                      {notification.message}
                    </p>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
