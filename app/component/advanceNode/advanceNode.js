"use client";

import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import Link from "next/link";
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
    : dataList[userDataId || 2]; // Default to the first user if no ID is given

  // Function to replace placeholders with actual values
  const formatLabel = (label) => {
    return label.replace(/\{(\s*\w+\s*)\}/g, (match, key) => {
      const trimmedKey = key.trim(); // Remove extra spaces
      return userData?.[trimmedKey] || match; // Replace if key exists, else keep placeholder
    });
  };

  console.log(data)

  return (
    <div
      className={`relative w-48 shadow-md rounded-md bg-white ${
        selected ? "border-2 border-indigo-500" : ""
      }`}
    >
      <div className="flex flex-col">
        <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-t-md bg-slate-500 flex justify-between items-center">
          <span>✉️ Advaance Node</span>
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
          {data.image && (
            <div className="py-2">
              <p className="font-bold">Send Image</p>
              <img
                src={data.image}
                alt="Node"
                className="w-full h-auto rounded-md mt-2"
              />
            </div>
          )}
          {data.video && (
            <div className="mb-2">
              <p className="font-bold">Send Video</p>
              <video controls className="w-full h-auto rounded border border-blue-300">
                <source src={data.video} type="video/mp4" />
              </video>
            </div>
          )}
          {data.audio && (
            <div className="mb-2">
              <p className="font-bold">Send Audio</p>
              <audio controls className="w-40">
                <source src={data.audio} type="audio/mpeg" />
              </audio>
            </div>
          )}
          {data.file && (
            <div className="mb-2">
              <p className="font-bold">Send File</p>
              <a
                href={data.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Open File
              </a>
            </div>
          )}

          {data.button1 && (
            <div className="py-2">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 items-center justify-center p-1 flex bg-blue-500 text-white font-bold duration-5000"
              >
                {data.button1}
              </Link>
            </div>
          )}

          {data.button2 && (
            <div className="py-2">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 items-center justify-center p-1 flex bg-blue-500 text-white font-bold duration-5000"
              >
                {data.button2}
              </Link>
            </div>
          )}

          {data.button3 && (
            <div className="py-2">
              <Link
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 items-center justify-center p-1 flex bg-blue-500 text-white font-bold duration-5000"
              >
                {data.button3}
              </Link>
            </div>
          )}

          {data.cta && (
            <div className="py-2">
              <Link
                href={data.cta}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 w-full items-center justify-center p-1 flex bg-green-500 text-white font-bold duration-5000"
              >
                  {data.ctabutton || "Click Me"}
              </Link>
            </div>
          )}

          {data.link && (
            <div className="py-2">
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 w-full items-center justify-center p-1 flex bg-green-500 text-white font-bold duration-5000"
              >
                Click Me
              </Link>
            </div>
          )}

        {data.footer1 && (
          <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-b-md bg-slate-500 flex justify-between items-center">
          
            <span>{data.footer1}</span>
          
           </div>
        )}

          {data.footer2 && (
          <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-b-md bg-slate-500 flex justify-between items-center">
          
            <span>{data.footer2}</span>
          
           </div>
        )}

          {data.footer3 && (
          <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-b-md bg-slate-500 flex justify-between items-center">
          
            <span>{data.footer3}</span>
          
           </div>
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

export default TextNode;
