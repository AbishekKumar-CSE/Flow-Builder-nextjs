"use client";

import Data from "../../../data/data";
import { useState, useEffect } from "react";
import { X, ChevronLeft, Edit, List, ArrowLeft } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

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
  // const handleInputChange = (e) => {
  //   setInputValue(e.target.value);
  // };

  const handleInputChange = (event, field) => {
    const value = event.target.value;
    if (field === "name") setNodeName(value);
    if (field === "link") setNodeLink(value);
    if (field === "option") setNodeOption(value);
    setInputValue(event.target.value);

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

  const handleAddNewField = () => {
    const newField = sessionStorage.getItem("newFieldName"); // Get field name from session
    if (!newField) return;
  
    // Update all data objects with the new field
    Data.data.forEach((user) => {
      if (!(newField in user)) {
        user[newField] = "";
      }
    });
  
    updateUserName();
    alert("Field success")
  };

  const [newField, setNewField] = useState("")


  const handleNewField = (e) => {
    const value = e.target.value;
    setNewField(value); 
    sessionStorage.setItem("newFieldName", value); // Store in session storage
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

const modules = {
  toolbar: [
    ["bold", "italic"], // Bold & Italic
    [{ list: "ordered" }, { list: "bullet" }], // Ordered & Bullet List
  ],
};

  return (
    <>
      {selectedNode ? (
        <aside className={`border-r p-5 text-sm w-80 h-screen shadow-md transition-all duration-300 flex flex-col ${
          isDarkMode
            ? "bg-white border-gray-700 text-gray-900"
            : "bg-white border-gray-700 text-gray-900"
        }`}>
          <div className="relative flex items-center justify-between mb-4">
          <h3
            className={`text-xl font-bold flex items-center gap-2 pr-8 ${
              isDarkMode ? "text-black" : "text-blue-900"
            }`}
          >
            <Edit className="w-5 h-5" />
            Ask For Name
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
          {/* <div className="pt-1">
            <label className="block text-sm py-2 font-medium ">
              Select User ID:
            </label>
            <select
              className="p-2 flex w-full border text-black border-blue-300 rounded "
              onChange={handleIdChange}
            >
              <option value="">Select an ID</option>
              {dataUserId.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div> */}

          {/* Select Field To Update */}
          <label className="block text-sm font-medium py-2 mt-2">
            Question Text
          </label>
          <div className="pt-1">

            <textarea 
              type="text"
              placeholder="Enter Message to show ..."
              className="p-2 flex w-full border text-black border-blue-300 rounded mb-3"
              value={nodeName === "Start" || "questionnamenode" ? "Enter Your Name" : nodeName}
              onChange={(e) => handleInputChange(e, "name")}
            />
            <label className="block text-sm font-medium py-2">Select Field to Store</label>


            <select
              className="p-2 flex w-full border text-black border-blue-300 rounded"
              onChange={handleFieldSelect}
            >
              <option value="name">Select a field</option>
              {keys.map((item, index) => (
                <option key={index} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>  

          <div className="pt-3">
  <label className="block text-sm font-medium py-2">Add New Field:</label>
  <input
    type="text"
    placeholder="Create New field"
    className="p-2 w-full border text-black border-blue-300 rounded mb-2"
    onChange={handleNewField}
  />


  {newField ? 
  
  <button
    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
    onClick={handleAddNewField}
  >
    Add Field
  </button> :
  null
  }

</div>

        </aside>
      ) : null}
    </>
  );
}
