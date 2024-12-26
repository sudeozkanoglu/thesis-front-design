"use client";
import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

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
        <div className="absolute inset-0 bg-gray-600 opacity-50" style={{ zIndex: 2 }} />
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 ml-44"
        >
          <h2 className="text-3xl font-semibold mb-4">TriLingua AI</h2>
          <p className="text-lg italic">"Bridge the Gap with Accurate AI-Powered Translations"</p>
        </motion.div>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-gray-50">
        <Card className="w-full max-w-md">
          <CardContent>
            <motion.div
              initial="hidden"
              animate="visible"
              className="space-y-6"
            >
              <motion.div>
                <Typography variant="h5" className="text-center font-bold text-gray-800 mb-6">
                  Welcome to TriLingua
                </Typography>
              </motion.div>

              <motion.form className="space-y-6">
                {/* Email Field with Floating Label */}
                <motion.div className="space-y-2 relative">
                  <motion.label
                    animate={{
                      y: isEmailFocused ? -10 : 15,
                      fontSize: isEmailFocused ? "12px" : "16px",
                      color: isEmailFocused ? "#1D4ED8" : "#6B7280",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute left-3 pointer-events-none"
                    htmlFor="email"
                  >
                    Email
                  </motion.label>
                  <Input
                    id="email"
                    type="email"
                    placeholder=""
                    className="w-full"
                    onFocus={() => setIsEmailFocused(true)}
                    onBlur={(e) => setIsEmailFocused(e.target.value !== "")}
                  />
                </motion.div>

                {/* Password Field with Floating Label */}
                <motion.div className="space-y-2 relative">
                  <motion.label
                    animate={{
                      y: isPasswordFocused ? -10 : 10,
                      fontSize: isPasswordFocused ? "12px" : "16px",
                      color: isPasswordFocused ? "#1D4ED8" : "#6B7280",
                      fontFamily: "Roboto, sans-serif",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="absolute left-3 pointer-events-none"
                    htmlFor="password"
                  >
                    Password
                  </motion.label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder=""
                      className="w-full pr-10"
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={(e) => setIsPasswordFocused(e.target.value !== "")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </motion.div>

                {/* Submit Button */}
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
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
