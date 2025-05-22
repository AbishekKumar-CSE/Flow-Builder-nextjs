import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2, Handshake } from "lucide-react";
import Data from "@/app/data/data";

function TextNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  const dataList = Data.data;

  const preUseID = sessionStorage.getItem("id") || 1;
  const userDataId = preUseID - 1;
  const userData = dataList.userId
    ? dataList.find((user) => user.id === userDataId)
    : dataList[userDataId];

  const formatLabel = (label) => {
    return label.replace(/\{(\s*\w+\s*)\}/g, (match, key) => {
      const trimmedKey = key.trim();
      return userData?.[trimmedKey] || match;
    });
  };

  return (
    <div
      className={`w-40 h-48 text-center shadow-md rounded-xl bg-[#EC9072] relative transition-all duration-200 flex flex-col justify-center items-center ${
        selected ? "scale-105 ring-2 ring-white" : ""
      }`}
    >
      <button
        onClick={() => deleteElements({ nodes: [{ id }] })}
        className="absolute top-2 right-2 text-white hover:text-red-500 transition-transform transform hover:scale-110 z-10"
      >
        <Trash2 size={16} />
      </button>

      <div className="flex flex-col justify-center items-center space-y-2">
        <Handshake size={26} className="text-white" />
        <p className="text-white text-sm font-semibold">Select Template</p>

        <button
          className="text-[#EC9072] bg-white px-4 py-1 rounded-full text-xs font-medium hover:scale-105 transition"
          onClick={() => alert("Configure clicked")}
        >
          Configure
        </button>
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

export default TextNode;
