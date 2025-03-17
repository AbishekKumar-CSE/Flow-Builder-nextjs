"use client";

import { useState } from "react";
import Data from "../../../data/data";

export default function NameSidebar({
  nodeName,
  setNodeName,
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

  return (
    <>
      {selectedNode ? (
        <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-80 h-screen text-black">
          <h3 className="text-xl mb-2 text-blue-900">Ask for Name:</h3>

          {/* Node Name Input */}
          <label className="block text-sm font-medium text-blue-900">
            Ask For Name:
          </label>
          <input
            type="text"
            className="w-full p-2 mb-2 border border-blue-300 rounded"
            value={nodeName}
            onChange={(e) => handleInputChange(e, "name")}
          />

          {/* Select Field To Save*/}
          <label className="block text-sm font-medium text-blue-900">
            Select Items:
          </label>
          <div className="pt-1">
            <select
              className="p-2 flex w-full border border-blue-300 rounded"
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

          {/* Go Back Button */}
          <button
            className="mt-4 bg-blue-500 text-white rounded p-2 hover:bg-blue-600"
            onClick={() => setSelectedElements([])}
          >
            Go Back
          </button>
        </aside>
      ) : null}
    </>
  );
}
