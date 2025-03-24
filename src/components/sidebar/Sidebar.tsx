"use client";
import React, { useState } from "react";
import Banner from "../banner/Banner";
import ProductCard from "../productcard/ProductCard";
import ProductCategories from "../productCategories/ProductCategories";

const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [userDetailsVisible, setUserDetailsVisible] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null); // State to manage the active menu

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleUserDetails = () => {
    setUserDetailsVisible(!userDetailsVisible);
  };

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu); // Set the selected menu
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-purple-600 w-64 h-screen p-4 text-white shadow-md transition-all ${
          sidebarVisible ? "block" : "hidden"
        }`}
      >
        {/* Logo and Title */}
        <div className="text-3xl font-semibold mb-8 flex items-center">
          <span className="mr-2">🌊</span> Dashboard
        </div>

        {/* Navigation Links */}
        <nav>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Dashboard")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l9 9 9-9"
                  />
                </svg>
                <span>Dashboard</span>
              </div>
              <span className="bg-blue-600 text-white rounded-full px-2 text-xs">5</span>
            </li>

            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Product_Category")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 6l9 9 9-9"
                  />
                </svg>
                <span>Product Category</span>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Projects")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
                <span>Add Products</span>
              </div>
              <span className="bg-blue-600 text-white rounded-full px-2 text-xs">12</span>
            </li>

            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Calendar")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 9l6 6 6-6"
                  />
                </svg>
                <span>Calendar</span>
              </div>
              <span className="bg-blue-600 text-white rounded-full px-2 text-xs">20+</span>
            </li>

            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Documents")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 4h16M4 12h16M4 20h16"
                  />
                </svg>
                <span>Documents</span>
              </div>
            </li>

            <li className="flex justify-between items-center">
              <div
                className="flex items-center space-x-2 cursor-pointer hover:text-gray-200"
                onClick={() => handleMenuClick("Reports")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 6l3 3-3 3"
                  />
                </svg>
                <span>Reports</span>
              </div>
            </li>
          </ul>
        </nav>

        {/* User Profile Section */}
        <div className="mt-6 cursor-pointer" onClick={toggleUserDetails}>
          <div className="flex items-center space-x-2">
            <img
              src="/path/to/your/profile.jpg"
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
            <span>John Doe</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${userDetailsVisible ? "rotate-180" : ""}`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
          {userDetailsVisible && (
            <div className="mt-4 bg-gray-700 p-4 rounded-lg">
              <div className="text-sm text-gray-300">
                <p>Email: johndoe@example.com</p>
                <p>Role: Admin</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="p-4 text-white bg-purple-600 rounded-md absolute top-4 left-4 sm:hidden"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6h18M3 12h18M3 18h18"
          />
        </svg>
      </button>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 p-8">
        <div className="content">
          {/* Conditionally render the content based on the selected menu */}
          {selectedMenu === "Dashboard" && <div className="container bg-white"><Banner></Banner></div>}
          {selectedMenu === "Product_Category" && <div className="container"><ProductCategories></ProductCategories></div>}
          {selectedMenu === "Banner Updates" && <div className="container"><ProductCard></ProductCard></div>}

          {selectedMenu === "Calendar" && <div>Calendar Content</div>}
          {selectedMenu === "Documents" && <div>Documents Content</div>}
          {selectedMenu === "Reports" && <div>Reports Content</div>}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
