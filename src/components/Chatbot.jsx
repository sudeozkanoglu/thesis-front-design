"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  User,
  Bot,
  RefreshCcw,
  FileText,
  Laptop,
  GraduationCap,
  UserCog,
  HelpCircle,
} from "lucide-react";

const conversationFlow = {
  start: {
    question: "How can I assist you today?",
    options: [
      { label: "Translation Assessment Process", next: "assessment", icon: <FileText className="w-4 h-4" /> },
      { label: "Technical Issues", next: "technical", icon: <Laptop className="w-4 h-4" /> },
      { label: "Student Guidelines", next: "students", icon: <GraduationCap className="w-4 h-4" /> },
      { label: "Instructor Guidelines", next: "instructors", icon: <UserCog className="w-4 h-4" /> },
      { label: "General Questions", next: "general", icon: <HelpCircle className="w-4 h-4" /> },
    ],
  },
  assessment: {
    question: "Which part of the assessment process would you like to learn about?",
    options: [
      { label: "Evaluation Criteria", next: "criteria" },
      { label: "Submission Instructions", next: "submission" },
      { label: "Result Generation", next: "results" },
    ],
  },
  criteria: { answer: "We evaluate translations based on grammar, semantic accuracy, contextual consistency, and overall fluency." },
  submission: { answer: "Students must record a clear audio/video and upload it in supported formats (.mp4, .mov, .avi) within the deadline." },
  results: { answer: "After processing, detailed reports and scores are automatically generated for students and instructors." },
  technical: {
    question: "What type of technical issue are you facing?",
    options: [
      { label: "File Upload Problems", next: "upload" },
      { label: "Audio/Video Quality Issues", next: "audio" },
      { label: "Account/Login Issues", next: "login" },
    ],
  },
  upload: { answer: "Ensure your file is smaller than 500MB, clear in audio, and saved in MP4, MOV, or AVI format." },
  audio: { answer: "Record in a quiet environment with a good microphone and stable internet connection for best quality." },
  login: { answer: "If you face login issues, please reset your password or contact support at support@translationassessment.com." },
  students: { answer: "Students should focus on clear speech, minimal background noise, and ensure using supported file formats." },
  instructors: { answer: "Instructors can create custom assessments, upload answer keys, define scoring criteria, and monitor results." },
  general: {
    question: "What would you like to know more about?",
    options: [
      { label: "Platform Features", next: "features" },
      { label: "Support Contact", next: "support" },
    ],
  },
  features: { answer: "Our platform supports automated grading, detailed reporting, practice exercises, and instructor feedback tools." },
  support: { answer: "For any issues, contact us at support@translationassessment.com. We usually respond within 24 hours!" },
};

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [currentNode, setCurrentNode] = useState(null);
  const [input, setInput] = useState("");
  const [waitingForRestart, setWaitingForRestart] = useState(false);
  const [isChatEnded, setIsChatEnded] = useState(false);
  const [isRestarting, setIsRestarting] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const startConversation = () => {
    setCurrentNode("start");
    typeWriter(conversationFlow.start.question, conversationFlow.start.options);
  };

  const handleRestartConversation = () => {
    setMessages([]);
    setIsChatEnded(false);
    setWaitingForRestart(false);
    setIsRestarting(true);
    setCurrentNode(null);

    setTimeout(() => {
      typeWriter("Welcome back! Let's continue... 🚀");
      setTimeout(() => {
        setIsRestarting(false);
        startConversation();
      }, 2000);
    }, 200);
  };

  const typeWriter = (text, options = null) => {
    let index = 0;
    let typedText = "";

    const typingInterval = setInterval(() => {
      typedText += text[index];
      if (index === 0) {
        setMessages((prev) => [...prev, { text: typedText, isBot: true, options: null }]);
      } else {
        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].text = typedText;
          return newMessages;
        });
      }
      index++;

      if (index === text.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          if (options) {
            setMessages((prev) => {
              const newMessages = [...prev];
              newMessages[newMessages.length - 1].options = options;
              return newMessages;
            });
          }
        }, 300);
      }
    }, 30);
  };

  const handleOptionClick = (option) => {
    setSelectedOption(option.label);

    const nextNode = conversationFlow[option.next];

    setTimeout(() => {
      if (nextNode.answer) {
        typeWriter(nextNode.answer);

        setTimeout(() => {
          typeWriter("Do you need help with anything else?", [
            { label: "Yes", next: "restart" },
            { label: "No", next: "end" },
          ]);
          setWaitingForRestart(true);
        }, nextNode.answer.length * 30 + 1000);
      } else if (nextNode.question) {
        typeWriter(nextNode.question, nextNode.options);
      }
      setCurrentNode(option.next);
    }, 500);
  };

  const handleRestartChoice = (option) => {
    setSelectedOption(option.label);
    if (option.next === "restart") {
      typeWriter(conversationFlow.start.question, conversationFlow.start.options);
      setWaitingForRestart(false);
    } else if (option.next === "end") {
      typeWriter("Thank you for using the Translation Assistant! Have a great day! 😊");
      setWaitingForRestart(false);
      setCurrentNode("ended");
      setIsChatEnded(true);
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");

    setTimeout(() => {
      typeWriter(
        "I'm currently unable to respond directly to your message. However, I can assist you with the following options:",
        conversationFlow.start.options
      );
    }, 2000);
  };

  return (
    <div className="w-full h-[550px] bg-white rounded-lg shadow-md flex flex-col relative overflow-hidden">
      {!currentNode && !waitingForRestart && !isChatEnded && !isRestarting && (
        <div className="absolute inset-0 bg-gradient-to-br from-white/60 via-white/40 to-white/20 backdrop-blur-md flex items-center justify-center z-10 animate-fade-in">
          <button
            onClick={startConversation}
            className="bg-blue-500 text-white py-3 px-6 rounded-full text-lg font-semibold hover:bg-blue-600 transition-all shadow-lg"
          >
            Start Conversation
          </button>
        </div>
      )}

      {/* Header */}
      <div className="bg-blue-500 p-4 rounded-t-lg">
        <h2 className="text-white font-semibold text-lg">
          Translation Assistant
        </h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div key={index} className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? "bg-blue-100" : "bg-gray-100"}`}>
                {message.isBot ? <Bot className="w-5 h-5 text-blue-500" /> : <User className="w-5 h-5 text-gray-500" />}
              </div>
              <div className={`max-w-[75%] p-3 rounded-2xl ${message.isBot ? "bg-white text-gray-800 shadow-sm" : "bg-blue-500 text-white"} transition-all duration-300`}>
                <div className="break-words">{message.text}</div>
                {message.options && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() =>
                          waitingForRestart ? handleRestartChoice(option) : handleOptionClick(option)
                        }
                        disabled={selectedOption === option.label}
                        className={`flex items-center gap-2 text-sm py-2 px-4 rounded-lg shadow transition-all ${
                          selectedOption === option.label
                            ? "bg-blue-500 text-white cursor-default"
                            : "bg-blue-100 hover:bg-blue-200 text-blue-700"
                        }`}
                      >
                        {option.icon}
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isChatEnded && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleRestartConversation}
                className="flex items-center gap-2 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-4 rounded-lg shadow transform transition-transform active:scale-95"
              >
                <RefreshCcw className="w-4 h-4" />
                Start Conversation Again
              </button>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-2 border-t">
        {currentNode && !waitingForRestart && (
          <div className="flex items-center gap-2 text-black">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSend()}
              placeholder="Type your message..."
              className="flex p-2 border rounded-lg text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSend}
              className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}