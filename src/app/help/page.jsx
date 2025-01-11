"use client";
import React, { useState } from "react";
import { Search, User, UserCog, Laptop, LifeBuoy, GraduationCap, FileCheck, Code } from "lucide-react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import Footer from "../../components/Footer";
import Chatbot from "../../components/Chatbot";

const HelpPage = () => {
  const [activeTab, setActiveTab] = useState("students");
  const [activeLink, setActiveLink] = useState("Help");

  const categories = {
    students: {
      icon: <User className="w-5 h-5" />,
      title: "For Students",
      content: [
        {
          title: "Recording Guidelines",
          items: [
            "Clear audio quality recording",
            "Minimal background noise",
            "Moderate speaking pace",
            "Supported formats: .mp4, .mov, .avi",
          ],
        },
        {
          title: "Assessment Process",
          items: [
            "AI speech-to-text processing",
            "Grammar & semantics analysis",
            "Answer key comparison",
            "Automated result generation",
          ],
        },
      ],
      bottomCard: {
        icon: <GraduationCap className="w-6 h-6 text-blue-500" />,
        title: "Learning Resources",
        description:
          "Access video tutorials, practice exercises, and translation guides to improve your skills.",
      },
    },
    instructors: {
      icon: <UserCog className="w-5 h-5" />,
      title: "For Instructors",
      content: [
        {
          title: "Assessment Setup",
          items: [
            "Create assessments",
            "Upload answer keys",
            "Set evaluation criteria",
            "Define submission periods",
          ],
        },
        {
          title: "Result Management",
          items: [
            "Access automated reports",
            "Review flagged translations",
            "Adjust scoring",
            "Export results",
          ],
        },
      ],
      bottomCard: {
        icon: <FileCheck className="w-6 h-6 text-blue-500" />,
        title: "Assessment Tools",
        description:
          "Explore our grading rubrics, feedback templates, and assessment best practices.",
      },
    },
    technical: {
      icon: <Laptop className="w-5 h-5" />,
      title: "Technical",
      content: [
        {
          title: "System Requirements",
          items: [
            "Modern browsers (Chrome, Firefox, Safari)",
            "Stable internet connection",
            "Microphone access",
            "Updated browser version",
          ],
        },
        {
          title: "File Specifications",
          items: [
            "Max file size: 500MB",
            "Min resolution: 720p",
            "Clear audio required",
            "Accepted formats: MP4, MOV, AVI",
          ],
        },
      ],
      bottomCard: {
        icon: <Code className="w-6 h-6 text-blue-500" />,
        title: "API Documentation",
        description:
          "Integrate with our system using our comprehensive API documentation and SDKs.",
      },
    },
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <Navbar />
      {/* Ekranın üst kısmındaki boşluk ve flex container */}
      <div className="pt-24 px-4 flex gap-4">
        {/* Sol Sütun: Sidebar */}
        <div className="w-64 flex flex-col gap-4 ">
          <Sidebar activeLink={activeLink} setActiveLink={setActiveLink} />
          <Chatbot />
        </div>

        {/* Sağ Sütun: Help İçerikleri */}
        <div className="flex-1 bg-slate-50 rounded-lg shadow-md p-6">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              How can we help you?
            </h1>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for help..."
                className="w-full px-6 py-3 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 pl-12"
              />
              <Search className="absolute left-4 top-3.5 text-gray-400 w-5 h-5" />
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            {Object.entries(categories).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all ${
                  activeTab === key
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {value.icon}
                {value.title}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories[activeTab].content.map((section, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-xl font-semibold mb-4 text-gray-800">
                  {section.title}
                </h3>
                <ul className="space-y-3">
                  {section.items.map((item, itemIdx) => (
                    <li
                      key={itemIdx}
                      className="flex items-center gap-2 text-gray-600"
                    >
                      <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* New Bottom Card - Centered */}
          <div className="mt-6 mb-5 max-w-2xl mx-auto">
            <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-blue-100">
              <div className="flex items-center justify-center gap-4">
                <div className="bg-blue-50 p-4 rounded-xl">
                  {categories[activeTab].bottomCard.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">
                    {categories[activeTab].bottomCard.title}
                  </h3>
                  <p className="text-gray-600 mt-1">
                    {categories[activeTab].bottomCard.description}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Support Card */}
          <div className="mt-8 bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <LifeBuoy className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  Need more help?
                </h3>
                <p className="text-gray-600">
                  Contact support: support@translationassessment.com
                </p>
                <p className="text-gray-600">
                  Available Monday-Friday, 9:00-17:00
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HelpPage;
