"use client";

import React, { useState } from "react";
import {
  Trash2,
  Plus,
  CheckCheck,
  Clock,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card, CardContent, Button, TextField } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useRouter } from "next/navigation";

const QuestionBuilder = () => {
  const [examTime, setExamTime] = useState({ hours: 0, minutes: 0 });
  const [examDate, setExamDate] = useState(null);
  const router = useRouter();
  const [questions, setQuestions] = useState([
    { text: "", answer: "", showAnswer: false },
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { text: "", answer: "", showAnswer: false }]);
  };

  const removeQuestion = (index) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const updateQuestion = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const toggleAnswer = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].showAnswer = !newQuestions[index].showAnswer;
    setQuestions(newQuestions);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className="max-w-3xl mx-auto p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6 text-black">
          Create Exam Questions
        </h1>

        <Card className="bg-slate-50 shadow-lg">
          <CardContent className="p-6">
            <div className="flex items-center gap-6 justify-center">
              {/* Exam Time */}
              <div className="flex gap-4 items-center">
                <Clock className="h-5 w-5 text-black" />
                <TextField
                  id="outlined-number"
                  label="Minutes"
                  type="number"
                  value={examTime.minutes}
                  onChange={(e) =>
                    setExamTime({
                      ...examTime,
                      minutes: Number(e.target.value),
                    })
                  }
                  inputProps={{ min: 0 }}
                />
              </div>

              {/* Exam Date */}
              <div className="flex gap-4 items-center">
                <DatePicker
                  label="Exam Date"
                  value={examDate}
                  onChange={(newDate) => setExamDate(newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {questions.map((item, index) => (
          <Card key={index} className="bg-slate-50 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-start gap-4 ">
                <span className="flex items-center justify-center w-10 h-10 mt-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <TextField
                    value={item.text}
                    onChange={(e) =>
                      updateQuestion(index, "text", e.target.value)
                    }
                    multiline
                    rows={4}
                    fullWidth
                    placeholder="Add Question"
                  />
                  <Button
                    variant="ghost"
                    onClick={() => toggleAnswer(index)}
                    className="mt-2 flex items-center gap-2 text-blue-600 hover:text-blue-800"
                  >
                    {item.showAnswer ? (
                      <ChevronUp className="mr-2" />
                    ) : (
                      <ChevronDown className="mr-2" />
                    )}
                    {item.showAnswer ? "Hide Answer" : "Add Answer"}
                  </Button>
                </div>
                {questions.length > 1 && (
                  <Button
                    variant="ghost"
                    size="small"
                    onClick={() => removeQuestion(index)}
                  >
                    <Trash2 className="h-5 w-5 text-red-500 mt-12" />
                  </Button>
                )}
              </div>
              {item.showAnswer && (
                <div className="mt-4">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 text-blue-600 font-semibold">
                      A
                    </span>
                    <TextField
                      value={item.answer}
                      onChange={(e) =>
                        updateQuestion(index, "answer", e.target.value)
                      }
                      placeholder="Type the answer here..."
                      multiline
                      rows={3}
                      fullWidth
                      variant="outlined"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        <div className="flex justify-between pt-4">
          <Button
            onClick={addQuestion}
            variant="contained"
            color="primary"
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Add Question
          </Button>

          <Button
            onClick={() =>
              router.push("/lessonView")
            }
            variant="contained"
            color="success"
            className="flex items-center gap-2"
          >
            <CheckCheck className="h-4 w-4" />
            Complete Adding Questions
          </Button>
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default QuestionBuilder;