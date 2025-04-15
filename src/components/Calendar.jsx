"use client";

import React, { useState } from "react";
import PropTypes from "prop-types";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import ExamDayModal from "@/components/ExamDayModal";

function Calendar({ calendarData, personData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedExams, setSelectedExams] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];

  const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const changeMonth = (increment) => {
    setCurrentMonth((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + increment);
      return newDate;
    });
  };

  const renderDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1);
    const firstDayIndex = (firstDayOfMonth.getDay() + 6) % 7;

    const days = [];

    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="h-24" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const formattedDate = currentDate.toLocaleDateString(undefined, {
        day: "numeric",
        month: "long",
        year: "numeric",
      });

      const examsOfDay = calendarData.filter((exam) => {
        const examDate = new Date(exam.fullDate);
        return (
          examDate.getDate() === currentDate.getDate() &&
          examDate.getMonth() === currentDate.getMonth() &&
          examDate.getFullYear() === currentDate.getFullYear()
        );
      });

      days.push(
        <div
          key={day}
          className="h-24 border rounded-lg p-2 overflow-auto cursor-pointer hover:bg-slate-50"
          onClick={() => {
            setSelectedExams(examsOfDay);
            setSelectedDate(formattedDate);
            setModalOpen(true);
          }}
        >
          <div className="text-sm text-black mb-1">{day}</div>

          {examsOfDay.length > 0 && (
            <Tooltip
            title={
              <div className="text-sm space-y-1">
                {examsOfDay.map((exam) => (
                  <div key={exam.id}>{exam.subject}</div>
                ))}
              </div>
            }
            arrow
            placement="top"
          >
            <div className="flex flex-wrap gap-1">
              {examsOfDay.slice(0, 3).map((exam) => (
                <span
                  key={exam.id}
                  className={`text-[10px] px-2 py-1 rounded-md font-medium truncate max-w-full ${exam.color}`}
                >
                  {exam.subject.length > 12
                    ? exam.subject.slice(0, 12) + "..."
                    : exam.subject}
                </span>
              ))}
          
              {examsOfDay.length > 3 && (
                <span className="text-[10px] px-2 py-1 rounded-md font-medium bg-gray-200 text-gray-800">
                  +{examsOfDay.length - 3} more
                </span>
              )}
            </div>
          </Tooltip>
          )}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="flex-1 bg-white rounded-lg shadow-md p-6">
      {/* Header */}
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
            {`${personData.firstName?.charAt(0) ?? ""}${personData.lastName?.charAt(0) ?? ""}`}
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
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <button
            onClick={() => changeMonth(1)}
            className="p-2 hover:bg-slate-100 text-black rounded-full"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Days Header */}
      <div className="grid grid-cols-7 gap-4 mb-2">
        {dayNames.map((day) => (
          <div key={day} className="text-center font-semibold text-black">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-4">{renderDays()}</div>

      {/* Modal */}
      <ExamDayModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        exams={selectedExams}
        date={selectedDate}
      />
    </div>
  );
}

Calendar.propTypes = {
  calendarData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      subject: PropTypes.string.isRequired,
      fullDate: PropTypes.string.isRequired,
      time: PropTypes.string,
      endTime: PropTypes.string,
      color: PropTypes.string.isRequired,
      type: PropTypes.string.isRequired,
    })
  ).isRequired,
  personData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
  }).isRequired,
};

export default Calendar;