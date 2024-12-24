"use client";

import React from 'react';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const LoginPage = () => {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Background Image */}
      <div className="hidden md:flex md:w-1/2 relative">
        {/* Background Image */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/login2.jpeg')", // Arka plan resmi
            backgroundSize: "cover", // Resim tamamen kapsar
            backgroundPosition: "center", // Resim ortalanır
            backgroundRepeat: "no-repeat", // Resim tekrar etmez
            zIndex: 1, // Katmanın altında olmasını sağlar
          }}
        />
        {/* Overlay */}
        <div
          className="absolute inset-0 bg-gray-600 opacity-50"
          style={{
            zIndex: 2, // Overlay katmanı
          }}
        />
        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white p-8 ml-44">
          <h2 className="text-3xl font-semibold mb-4">TriLingua AI</h2>
          <p className="text-lg italic">"Bridge the Gap with Accurate AI-Powered Translations"</p>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <Card className="w-full max-w-md shadow-lg radius-2xl">
          <CardContent>
            <form className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="username">
                  Username
                </label>
                <Input 
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium" htmlFor="password">
                  Password
                </label>
                <Input 
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="w-full"
                />
              </div>

              <Button className="w-full text-white bg-gray-600 hover:bg-gray-700" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;