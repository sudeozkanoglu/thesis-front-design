"use client";
import React, { useState, useRef, useEffect } from "react";
import { Send, User, Bot } from "lucide-react";

export default function Chatbot() {
  const [messages, setMessages] = useState([
    {
      text: "Hello! How can I help you with the translation assessment system?",
      isBot: true,
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, isBot: false }]);
    setInput("");

    // Bot yanıtını simüle et
    setTimeout(() => {
      const responses = [
        "Would you like to know more about the assessment process?",
        "I can help you with submitting your translation video.",
        "Let me explain how the system evaluates translations.",
        "Feel free to ask about technical requirements.",
      ];
      setMessages((prev) => [
        ...prev,
        {
          text: responses[Math.floor(Math.random() * responses.length)],
          isBot: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="w-full h-[550px] bg-white rounded-lg shadow-md flex flex-col">
      {/* Header */}
      <div className="bg-blue-500 p-4 rounded-t-lg">
        <h2 className="text-white font-semibold text-lg">Translation Assistant</h2>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        <div className="space-y-4">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex items-start gap-2 ${message.isBot ? "" : "flex-row-reverse"}`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center
                  ${message.isBot ? "bg-blue-100" : "bg-gray-100"}`}
              >
                {message.isBot ? (
                  <Bot className="w-5 h-5 text-blue-500" />
                ) : (
                  <User className="w-5 h-5 text-gray-500" />
                )}
              </div>
              <div
                className={`max-w-[75%] p-3 rounded-2xl ${
                  message.isBot
                    ? "bg-white text-gray-800 shadow-sm"
                    : "bg-blue-500 text-white"
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="p-2 border-t">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type your message..."
            className="flex p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
