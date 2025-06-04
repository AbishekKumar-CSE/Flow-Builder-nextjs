import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2, Zap } from "lucide-react";
// import { FaWpforms } from "react-icons/fa"; // form icon similar to the image

function TriggerNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  console.log("TriggerNode data:", data);

  return (
    <div
      className={`group relative w-40 h-40 rounded-full flex flex-col justify-center items-center text-white bg-blue-400 shadow-lg
        ${selected ? "ring-4 ring-blue-300 scale-105" : ""}
        transition-all duration-300`}
    >
      {/* Delete button */}
      {/* <button
        onClick={() => deleteElements({ nodes: [{ id }] })}
        className="absolute top-2 right-2 text-red-600 hover:text-red-300 opacity-0 group-hover:opacity-100 transition"
      >
        <Trash2 size={16} />
      </button> */}

      {/* Form Icon */}
      {/* <FaWpforms size={28} className="mb-2" /> */}

      {/* Title */}
        <Zap size={26} className="text-white mb-2" />
      <div className="text-center text-xs font-semibold leading-tight">
        <p>{data?.title == 'Start' ? "Trigger Node" : data?.title}</p>
      </div>

      {/* Select Form button */}
      {/* <button className="mt-2 px-3 py-1 bg-white text-blue-500 text-xs rounded-full font-medium shadow hover:bg-gray-100">
        Select Form
      </button> */}

      {/* Handles */}
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

export default TriggerNode;
