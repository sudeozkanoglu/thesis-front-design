"use client";

import React, { useState, useEffect } from "react";
import {
  Volume2,
  Mic,
  Square,
  Clock,
  User,
  ShieldAlert,
  PlayCircle,
  X,
  CheckCircle,
} from "lucide-react";

const ExamRulesModal = ({ onClose }) => {
  const [checkedRules, setCheckedRules] = useState(new Set());
  const [isAnimated, setIsAnimated] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAnimated(false), 300);
  }, []);

  const rules = [
    {
      icon: PlayCircle,
      color: "text-blue-500",
      bgColor: "bg-blue-50",
      title: "Audio Playback Limit",
      description: "You can listen to each audio only 2 times maximum.",
    },
    {
      icon: Square,
      color: "text-red-500",
      bgColor: "bg-red-50",
      title: "Recording Restriction",
      description: "Recording is disabled while audio is playing.",
    },
    {
      icon: Clock,
      color: "text-amber-500",
      bgColor: "bg-amber-50",
      title: "Auto-Submit",
      description: "When time expires, answers will be submitted automatically.",
    },
    {
      icon: ShieldAlert,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50",
      title: "Scoring Policy",
      description: "Unanswered questions will receive a score of 0 points.",
    },
    {
      icon: User,
      color: "text-purple-500",
      bgColor: "bg-purple-50",
      title: "Environment Requirements",
      description: "Take the exam in a quiet and isolated environment.",
    },
    {
      icon: Mic,
      color: "text-orange-500",
      bgColor: "bg-orange-50",
      title: "Microphone Mandatory",
      description: "Use a microphone for accurate scoring. Avoid low volume or noisy surroundings.",
    },
  ];

  const toggleRule = (index) => {
    const newChecked = new Set(checkedRules);
    if (newChecked.has(index)) {
      newChecked.delete(index);
    } else {
      newChecked.add(index);
    }
    setCheckedRules(newChecked);
  };

  const allRulesChecked = checkedRules.size === rules.length;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div 
        className={`bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
          isAnimated ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
      >
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-8 py-6 relative">
          <div className="flex items-center text-white">
            <div className="bg-white/20 p-3 rounded-full mr-4">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-1">Exam Rules & Guidelines</h2>
              <p className="text-blue-100 text-sm">Please read and acknowledge all rules before starting</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8 max-h-[60vh] overflow-y-auto">
          <div className="space-y-4">
            {rules.map((rule, index) => {
              const Icon = rule.icon;
              const isChecked = checkedRules.has(index);
              
              return (
                <div
                  key={index}
                  className={`group relative p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer hover:shadow-md ${
                    isChecked 
                      ? 'border-green-200 bg-green-50/50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => toggleRule(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2 rounded-lg ${rule.bgColor} shrink-0`}>
                      <Icon className={`w-5 h-5 ${rule.color}`} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-gray-700">
                        {rule.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {rule.description}
                      </p>
                    </div>

                    <div className="shrink-0 ml-2">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                        isChecked 
                          ? 'bg-green-500 border-green-500' 
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {isChecked && <CheckCircle className="w-4 h-4 text-white" />}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">
                Rules Acknowledged
              </span>
              <span className="text-sm text-gray-500">
                {checkedRules.size}/{rules.length}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(checkedRules.size / rules.length) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 px-8 py-6 border-t">
          <button
            onClick={onClose}
            disabled={!allRulesChecked}
            className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-200 ${
              allRulesChecked
                ? 'bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {allRulesChecked ? (
              <span className="flex items-center justify-center gap-2">
                <CheckCircle className="w-5 h-5" />
                I Understand, Start the Exam
              </span>
            ) : (
              `Please acknowledge all rules (${checkedRules.size}/${rules.length})`
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default ExamRulesModal;