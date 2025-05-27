import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2, Clock3, ChevronDown } from "lucide-react";

function TimeNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  console.log("TimeNode data:", data);

  return (
    <div
      className={`group w-40 h-48 rounded-xl shadow-md text-center relative flex flex-col justify-between items-center p-3
    ${selected ? "ring-2 ring-blue-400 scale-105" : ""}
    bg-blue-500 text-white transition-all duration-300`}
    >
      <button
        onClick={() => deleteElements({ nodes: [{ id }] })}
        className="absolute top-2 right-2 text-red-600 hover:text-red-300 transition opacity-0 group-hover:opacity-100"
      >
        <Trash2 size={16} />
      </button>
      {/* Icon */}
      <Clock3 size={32} className="mx-auto mt-3" />

      {/* Label */}
      <div>
        <p className="text-sm font-semibold mt-2">Wait</p>
        <p className="text-xs opacity-90">{data?.waitTime || "2 "} Hrs</p>
      </div>

      {/* 3 Dots */}
      <div className="flex justify-center gap-1 mb-6">
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70" />
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70" />
        <div className="w-1.5 h-1.5 rounded-full bg-white opacity-70" />
      </div>

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

export default TimeNode;
