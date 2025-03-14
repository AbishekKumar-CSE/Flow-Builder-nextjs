import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2 } from "lucide-react";
import Data from "@/app/data/data";

function TextNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  const dataList = Data.data;

  // const userDataId = dataList.userId
  const preUseID = sessionStorage.getItem("id")

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
      className={`w-48 shadow-md rounded-md bg-white ${
        selected ? "border-2 border-indigo-500" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-t-md bg-blue-500 flex justify-between items-center">
          ✉️ Simple Node
          <button
            onClick={() => deleteElements({ nodes: [{ id }] })}
            className="text-white hover:text-red-500 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="px-3 py-2 text-xs text-black">
          {data.label && userData && (
            <div className="py-2">
              <p className="font-bold my-1">Send Message</p>
              <p className="border rounded p-2">{formatLabel(data.label)}</p>
            </div>
          )}
          {!userData && <p className="text-black">Loading ...</p>}
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

export default TextNode;
