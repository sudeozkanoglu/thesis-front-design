"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const router = useRouter();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleFocus = (field) => {
    setFocusedField(field);
  };

  const handleBlur = (field, value) => {
    if (!value) {
      setFocusedField(null);
    }
  };

  const redirectToRegister = () => {
    router.push("/register");
  };
  
  const onLogin = async (event) => {
    event.preventDefault();
    const newUrl = "http://localhost:4000/api/user/login";

    try {
      const response = await axios.post(newUrl, formData);

      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        localStorage.setItem("userId", response.data.userId);
        if (response.data.userType === "Student") {
          router.push("/dashboard");
        }
        else if (response.data.userType === "Teacher") {
          router.push("/teacherDashboard");
        }
        else {
          router.push("/admin");
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="hidden md:flex md:w-1/2 relative">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/login2.jpeg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            zIndex: 1,
          }}
        />
        <div
          className="absolute inset-0 bg-gray-600 opacity-50"
          style={{ zIndex: 2 }}
        />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 ml-44"
        >
          <h2 className="text-3xl font-semibold mb-4">TriLingua AI</h2>
          <p className="text-lg italic">
            "Bridge the Gap with Accurate AI-Powered Translations"
          </p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent>
            <motion.div initial="hidden" animate="visible" className="space-y-6">
              <motion.div>
                <Typography
                  variant="h5"
                  className="text-center font-bold text-gray-800 mb-6"
                >
                  Welcome Back to TriLingua
                </Typography>
              </motion.div>

              <motion.form className="space-y-6" onSubmit={onLogin}>
                {["email", "password"].map((field) => (
                  <motion.div className="space-y-2 relative" key={field}>
                    <motion.label
                      animate={{
                        y: focusedField === field || formData[field] ? -14 : 8,
                        fontSize:
                          focusedField === field || formData[field]
                            ? "12px"
                            : "16px",
                        color:
                          focusedField === field || formData[field]
                            ? "#1D4ED8"
                            : "#6B7280",
                        fontFamily: "Roboto, sans-serif",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="absolute left-3 pointer-events-none"
                      htmlFor={field}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </motion.label>
                    <div className="relative">
                      <Input
                        id={field}
                        type={field === "password" && !showPassword ? "password" : "text"}
                        className="w-full pr-10"
                        value={formData[field]}
                        onFocus={() => handleFocus(field)}
                        onBlur={(e) => handleBlur(field, e.target.value)}
                        onChange={handleInputChange}
                      />
                      {field === "password" && (
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}

                <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    className="w-full bg-blue-500 text-white hover:bg-blue-600"
                    type="submit"
                  >
                    Sign in
                  </Button>
                </motion.div>
              </motion.form>
            </motion.div>
            <div className="text-center mt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <button
                    className="text-blue-600 hover:underline font-semibold"
                    onClick={redirectToRegister}
                  >
                    Register here
                  </button>
                </p>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;