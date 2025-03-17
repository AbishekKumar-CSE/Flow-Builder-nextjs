"use client";

import { useState, useEffect } from "react";
import Data from "../../data/data";
import { X, ChevronLeft, Edit, List, ArrowLeft } from "lucide-react";

export default function Sidebar({
  dataUserId,
  nodeName,
  setNodeName,
  nodeImage,
  nodeVideo,
  nodeAudio,
  nodeFile,
  setNodeImage,
  setNodeVideo,
  setNodeFile,
  setNodeAudio,
  nodeLink,
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
            <Edit className="w-5 h-5" /> Media Node
          </h3>

          {/* Close Button (X) - Top Right */}
          <button
            className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600 transition-all duration-200"
            onClick={() => setSelectedElements([])}
          >
            <X className="w-3 h-3" />
          </button>
        </div>

          {/* Id select for testing */}

          <div className="pt-1">
            <select
              className="p-2 flex w-full border border-blue-300 text-black my-2 rounded"
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


          {/* Node Name Input */}
          <label className="block text-sm font-medium">
            Node Name:
          </label>
          <input
            type="text"
            className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
            value={nodeName}
            onChange={(e) => handleInputChange(e, "name")}
          />

          {/* Select Field */}
          <label className="block text-sm font-medium">
            Select Items:
          </label>
          <div className="pt-1">
            <select
              className="p-2 flex w-full border border-blue-300 text-black my-2 rounded"
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

          {/* Dropdown for selecting file type */}
          <label className="py-1 block text-sm font-medium">
            Select File Type:
          </label>
          <select
            className="w-full p-2 mb-4 border border-blue-300 text-black my-2 rounded"
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">-- Select Type --</option>
            <option value="image">Image</option>
            <option value="video">Video</option>
            <option value="audio">Audio</option>
            <option value="file">File</option>
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
                className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
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
                className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
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

          {selectedType === "audio" && (
            <div>
              <label className="block text-sm font-medium">
                Upload Audio:
              </label>
              <input
                type="file"
                accept="audio/*"
                className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
                onChange={(e) => handleFileChange(e, "audio")}
              />
              {nodeAudio && (
                <div className="mt-2">
                  <audio controls className="w-full">
                    <source src={nodeAudio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                  <p className="text-blue-600 mt-2">
                    <a
                      href={nodeAudio}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline"
                    >
                      Open Audio in New Tab
                    </a>
                  </p>
                </div>
              )}
            </div>
          )}

          {selectedType === "file" && (
            <div>
              <label className="block text-sm font-medium">
                Upload File:
              </label>
              <input
                type="file"
                accept=".pdf,.docx,.txt,.xlsx,.csv"
                className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
                onChange={(e) => handleFileChange(e, "file")}
              />
              {nodeFile && (
                <p className="text-sm text-blue-700 mt-2">
                  Uploaded File:{" "}
                  <a
                    href={nodeFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 underline"
                  >
                    Download
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Link */}
          <label className="block text-sm font-medium">
            Link:
          </label>
          <input
            type="text"
            className="w-full p-2 mb-2 border border-blue-300 text-black my-2 rounded"
            value={nodeLink}
            onChange={(e) => handleInputChange(e, "link")}
          />
          
        </aside>
      ) : null}
    </>
  );
}
