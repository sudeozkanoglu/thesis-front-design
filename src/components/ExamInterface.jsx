"use client";

import { useState, useRef, useEffect } from "react";
import {
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  Square,
  Video,
} from "lucide-react";
import StaticAudioWaveform from "@/components/StaticAudioWaveform";
import { useRouter } from "next/navigation";
import ExamRulesModal from "@/components/ExamRulesModal";
import { useToast } from "@/components/context/ToastContext";

const AudioExamInterface = ({ questions = [], duration, exam, student }) => {
  const { showToast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timeLeft, setTimeLeft] = useState(() => duration * 60);
  const [isRecording, setIsRecording] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [recordings, setRecordings] = useState({});
  const [recordingBlobs, setRecordingBlobs] = useState({});
  const router = useRouter();
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [showRulesModal, setShowRulesModal] = useState(true);
  const [startTimer, setStartTimer] = useState(false);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const submitAnswer = async () => {
    const blob = recordingBlobs[currentQuestion];
    if (!blob) return showToast("No recording found for this question!", "error");

    const formData = new FormData();
    formData.append("audio", blob);
    formData.append("examId", exam); 
    formData.append("studentId", student); 
    formData.append("questionId", questions[currentQuestion]._id);
    formData.append("language", questions[currentQuestion].language || "tr");

    try {
      const res = await fetch("http://localhost:4000/api/stt/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
      } else {
      }
    } catch (err) {
      console.error("STT API error:", err);
    }
  };

  useEffect(() => {
    if (!startTimer) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTimer]);

  useEffect(() => {
    setTimeLeft(duration * 60);
  }, [duration]);

  useEffect(() => {
    if (timeLeft === 0) {
      fetch("http://localhost:4000/api/exam-submissions/autocomplete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ studentId: student, examId: exam }),
      });

      showToast("Time is up! Your exam is being submitted.", "info");
      router.push("/student/exam");
    }
  }, [timeLeft]);

  useEffect(() => {
    let interval;

    if (isRecording) {
      const start = Date.now();
      interval = setInterval(() => {
        const elapsed = Math.floor((Date.now() - start) / 1000);
        setRecordingDuration(elapsed);
      }, 1000);
    } else {
      setRecordingDuration(0);
    }

    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      videoRef.current.srcObject = stream;
      mediaRecorderRef.current = new MediaRecorder(stream);

      let chunks = [];
      mediaRecorderRef.current.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm" });

        // URL for preview
        setRecordings((prev) => ({
          ...prev,
          [currentQuestion]: URL.createObjectURL(blob),
        }));

        // Blob for backend
        setRecordingBlobs((prev) => ({
          ...prev,
          [currentQuestion]: blob,
        }));
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (err) {
      console.error("Error accessing media devices:", err);
    }
  };

  const stopRecording = () => {
    if (
      mediaRecorderRef.current &&
      mediaRecorderRef.current.state !== "inactive"
    ) {
      mediaRecorderRef.current.stop();
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      setIsRecording(false);
    }
  };

  return (
    <div className="relative">
      {showRulesModal && (
        <ExamRulesModal
          onClose={() => {
            setShowRulesModal(false);
            setStartTimer(true);
          }}
        />
      )}
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-slate-800">
              English for Tourism and Hospitality - Final Exam
            </h1>
            <div className="flex items-center gap-2 text-slate-600">
              <Clock className="w-5 h-5" />
              <span
                className={`font-mono ${timeLeft < 60 ? "text-red-600" : ""}`}
              >
                {formatTime(timeLeft)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="mb-6">
            <span className="text-sm text-slate-500">
              Question {currentQuestion + 1} of {questions.length}
            </span>

            <div className="my-6">
              <StaticAudioWaveform
                text={questions[currentQuestion]?.questionText}
                isRecording={isRecording}
                isAudioPlaying={isAudioPlaying}
                setIsAudioPlaying={setIsAudioPlaying}
              />
            </div>

            <div className="mt-8">
              <div className="aspect-video bg-slate-100 rounded-lg overflow-hidden mb-4 relative">
                {isRecording && (
                  <div className="absolute top-2 right-2 bg-red-600 text-white px-3 py-1 rounded-full flex items-center gap-2 text-sm shadow-lg z-10">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    REC – {formatTime(recordingDuration)}
                  </div>
                )}

                {!isRecording && !recordings[currentQuestion] && (
                  <div className="flex flex-col items-center justify-center w-full h-full bg-slate-200 text-slate-700 text-center px-4">
                    <Video className="w-10 h-10 mb-2" />
                    <p className="text-lg font-semibold">
                      Camera will turn on when recording starts
                    </p>
                    <p className="text-sm text-slate-500">
                      Make sure your webcam and microphone are connected
                    </p>
                  </div>
                )}

                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  muted
                  playsInline
                />
              </div>

              <div className="flex justify-center gap-4">
                {!isRecording ? (
                  <button
                    onClick={startRecording}
                    disabled={isAudioPlaying}
                    className={`flex items-center gap-2 px-6 py-3 rounded-md ${
                      isAudioPlaying
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-500 text-white hover:bg-red-600"
                    }`}
                  >
                    <Video className="w-5 h-5" />
                    Start Recording
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-500 text-white rounded-md hover:bg-slate-600"
                  >
                    <Square className="w-5 h-5" />
                    Stop Recording
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() =>
                setCurrentQuestion((prev) => Math.max(0, prev - 1))
              }
              disabled={currentQuestion === 0}
              className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium
              ${
                currentQuestion === 0
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-blue-800 text-white hover:bg-blue-600"
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
              Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                className="flex items-center gap-2 px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                onClick={() => {
                  submitAnswer();
                  router.push("/student/exam");
                }}
              >
                <Check className="w-5 h-5" />
                Submit Exam
              </button>
            ) : (
              <button
                onClick={() => {
                  submitAnswer();
                  setCurrentQuestion((prev) =>
                    Math.min(questions.length - 1, prev + 1)
                  );
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-800 hover:bg-blue-600"
              >
                Next
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioExamInterface;
