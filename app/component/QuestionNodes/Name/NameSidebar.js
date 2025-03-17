"use client";

import Data from "../../../data/data";
import { useState, useEffect } from "react";
import { X, ChevronLeft, Edit, List, ArrowLeft } from "lucide-react";

export default function NameSidebar({
  dataUserId,
  nodeName,
  setNodeName,
  setNodeLink,
  selectedNode,
  setNodeOption,
  setSelectedElements,
  updateUserName, // Function to update data globally
}) {
  const [selectedField, setSelectedField] = useState(""); // Store selected field
  const [inputValue, setInputValue] = useState(""); // Store input value

  // Handle user selection of ID
  const handleIdChange = (e) => {
    const selectedId = e.target.value;
    sessionStorage.setItem("selectedUserId", selectedId);
  };

  // Handle dropdown field selection (name, description, etc.)
  const handleFieldSelect = (e) => {
    const value = e.target.value;
    setSelectedField(value);
    sessionStorage.setItem("selectedField", value);
  };
  

  // Handle input changes dynamically based on selected field
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  // Function to update data dynamically
  const handleUpdate = () => {
    const selectedId = parseInt(sessionStorage.getItem("selectedUserId"), 10);
    if (!selectedId || !selectedField) return;

    const index = Data.data.findIndex((user) => user.id === selectedId);
    if (index !== -1) {
      Data.data[index][selectedField] = inputValue; // Update field
      updateUserName(); // Trigger re-render
      setInputValue(""); // Clear input
    }
  };

  // Get all keys dynamically
  const keys = Object.keys(Data.data[0]);

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <>
      {selectedNode ? (
        <aside className={`border-r p-5 text-sm w-80 h-screen shadow-md transition-all duration-300 flex flex-col ${
          isDarkMode
            ? "bg-gray-900 border-gray-700 text-white"
            : "bg-gray-900 border-gray-700 text-white"
        }`}>
          <div className="relative flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold flex items-center gap-2 pr-8 ${
              isDarkMode ? "text-white" : "text-blue-900"
            }`}
          >
            <Edit className="w-5 h-5" />
            Ask For Question
          </h3>

          {/* Close Button (X) - Top Right */}
          <button
            className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
            onClick={() => setSelectedElements([])}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

          {/* ID Selection */}
          <div className="pt-1">
            <label className="block text-sm py-2 font-medium ">
              Select User ID:
            </label>
            <select
              className="p-2 flex w-full border text-black border-blue-300 rounded"
              onChange={handleIdChange}
            >
              <option value="">Select an ID</option>
              {dataUserId.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* Select Field To Update */}
          <label className="block text-sm font-medium py-2 mt-2">
            Select Field:
          </label>
          <div className="pt-1">
            <select
              className="p-2 flex w-full border text-black border-blue-300 rounded"
              onChange={handleFieldSelect}
            >
              <option value="">Select a field</option>
              {keys.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          
        </aside>
      ) : null}
    </>
  );
}
