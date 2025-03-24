"use client";
import React from "react";

const Header = () => {
  return (
    <div className=" container bg-dark flex justify-between items-center p-4 shadow-md bg-gray-400">
     <img src="img\logo\logo.png" alt="" className="w-8 h-8 rounded-full"/>
      <div className="flex items-center space-x-8">
        <div className="text-2xl text-blue-500 font-semibold">
          <span className="text-white">🌊</span> Dashboard
        </div>
        <nav className="flex space-x-6">
          <a href="#" className="text-gray-300 hover:text-white">
            Team
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Projects
          </a>
          <a href="#" className="text-gray-300 hover:text-white">
            Calendar
          </a>
        </nav>
      </div>

      {/* Search and Profile */}
      <div className="flex items-center space-x-6">
        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            className="bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
          <span className="absolute top-3 right-3 text-gray-400">
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

        {/* Notifications */}
        <div className="text-gray-300 hover:text-white">
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-2a6 6 0 10-12 0v-7a4 4 0 00-4-4V6a6 6 0 0112 0v3a4 4 0 00-4 4v7z"
            />
          </svg>
        </div>

        {/* Profile */}
        <div className="flex items-center space-x-2">
          <img
            src="img\logo\logo.png"
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
