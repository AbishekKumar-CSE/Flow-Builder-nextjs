// "use client";

import React from "react";
import { Handle, Position, useReactFlow } from "reactflow";
import Link from "next/link";
import { Trash2, Camera } from "lucide-react";
import Data from "@/app/data/data";
import Image from 'next/image';

function TextNode({ data, selected, id }) {
  const { deleteElements } = useReactFlow();

  const dataList = Data.data;

  // const userDataId = dataList.userId
  const preUseID = sessionStorage.getItem("id") || 1;

  const userDataId = preUseID - 1;

  // Find specific user by ID (if data.userId is provided)
  const userData = dataList.userId
    ? dataList.find((user) => user.id === userDataId)
    : dataList[userDataId || 0]; // Default to the first user if no ID is given

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
            <Camera size={14} className="opacity-90" /> Media Node
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
            <div className="py-2 relative">
              <p className="font-bold my-1">Send Message</p>
              <p className="border rounded p-2">{formatLabel(data.label === "textnode" ? "{ company }" : data.label)}</p>
              {/* <Handle
                id="handle-message"
                type="target"
                position={Position.Left}
                className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
              />
              <Handle
                id="handle-message"
                type="source"
                position={Position.Right}
                className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
              /> */}
            </div>
          )}

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
                // style={{
                //   right: -10, // Adjust this value as needed
                //   top: "50%",
                //   transform: "translateY(-50%)",
                // }}
              />
            </div>
          )}

          {data.audio && (
            <div className="mb-2 relative">
              <p className="font-bold">Send Audio</p>
              <audio controls>
                <source src={data.audio} type="audio/mpeg" />
              </audio>

              <Handle
                id={`handle-audio}`} // Unique ID for each handle
                type="source"
                position={Position.Right}
                className={`custom-handle ${
                  data.isActive ? "active" : "inactive"
                }`}
              />
            </div>
          )}

          {data.file && (
            <div className="mb-2 relative">
              <p className="font-bold">Send File</p>
              <a
                href={data.file}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Open File
              </a>

              <Handle
                id={`handle-file}`} // Unique ID for each handle
                type="source"
                position={Position.Right}
                className={`custom-handle ${
                  data.isActive ? "active" : "inactive"
                }`}
              />
            </div>
          )}

          {data.link && (
            <div className="py-2">
              <Link
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 w-full items-center justify-center p-1 flex bg-green-500 text-white font-bold  duration-5000"
              >
                Click Me
              </Link>
            </div>
          )}
        </div>
      </div>

      <Handle
        id="a"
        type="target"
        position={Position.Left}
        className="w-1 rounded-full bg-gray-500"
      ></Handle>
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

// "use client";

// import React from "react";
// import { Handle, Position, useReactFlow } from "reactflow";
// import Link from "next/link";
// import { Trash2 } from "lucide-react";
// import Data from "@/app/data/data";

// function TextNode({ data, selected, id }) {
//   const { deleteElements } = useReactFlow();
//   const dataList = Data.data;

//   const preUseID = sessionStorage.getItem("id");
//   const userDataId = preUseID - 1;
//   const userData = dataList?.[userDataId];

//   // Function to replace placeholders with actual values
//   const formatLabel = (label) => {
//     return label.replace(/\{(\s*\w+\s*)\}/g, (match, key) => {
//       const trimmedKey = key.trim();
//       return userData?.[trimmedKey] || match;
//     });
//   };

//   return (
//     <div className={`w-48 shadow-md rounded-md bg-white ${selected ? "border-2 border-indigo-500" : ""}`}>
//       <div className="flex flex-col">
//         {/* Header */}
//         <div className="px-2 py-2 text-left text-black text-xs font-bold rounded-t-md bg-teal-300 flex justify-between items-center">
//           ✉️ Media Node
//           <button
//             onClick={() => deleteElements({ nodes: [{ id }] })}
//             className="text-white hover:text-red-500 transition"
//           >
//             <Trash2 size={16} />
//           </button>
//         </div>

//         <div className="px-3 py-2 text-xs text-black">
//           {/* Send Message */}
//           {data.label && userData && (
//             <div className="py-2 relative">
//               <p className="font-bold my-1">Send Message</p>
//               <p className="border rounded p-2">{formatLabel(data.label)}</p>
//               <Handle
//                 id="handle-message"
//                 type="source"
//                 position={Position.Right}
//                 className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//               />
//             </div>
//           )}

// {/* Send Image */}
// {data.image && (
//   <div className="py-2 relative">
//     <p className="font-bold">Send Image</p>
//     <img src={data.image} alt="Node" className="w-full h-auto rounded-md mt-2" />
//     <Handle
//       id="handle-image"
//       type="source"
//       position={Position.Right}
//       className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//     />
//   </div>
// )}

//           {/* Send Video */}
//           {data.video && (
//             <div className="mb-2 relative">
//               <p className="font-bold">Send Video</p>
//               <video controls className="w-full h-auto rounded border border-blue-300">
//                 <source src={data.video} type="video/mp4" />
//               </video>
//               <Handle
//                 id="handle-video"
//                 type="source"
//                 position={Position.Right}
//                 className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//               />
//             </div>
//           )}

//           {/* Send Audio */}
//           {data.audio && (
//             <div className="mb-2 relative">
//               <p className="font-bold">Send Audio</p>
//               <audio controls>
//                 <source src={data.audio} type="audio/mpeg" />
//               </audio>
//               <Handle
//                 id="handle-audio"
//                 type="source"
//                 position={Position.Right}
//                 className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//               />
//             </div>
//           )}

//           {/* Send File */}
//           {data.file && (
//             <div className="mb-2 relative">
//               <p className="font-bold">Send File</p>
//               <a href={data.file} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">
//                 Open File
//               </a>
//               <Handle
//                 id="handle-file"
//                 type="source"
//                 position={Position.Right}
//                 className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//               />
//             </div>
//           )}

//           {/* External Link */}
//           {data.link && (
//             <div className="py-2 relative">
//               <Link
//                 href={data.link}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="border-2 w-full items-center justify-center p-1 flex bg-green-500 text-white font-bold"
//               >
//                 Click Me
//               </Link>
//               <Handle
//                 id="handle-link"
//                 type="source"
//                 position={Position.Right}
//                 className="w-1 rounded-full bg-gray-500 absolute top-1/2 right-[-5px] transform -translate-y-1/2"
//               />
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Global Handles */}
//       <Handle id="input" type="target" position={Position.Left} className="w-1 rounded-full bg-slate-500" />
//     </div>
//   );
// }

// export default TextNode;
