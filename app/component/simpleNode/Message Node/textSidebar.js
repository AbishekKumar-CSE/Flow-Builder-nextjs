"use client";

import { useState, useEffect } from "react";
import Data from "../../../data/data";
import { X, ChevronLeft, Edit, List, ArrowLeft } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function textSidebar({
  dataUserId,
  nodeName,
  setNodeName,
  nodeImage,
  nodeVideo,
  setNodeImage,
  setNodeVideo,
  nodeLink,
  setNodeLink,
  selectedNode,
  setNodeOption,
  setSelectedElements,
}) {
  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === "name") setNodeName(value);
    if (field === "link") setNodeLink(value);
    if (field === "option") setNodeOption(value);
  };

  const handleFileChange = (event, field) => {
    const file = event.target.files[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      if (field === "image") setNodeImage(fileUrl);
      if (field === "video") setNodeVideo(fileUrl);
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

  const handleChange = (content) => {
    handleInputChange({ target: { value: content } }, "name");
  };

  const modules = {
    toolbar: [
      ["bold", "italic"], // Bold & Italic
      [{ list: "ordered" }, { list: "bullet" }], // Ordered & Bullet List
    ],
  };

  const [lent, setLent] = useState(1);

  return (
    <>
      {selectedNode ? (
    <aside
      className={`border-r p-5 text-sm w-80 h-screen shadow-md transition-all duration-300 flex flex-col ${
        isDarkMode
          ? "bg-white border-gray-700 text-gray-900"
          : "bg-white border-gray-700 text-gray-900"
      }`}
    >
      <div className="relative flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold flex items-center gap-2 pr-8 ${
              isDarkMode ? "text-black" : "text-blue-900"
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
      <label className="block text-sm font-medium mb-1">Create a Message:</label>
      {/* <div className="pt-1">
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
      </div> */}

      {/* Node Name Input */}
      {/* <label className="block text-sm font-medium mt-4">Node Name:</label>
      <input
        type="text"
        className="w-full p-2 border rounded transition-all duration-200 focus:outline-none text-black"
        value={nodeName}
        onChange={(e) => handleInputChange(e, "name")}
      /> */}

      {/* Node Name Input */}
      {Array.from({ length: lent }).map((_, index) => (
      <div key={index} className="w-full  mt-4 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 py-2">
        Enter Message
      </label>

      {/* React Quill Editor */}
      <div className="border border-gray-300 rounded-md shadow-sm">
        <ReactQuill
          theme="snow"
          value={nodeName === "questionnode" ? "" : nodeName}
          onChange={handleChange}
          className="mb-2"
          placeholder="Enter Your message"
          modules={modules}
        />
      </div>

      {/* Select Field */}
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700">
          Fields
        </label>
        <div className="relative mt-1">
          <select
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
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
      </div>
    </div>
    ))}

{/* <button onClick={() => setLent(prev => prev + 1)}>Add</button> */}
    
    </aside>
      ) : null}
    </>
  );
}
