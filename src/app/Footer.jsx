"use client";

import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-600 text-white mt-8">
      <div className="max-w-7xl mx-auto px-4 py-4">
      <div className="grid grid-cols-1 justify-items-center">
          <div>
            <h3 className="text-lg font-bold mb-4 text-center">TriLingua</h3>
            <p className="text-slate-300 text-sm text-center">
              Learn languages effectively with our comprehensive online platform.
            </p>
          </div>
        </div>
        <div className="border-t border-slate-300 mt-4 pt-4 text-center text-slate-300">
          <p>&copy; {new Date().getFullYear()} TriLingua. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;