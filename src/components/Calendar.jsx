"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar } from "@mui/material";

function Calendar({ calendarData, personData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const changeMonth = (increment) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();

  const renderDays = () => {
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const exam = calendarData.find((e) => e.date === day);
      days.push(
        <div key={day} className="h-24 border rounded-lg p-2">
          <div className="text-sm text-black mb-1">{day}</div>
          {exam && (
            <div className={`p-2 rounded-md text-xs ${exam.color}`}>
              <div className="font-semibold flex justify-between items-center w-full">
                <span>{exam.subject}</span>
                <span
                  className={`px-2 py-1 rounded-md text-white text-smaller font-semibold ${
                    exam.type.startsWith("TR-EN")
                      ? "bg-yellow-500"
                      : "bg-orange-500"
                  }`}
                >
                  {exam.type}
                </span>
              </div>
              <div className="font-semibold">
                {exam.time} - {exam.endTime}
              </div>
            </div>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      {/* Calendar Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Avatar
            sx={{
              width: 50,
              height: 50,
              bgcolor: "primary.main",
              fontSize: 24,
            }}
          >
            {`${personData.firstName?.charAt(0) ?? ""}${
              personData.lastName?.charAt(0) ?? ""
            }`}
          </Avatar>
          <h2 className="text-lg font-semibold text-slate-800">
            {personData.firstName} {personData.lastName}
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => changeMonth(-1)}
            className="p-2 hover:bg-slate-100 text-black rounded-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <h3 className="text-lg font-semibold min-w-[120px] text-center text-black">
            {monthNames[currentMonth.getMonth()]}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-slate-100 text-black rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-5 gap-4">
        <div className="text-center font-semibold text-black">Mon</div>
        <div className="text-center font-semibold text-black">Tue</div>
        <div className="text-center font-semibold text-black">Wed</div>
        <div className="text-center font-semibold text-black">Thu</div>
        <div className="text-center font-semibold text-black">Fri</div>
        {renderDays()}
      </div>
    </div>
  );
}

Calendar.propTypes = {
  calendarData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      subject: PropTypes.string.isRequired,
      date: PropTypes.number.isRequired,
      time: PropTypes.string.isRequired,
      endTime: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  personData: PropTypes.shape({
    personName: PropTypes.string.isRequired,
  }).isRequired,
};

export default Calendar;
