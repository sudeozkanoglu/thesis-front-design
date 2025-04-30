"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import AudioExamInterface from "../../../components/ExamInterface";

export default function ExamPage() {
  const { examId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [duration, setDuration] = useState(30);
  
  useEffect(() => {
    if (!examId) return;

    const fetchQuestions = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/exams/${examId}`);
        const data = await res.json();
        if (data.success && data.exam) {
          setQuestions(data.exam.questions || []);
          setDuration(data.exam.duration || 30); 
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [examId]);

  return <AudioExamInterface questions={questions} duration={duration}/>;
}