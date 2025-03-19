"use client";

import { useState, useEffect } from "react";
import { X, Edit, XCircle } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Data from "@/app/data/data";

export default function ListButtonSidebar({
  dataUserId,
  nodeName,
  setNodeName,
  setNodeButtons,
  nodeButtons,
  setNodeList,
  nodeList,
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

  if (field === "list" && index !== null) {
    setNodeList((prevList) => {
      const updatedList = [...prevList];
      updatedList[index] = { ...updatedList[index], [field]: value };
      return updatedList;
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

    const handleChange = (content) => {
      handleInputChange({ target: { value: content } }, "name");
    };

  const addButton = () => {
    setNodeButtons((prevButtons) => {
      const newButtons = [...prevButtons, { label: "Button" }];
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

  // **LIST MESSAGE FUNCTIONS**
  const addListMessage = () => {
    setNodeList((prev) => [
      ...prev,
      {id: "", title: "", description: "" },
    ]);
  };

  const removeListMessage = (index) => {
    setNodeList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleListChange = (index, field, value) => {
    setNodeList((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const keys = Object.keys(Data.data[0]);

const modules = {
  toolbar: [
    ["bold", "italic"], // Bold & Italic
    [{ list: "ordered" }, { list: "bullet" }], // Ordered & Bullet List
  ],
};

  return (
    <>
      {selectedNode ? (
        <aside
          className={`border-r max-h-screen overflow-y-auto p-5 text-sm w-80 h-auto shadow-md transition-all duration-300 flex flex-col ${
            isDarkMode
              ? "bg-white border-gray-700 text-gray-900"
              : "bg-white border-gray-700 text-gray-900"
          }`}
        >
          <div className="relative flex items-center justify-between mb-4">
            <h3
              className={`text-xl font-bold flex items-center gap-2 pr-8 ${
                isDarkMode ? "" : ""
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

          {/* <div className="pt-1">
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
          </div> */}

<label className="block text-sm font-medium py-2">
        Create a Message:
      </label>

          {/* Node Name Input */}
          <div className="w-full  mt-4 p-4 bg-white border border-gray-300 rounded-md shadow-sm">
      {/* Label */}
      <label className="block text-sm font-medium text-gray-700 py-2">
        Question text
      </label>

      {/* React Quill Editor */}
      <div className="border border-gray-300 rounded-md shadow-sm">
        <ReactQuill
          theme="snow"
          value={nodeName === "listbuttonnodde" ? "" : nodeName}
          onChange={handleChange}
          className="mb-2"
          placeholder="Enter Your Message"
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

          {/* Dropdown for Message Type */}
          <label className="block text-sm font-medium py-2">
            Select Message Type:
          </label>
          <select
            className="w-full p-2 mb-4 border text-black border-blue-300 rounded"
            onChange={(e) => setSelectedMessageType(e.target.value)}
          >
            <option value="">Select Message Type</option>
            <option value="listFields">List Messages</option>
            <option value="list">List Buttons</option>
          </select>

          {/* liat of Buttons */}

          {selectedMessageType === "list" && (
            <div>
              <label className="block text-sm font-medium py-2">Buttons:</label>

              {/* Dynamic Button List */}
              {nodeButtons &&
                nodeButtons.length > 0 &&
                nodeButtons.map((button, index) => (
                  <div
                    key={index}
                    className="relative w-full flex items-center text-black gap-2 mb-2"
                  >
                    <input
                      type="text"
                      className="w-full p-2 pr-10 border border-blue-300 rounded"
                      value={button.label}
                      onChange={(e) =>
                        handleButtonChange(index, e.target.value)
                      }
                      placeholder={`Button ${index + 1}`}
                    />
                    <button
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 hover:text-red-700"
                      onClick={() => removeButton(index)}
                    >
                      <XCircle size={18} />
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

          {/* LIST MESSAGES */}
          {selectedMessageType === "listFields" && (
            <div>
              <label className="block text-sm font-medium py-2">
                List Messages:
              </label>
              {nodeList.map((item, index) => (
                <div key={index} className="text-black mb-2">
                  <div className="flex content-between">
                  <h2 className="text-bold text-white py-2">List Item {index + 1}</h2>
                  
                  <button
                    className="text-red-500 hover:text-red-700 ms-auto p-2"
                    onClick={() => removeListMessage(index)}
                  >
                    <XCircle size={18} />
                  </button>
                  </div>
                  <input
                    type="text"
                    className="w-full p-2 border border-blue-300 rounded mb-1"
                    value={item.id}
                    onChange={(e) =>
                      handleListChange(index, "id", e.target.value)
                    }
                    placeholder="Id"
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-blue-300 rounded mb-1"
                    value={item.title}
                    onChange={(e) =>
                      handleListChange(index, "title", e.target.value)
                    }
                    placeholder="Title"
                  />
                  <input
                    type="text"
                    className="w-full p-2 border border-blue-300 rounded mb-1"
                    value={item.description}
                    onChange={(e) =>
                      handleListChange(index, "description", e.target.value)
                    }
                    placeholder="Description"
                  />
                </div>
              ))}
              <button
                className="w-full p-2 mt-2 text-white bg-blue-600 rounded"
                onClick={addListMessage}
              >
                + Add List Item
              </button>
            </div>
          )}
        </aside>
      ) : null}
    </>
  );
}
