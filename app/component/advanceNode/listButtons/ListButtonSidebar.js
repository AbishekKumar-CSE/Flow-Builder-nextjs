"use client";

import { useState, useEffect } from "react";
import Data from "../../../data/data";
import { X, Edit, XCircle } from "lucide-react";

export default function ListButtonSidebar({
  dataUserId,
  nodeName,
  setNodeName,
  nodeImage,
  nodeVideo,
  nodeAudio,
  nodeFile,
  nodeCta,
  setNodeButtons,
  nodeButtons,
  nodeButton1,
  nodeButton2,
  nodeButton3,
  nodeFooter1,
  nodeFooter2,
  nodeFooter3,
  nodeCtaButton,
  setNodeImage,
  setNodeVideo,
  setNodeFile,
  setNodeAudio,
  nodeLink,
  setNodeLink,
  setNodeCta,
  setNodeCtaButton,
  setNodeButton1,
  setNodeButton2,
  setNodeButton3,
  setNodeFooter1,
  setNodeFooter2,
  setNodeFooter3,
  setNodeOption,
  selectedNode,
  setSelectedElements,
}) {
  const [selectedType, setSelectedType] = useState("");
  const [selectedMessageType, setSelectedMessageType] = useState("");

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === "name") setNodeName(value);
    if (field === "link") setNodeLink(value);
    if (field === "option") setNodeOption(value);
    if (field === "cta") setNodeCta(value);
    if (field === "ctabutton") setNodeCtaButton(value);
    if (field === "button1") setNodeButton1(value);
    if (field === "button2") setNodeButton2(value);
    if (field === "button3") setNodeButton3(value);
    if (field === "footer1") setNodeFooter1(value);
    if (field === "footer2") setNodeFooter2(value);
    if (field === "footer3") setNodeFooter3(value);
    if (field === "buttons" && index !== null) {
        setNodeButtons((prevButtons) => {
            const updatedButtons = [...prevButtons];
            updatedButtons[index] = { ...updatedButtons[index], label: value };
            return updatedButtons;
        });
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

  const keys = Object.keys(Data.data[0]);

  const addButton = () => {
    setNodeButtons((prevButtons) => {
      const newButtons = [...prevButtons, { label: "Button" } ];
      console.log("Updated Buttons:", newButtons);
      return newButtons;
    });
  };

  const removeButton = (index) => {
    setNodeButtons(nodeButtons.filter((_, i) => i !== index));
  };

  const handleButtonChange = (index, value) => {
    setNodeButtons((prevButtons) => {
      const updatedButtons = [...prevButtons];
      updatedButtons[index] = { ...updatedButtons[index], label: value };
      return updatedButtons;
    });
  };

  console.log(nodeButtons);

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
              isDarkMode ? "text-white" : ""
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
          <label className="block text-sm font-medium py-2">
            Node Name:
          </label>
          <input
            type="text"
            className="w-full p-2 mb-2 border text-black border-blue-300 rounded"
            value={nodeName}
            onChange={(e) => handleInputChange(e, "name")}
          />

          {/* Dropdown for Message Type */}
          <label className="block text-sm font-medium py-2">
            Select Message Type:
          </label>
          <select
            className="w-full p-2 mb-4 border text-black border-blue-300 rounded"
            onChange={(e) => setSelectedMessageType(e.target.value)}
          >
            <option value="">-- Select Message Type --</option>
            {/* <option value="reply">Reply Button</option>
            <option value="cta">CTA URL Button</option> */}
            <option value="list">List Message</option>
          </select>

          {/* liat of Buttons */}

          {selectedMessageType === "list" && (
            <div>
              <label className="block text-sm font-medium py-2">
                Buttons:
              </label>

              {/* Dynamic Button List */}
              {nodeButtons &&
                nodeButtons.length > 0 &&
                nodeButtons.map((button, index) => (
                  <div key={index} className="relative w-full flex items-center text-black gap-2 mb-2">
                    <input
                    type="text"
                    className="w-full p-2 pr-10 border border-blue-300 rounded"
                    value={button.label}
                    onChange={(e) => handleButtonChange(index, e.target.value)}
                    placeholder={`Button ${index + 1}`}
                  />
                  <button
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                    onClick={() => removeButton(index)}
                  >
                    <XCircle  size={18} />
                  </button>
                 </div>
                ))}

              <button
                type="button"
                className="w-full p-2 mt-2 text-white bg-blue-600 rounded"
                onClick={addButton}
              >
                + Add Button
              </button>

            </div>
          )}

        </aside>
      ) : null}
    </>
  );
}
