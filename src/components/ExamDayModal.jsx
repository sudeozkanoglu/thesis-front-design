"use client";

import React from "react";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

const ExamDayModal = ({ open, onClose, exams, date }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>📅 {date}</DialogTitle>
      <DialogContent dividers>
        {exams.length === 0 ? (
          <p className="text-gray-500">No exams for this day.</p>
        ) : (
          <ul className="space-y-3">
            {exams.map((exam) => (
              <li
                key={exam.id}
                className={`p-4 rounded-md text-sm shadow ${exam.color}`}
              >
                <div className="font-semibold text-base mb-1">
                  {exam.subject}
                </div>

                {/* Ders adı */}
                {exam.courseName && (
                  <div className="text-sm text-gray-700 mb-1 italic">
                    📘 {exam.courseName}
                  </div>
                )}

                {/* Tür ve saat */}
                <div className="flex justify-between text-xs text-gray-600">
                  <span className="uppercase">{exam.type}</span>
                  <span>
                    ⏰ {exam.time} - {exam.endTime}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamDayModal;