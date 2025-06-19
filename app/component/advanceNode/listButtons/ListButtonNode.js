import React, { useState } from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import { Trash2, PanelBottom } from "lucide-react";
import Data from "@/app/data/data";

function ListButtonNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();
  const dataList = Data.data;

  // const userDataId = dataList.userId
  const preUseID = sessionStorage.getItem("id") || 1;

  const userDataId = preUseID - 1;

  // Find specific user by ID (if data.userId is provided)
  const userData = dataList.userId
    ? dataList.find((user) => user.id === userDataId.id)
    : dataList[userDataId || 0]; // Default to the first user if no ID is given

  // Function to replace placeholders with actual values
  const formatLabel = (label) => {
    return label.replace(/\{(\s*\w+\s*)\}/g, (match, key) => {
      const trimmedKey = key.trim(); // Remove extra spaces
      return userData?.[trimmedKey] || match; // Replace if key exists, else keep placeholder
    });
  };

  //console.log(data);
  const [selected1, setSelected1] = useState(null);

  return (
    <div
      className={`w-80 shadow-lg rounded-lg bg-white transition-all duration-200 ${
        selected
          ? "border-2 border-indigo-500 scale-105"
          : "border border-gray-200"
      }`}
    >
      <div className="flex flex-col">
        {/* Header */}
        <div className="px-3 py-2 text-left text-white text-xs font-semibold rounded-t-lg bg-gradient-to-r from-blue-500 to-indigo-500 flex justify-between items-center">
          <span className="flex items-center gap-1">
            <PanelBottom size={14} className="opacity-90" />
            List Button Node
          </span>
          <button
            onClick={() => deleteElements({ nodes: [{ id }] || 1 })}
            className="text-white hover:text-red-500 transition-transform transform hover:scale-110"
          >
            <Trash2 size={16} />
          </button>
        </div>

        <div className="px-3 py-2 text-xs text-black">
          {data.label && userData && (
            <div className="">
              <p className="font-bold my-1">Send Message</p>
              <p className="border rounded p-2">
                {formatLabel(
                  data.label === "listbuttonnodde"
                    ? "Welcome to { company }"
                    : data.label
                )}
              </p>
            </div>
          )}
        </div>

        {/* Render buttons dynamically */}
        <div className="relative flex gap-2 p-2 flex-wrap">
          {data.buttons?.map((button, index) => (
            <div key={index} className="relative flex w-full items-center">
              <button
                className="p-1 text-white flex align-middle justify-center w-full bg-gradient-to-r from-blue-500 to-indigo-500 shadow-md 
                   hover:from-blue-600 hover:to-indigo-600 active:scale-95 transition-all duration-200 ease-in-out"
              >
                {button.label}
              </button>

              {/* Individual Handle for Each Button */}
              <Handle
                id={`handle-${index}`} // Unique ID for each handle
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
          ))}

          {/* List items display */}
          {data.list?.length ? (
            data.list.map((item, index) => (
              <div
                key={index}
                className="w-full mt-2 p-2 bg-gray-100 rounded-lg"
              >
                <div className="relative flex justify-between items-center p-2 border-b last:border-b-0">
                  <label className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="listItem"
                      className="cursor-pointer"
                      onChange={() => setSelected1(index)}
                      checked={selected1 === index}
                    />
                    <span className="font-semibold text-gray-700">
                      {item.title || "Untitled"}
                    </span>
                  </label>

                  {/* Handle for flow connection */}
                  <Handle
                    id={`handle-list-${index}`}
                    type="source"
                    position={Position.Right}
                    className={`custom-handle ${
                      data.isActive ? "active" : "inactive"
                    }`}
                    style={{
                      right: -10,
                      top: "50%",
                      transform: "translateY(-50%)",
                    }}
                  />
                </div>

                {/* Show description when the radio button is selected */}
                {selected1 === index && (
                  <p className="mt-2 text-sm text-gray-600">
                    {item.description || "No description"}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="hidden"></p>
          )}
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-slate-500"
      />
      {/* <Handle
        id="b"
        type="source"
        position={Position.Right}
        className="w-1 rounded-full bg-gray-500"
      /> */}
    </div>
  );
}

export default ListButtonNode;
