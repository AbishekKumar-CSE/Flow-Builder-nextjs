import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2, MessageCircle } from "lucide-react";
import Data from "@/app/data/data";
import Image from 'next/image';

function TextMediaNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  const dataList = Data.data;

  // const userDataId = dataList.userId
  const preUseID = sessionStorage.getItem("id") || 1;

  const userDataId = preUseID - 1;

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
        selected
          ? "border-2 border-indigo-500 scale-105"
          : "border border-gray-200"
      }`}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="px-3 py-2 text-left text-white text-xs font-semibold rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <MessageCircle size={14} className="opacity-90" /> Message Node
          </span>
          <button
            onClick={() => deleteElements({ nodes: [{ id }] || 1 })}
            className="text-white hover:text-red-500 transition-transform transform hover:scale-110"
          >
            <Trash2 size={16} />
          </button>
        </div>

        {/* Send Image */}
        {data.image && (
          <div className="py-2 relative">
            <p className="font-bold">Send Image</p>
            <Image
              src={data.image}
              alt="Node"
              width={500}
                height={300}
              className="w-full h-auto rounded-md mt-2"
            />

            <Handle
              id={`handle-image}`} // Unique ID for each handle
              type="source"
              position={Position.Right}
              className={`custom-handle ${
                data.isActive ? "active" : "inactive"
              }`}
              style={{
                right: -10, // Adjust this value as needed
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        )}

        {data.video && (
          <div className="mb-2 relative">
            <p className="font-bold">Send Video</p>
            <video
              controls
              className="w-full h-auto rounded border border-blue-300"
            >
              <source src={data.video} type="video/mp4" />\
            </video>

            <Handle
              id={`handle-video}`} // Unique ID for each handle
              type="source"
              position={Position.Right}
              className={`custom-handle ${
                data.isActive ? "active" : "inactive"
              }`}
              style={{
                right: -10, // Adjust this value as needed
                top: "50%",
                transform: "translateY(-50%)",
              }}
            />
          </div>
        )}

        {/* Content */}
        <div className="px-4 py-3 text-xs text-black">
          {data.label && userData ? (
            <div className="py-2">
              <p className="font-semibold text-sm text-gray-700 mb-1">
                Send Message
              </p>
              <p className="border border-gray-300 rounded-lg p-2 bg-gray-100">
                {formatLabel(
                  data.label === "textmedianode" ? "Hello { name }" : data.label
                )}
              </p>
            </div>
          ) : (
            <p className="text-gray-500 italic"></p>
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
              className="custom-handle p-2" 
            >
                      <span className="handle-icon">+</span>
      
            </Handle>
    </div>
  );
}

export default TextMediaNode;
