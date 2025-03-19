"use client";

import {
  MessageSquareText,
  Image,
  Settings,
  Database,
  User,
  FileText,
  List,
  ClipboardList,
  Search,
  ChevronDown,
  ChevronRight,
  Phone,
  MailQuestion,
  MessageCircleQuestion,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [isOpen3, setIsOpen3] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const nodes = [
    {
      name: "Text Node",
      type: "questionnode",
      icon: <FileText className="w-4 h-4" />,
    },
    {
      name: "Text Media Node",
      type: "textmedianode",
      icon: <Image className="w-4 h-4" />,
    },
    {
      name: "Ask for Name",
      type: "questionnamenode",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "Media Node",
      type: "textnode",
      icon: <Image className="w-4 h-4" />,
    },
    {
      name: "Advanced Node",
      type: "advancenode",
      icon: <Settings className="w-4 h-4" />,
    },
    {
      name: "List Messages",
      type: "listbuttonnodde",
      icon: <ClipboardList className="w-4 h-4" />,
    },
  ];

  const filteredNodes = nodes.filter((node) =>
    node.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <aside
      className={`border-r max-h-screen overflow-y-auto  p-5 text-sm w-64 h-screen shadow-md flex flex-col justify-between transition-all duration-300 ${
        isDarkMode
          ? "bg-white border-gray-700 text-gray-900"
          : "bg-white border-gray-700 text-gray-900"
      }`}
    >
      <div>
        <h3
          className={`text-xl mb-6 font-bold ${
            isDarkMode ? "text-black" : "text-black"
          }`}
        >
          Node Panel
        </h3>

        <div className="relative mb-4">
          <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search nodes..."
            className="w-full p-2 pl-8 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {searchQuery ? (
          <>
            {filteredNodes.map((node, index) => (
              <div
                key={index}
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData("application/reactflow", node.type)
                }
                draggable
              >
                {node.icon} {node.name}
              </div>
            ))}
          </>
        ) : (
          <>
            {/* Text Nodes */}
            <details className="mb-4">
              <summary 
                className="cursor-pointer font-semibold flex items-center gap-2"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5 " />
                )} Text
                Nodes
              </summary>
              <div
                className="p-2 hover:cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "questionnode"
                  )
                }
                draggable
              >
                <FileText className="w-4 h-4" /> Text Node
              </div>

              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "textmedianode"
                  )
                }
                draggable
              >
                <Image className="w-4 h-4" /> Text Media Node
              </div>
            </details>

            {/* Question Nodes */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold flex items-center gap-2"onClick={() => setIsOpen1(!isOpen1)}
              >
                {isOpen1 ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5 " />
                )}  Question Nodes
              </summary>
              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "questionnamenode"
                  )
                }
                draggable
              >
                <User className="w-4 h-4" /> Ask for Name
              </div>

              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "phonequestionnode"
                  )
                }
                draggable
              >
                <Phone className="w-4 h-4" /> Ask for Phone
              </div>

              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "emailquestionnode"
                  )
                }
                draggable
              >
                <MailQuestion className="w-4 h-4" /> Ask for Email 
              </div>

              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "askquestionnode"
                  )
                }
                draggable
              >
                <MessageCircleQuestion className="w-4 h-4" /> Ask Question  
              </div>
              
            </details>

            {/* Media Nodes */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold flex items-center gap-2"onClick={() => setIsOpen2(!isOpen2)}
              >
                {isOpen2 ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5 " />
                )}  Media Nodes
              </summary>
              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "textnode"
                  )
                }
                draggable
              >
                <Image className="w-4 h-4" /> Media Node
              </div>
            </details>

            {/* Advanced Nodes */}
            <details className="mb-4">
              <summary className="cursor-pointer font-semibold flex items-center gap-2"onClick={() => setIsOpen3(!isOpen3)}
              >
                {isOpen3 ? (
                  <ChevronDown className="w-5 h-5" />
                ) : (
                  <ChevronRight className="w-5 h-5 " />
                )}  Advanced Nodes
              </summary>
              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "advancenode"
                  )
                }
                draggable
              >
                <Settings className="w-4 h-4" /> Advanced Node
              </div>

              <div
                className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                onDragStart={(event) =>
                  event.dataTransfer.setData(
                    "application/reactflow",
                    "listbuttonnodde"
                  )
                }
                draggable
              >
                <ClipboardList className="w-4 h-4" /> List Messages
              </div>
              
            </details>
          </>
        )}

      </div>

      {/* Raw Data Button */}
      <div
        className="p-3 border rounded-lg cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition-all duration-200 gap-2 shadow-lg"
        onClick={() => window.open("/chatBot", "_blank")}
      >
        <Database className="w-5 h-5" />
        <p>Raw Data</p>
      </div>
    </aside>
  );
}

// <details className="mb-4">
//           <summary className="cursor-pointer font-semibold flex items-center gap-2">
//             <MessageSquareText className="w-5 h-5 text-blue-700" /> Text Nodes
//           </summary>
//           <div
//             className="p-2 hover:cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "questionnode")
//             }
//             draggable
//           >
//             <FileText className="w-4 h-4" /> Text Node
//           </div>

//           <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "textmedianode")
//             }
//             draggable
//           >
//             <Image className="w-4 h-4" /> Text Media Node
//           </div>
//         </details>

//         {/* Question Nodes */}
//         <details className="mb-4">
//           <summary className="cursor-pointer font-semibold flex items-center gap-2">
//             <User className="w-5 h-5 text-green-700" /> Question Nodes
//           </summary>
//           <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-green-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "questionnamenode")
//             }
//             draggable
//           >
//             <User className="w-4 h-4" /> Ask for Name
//           </div>
//         </details>

//         {/* Media Nodes */}
//         <details className="mb-4">
//           <summary className="cursor-pointer font-semibold flex items-center gap-2">
//             <Image className="w-5 h-5 text-yellow-700" /> Media Nodes
//           </summary>
//           <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-yellow-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "textnode")
//             }
//             draggable
//           >
//             <Image className="w-4 h-4" /> Media Node
//           </div>
//         </details>

//         {/* Advanced Nodes */}
//         <details className="mb-4">
//           <summary className="cursor-pointer font-semibold flex items-center gap-2">
//             <Settings className="w-5 h-5 text-purple-700" /> Advanced Nodes
//           </summary>
//           <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-purple-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "advancenode")
//             }
//             draggable
//           >
//             <Settings className="w-4 h-4" /> Advanced Node
//           </div>

//           <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-purple-600 hover:text-white rounded-lg ms-3"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "listbuttonnodde")
//             }
//             draggable
//           >
//             <ClipboardList className="w-4 h-4" /> List Messages
//           </div>

//           {/* <div
//             className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-purple-600 hover:text-white rounded-lg border mt-2"
//             onDragStart={(event) =>
//               event.dataTransfer.setData("application/reactflow", "listbuttonnodde")
//             }
//             draggable
//           >
//             <List className="w-4 h-4" /> List Button
//           </div> */}
//         </details>
