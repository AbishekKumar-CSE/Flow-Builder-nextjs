import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import Data from "@/app/data/data";

function NameQuestionNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  const dataList = Data.data;

  // const userDataId = dataList.userId
  const preUseID = sessionStorage.getItem("id") || 1

  const userDataId = preUseID - 1

  // Find specific user by ID (if data.userId is provided)
  const userData = dataList.userId
    ? dataList.find((user) => user.id === userDataId)
    : dataList[userDataId]; // Default to the first user if no ID is given

  // Function to replace placeholders with actual values
  const formatLabel = (label) => {
    return label.replace(/\{(\s*\w+\s*)\}/g, (match, key) => {
      const trimmedKey = key.trim(); // Remove extra spaces
      return userData?.[trimmedKey] || match; // Replace if key exists, else keep placeholder
    });
  };

  return (
    <div
    className={`w-64 shadow-lg rounded-lg bg-white transition-all duration-200 ${
      selected ? "border-2 border-indigo-500 scale-105" : "border border-gray-200"
    }`}
  >
    <div className="flex flex-col">
      {/* Header */}
      <div className="px-3 py-2 text-left text-white text-xs font-semibold rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-between items-center">
        <span className="flex items-center gap-1">✉️ Question Node</span>
        <button
          onClick={() => deleteElements({ nodes: [{ id }] || 1 })}
          className="text-white hover:text-red-500 transition-transform transform hover:scale-110"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="px-4 py-3 text-xs text-black">
        {data.label && userData ? (
          <div className="py-2">
            <p className="font-semibold text-sm text-gray-700 mb-1">Send Message</p>
            <p className="border border-gray-300 rounded-lg p-2 bg-gray-100">
              {formatLabel(data.label)}
            </p>
          </div>
        ) : (
          <p className="text-gray-500 italic">Ask For Name?</p>
        )}
      </div>
    </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      />
    </div>
  );
}

export default NameQuestionNode;
