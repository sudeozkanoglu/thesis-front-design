"use client";
import React, { useEffect, useState } from "react";
import { Home, BookOpen, Settings, HelpCircle, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

const Sidebar = ({ activeLink, setActiveLink }) => {
  const router = useRouter();
  const [userType, setUserType] = useState("");

  // localStorage'dan userType'ı yükle
  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    setUserType(storedUserType || "Student"); // Varsayılan olarak "student"
  }, []);

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const getHref = (basePath) => {
    if (basePath === "/help") {
      return "/help"; // Help sayfası her iki kullanıcı için ortak
    }

    if (userType === "Teacher") {
      const adjustedPath =
        basePath === "/" ? "Dashboard" : capitalizeFirstLetter(basePath.slice(1));
      return `/teacher${adjustedPath}`;
    }
    return basePath;
  };

  const handleLogout = () => {
    localStorage.removeItem("userType");
    localStorage.removeItem("token");
    router.push("/login");
  };

  const links = [
    { icon: Home, text: "Dashboard", href: getHref("/dashboard") },
    { icon: BookOpen, text: "Exams", href: getHref("/exam") },
    { icon: Settings, text: "Profile", href: getHref("/profile") },
    { icon: HelpCircle, text: "Help", href: getHref("/help") },
    { icon: LogOut, text: "Logout", href: getHref("#") },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 ">
      <nav className="space-y-2">
        {links.map(({ icon: Icon, text, href }) => (
          <a
            key={text}
            href="#"
            onClick={(e) => {
              e.preventDefault(); // Varsayılan tıklama davranışını önle

              if (text === "Logout") {
                handleLogout(); // Logout işlemini çağır
              } else {
                setActiveLink(text); // Aktif bağlantıyı ayarla
                router.push(href); // Yönlendirme yap
              }
            }}
            className={`flex items-center gap-3 px-4 py-2 rounded-md transition-colors ${
              activeLink === text
                ? "bg-blue-50 text-blue-600 font-semibold"
                : "text-black hover:bg-slate-50 font-semibold"
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{text}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;