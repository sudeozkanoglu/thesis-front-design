"use client";

import React from "react";

const NotificationBell = ({ notifications, onRemove }) => {
    if (!notifications.length) {
      return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4">
          <p className="text-center text-gray-500 text-sm">No notifications available</p>
        </div>
      );
    }
  
    return (
      <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg p-4 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification._id}
            className="p-3 bg-gray-100 rounded shadow relative"
          >
            <button
              onClick={() => onRemove(notification._id)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
            <h4 className="font-semibold text-blue-600">{notification.title}</h4>
            <p className="text-sm text-gray-600">{notification.message}</p>
          </div>
        ))}
      </div>
    );
  };

export default NotificationBell;