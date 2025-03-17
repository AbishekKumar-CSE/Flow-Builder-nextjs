"use client";

import { useState, useEffect } from "react";
import Data from "../../../data/data";
import { X, ChevronLeft, Edit, List, ArrowLeft } from "lucide-react";

export default function textMediaSidebar({
  dataUserId,
  nodeName,
  setNodeName,
  nodeImage,
  nodeVideo,
  setNodeImage,
  setNodeVideo,
  setNodeFile,
  setNodeAudio,
  setNodeLink,
  setNodeOption,
  selectedNode,
  setSelectedElements,
}) {

  const [selectedType, setSelectedType] = useState("");

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === "name") setNodeName(value);
    if (field === "link") setNodeLink(value);
    if (field === "option") setNodeOption(value);
  };

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      switch (type) {
        case "image":
          setNodeImage(url);
          break;
        case "video":
          setNodeVideo(url);
          break;
        case "audio":
          setNodeAudio(url);
          break;
        case "file":
          setNodeFile(url);
          break;
        default:
          break;
      }
    }
  };

  const handleSelectChange = (e) => {
    const value = e.target.value;
    if (value) {
      // Append the selected item in curly brackets
      const updatedText = `${nodeName} { ${value} }`;
      handleInputChange({ target: { value: updatedText } }, "name");
      sessionStorage.setItem("textNodeField", value);
    }
  };

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
            Text Node Update
          </h3>

          {/* Close Button (X) - Top Right */}
          <button
            className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
            onClick={() => setSelectedElements([])}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

      {/* ID Select for Testing */}
      <label className="block text-sm font-medium mb-1">Select ID:</label>
      <div className="pt-1">
        <select
          className="p-2 w-full border rounded transition-all duration-200 focus:outline-none text-black"
          onChange={(e) => sessionStorage.setItem("id", e.target.value)}
        >
          <option value="">Select an ID</option>
          {dataUserId.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

          {/* Dropdown for selecting file type */}
          <label className="block text-sm font-medium mb-1 py-2">
            Select File Type:
          </label>
          <select
            className="w-full p-2 mb-4 border text-black rounded"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>

          {/* Conditional Rendering Based on Selection */}
          {selectedType === "image" && (
            <div>
              <label className="block text-sm font-medium">
                Upload Image:
              </label>
              <input
                type="file"
                accept="image/*"
                className="w-full p-2 mb-2 border border-blue-300 rounded"
                onChange={(e) => handleFileChange(e, "image")}
              />
              {nodeImage && (
                <img
                  src={nodeImage}
                  alt="Uploaded"
                  className="w-full h-24 object-cover mt-2"
                />
              )}
            </div>
          )}

          {selectedType === "video" && (
            <div>
              <label className="block text-sm font-medium">
                Upload Video:
              </label>
              <input
                type="file"
                accept="video/*"
                className="w-full p-2 mb-2 border border-blue-300 rounded"
                onChange={(e) => handleFileChange(e, "video")}
              />
              {nodeVideo && (
                <video controls className="w-full h-24 mt-2">
                  <source src={nodeVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              )}
            </div>
          )}

          {/* Node Name Input */}
          <label className="block text-sm font-medium">
            Text Message (Optional):
          </label>
          <input
            type="text"
            className="w-full p-2 mb-2 border text-black border-blue-300 rounded my-2"
            value={nodeName}
            onChange={(e) => handleInputChange(e, "name")}
          />

          {/* Select Field */}
          <label className="block text-sm font-medium">
            Select Items:
          </label>
          <div className="pt-1">
            <select
              className="p-2 flex w-full border text-black border-blue-300 rounded"
              onChange={handleSelectChange}
            >
              <option value="">Select an item</option>
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
