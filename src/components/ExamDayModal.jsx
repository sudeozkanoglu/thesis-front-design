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
          <ul className="space-y-2">
            {exams.map((exam) => (
              <li
                key={exam.id}
                className={`p-3 rounded-md text-sm shadow ${exam.color}`}
              >
                <div className="font-semibold">{exam.subject}</div>
                <div className="text-xs">{exam.type}</div>
              </li>
            ))}
          </ul>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ExamDayModal;