// "use client";

import {
  MessageSquareText,
  title,
  setTitle,
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
  const [botData, setBotData] = useState(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const nodes = [
    {
      name: "Text Node",
      type: "questionnode",
      icon: <FileText className="w-4 h-4" alt="icon" />,
    },
    {
      name: "Text Media Node",
      type: "textmedianode",
      icon: <Image className="w-4 h-4" alt="icon" />,
    },
    {
      name: "Ask for Name",
      type: "questionnamenode",
      icon: <User className="w-4 h-4" />,
    },
    {
      name: "Media Node",
      type: "textnode",
      icon: <Image className="w-4 h-4" alt="icon" />,
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

  useEffect(() => {
    setBotData(localStorage.getItem("flow-key"));
  });

  const downloadRawData = () => {
    const isString = typeof botData === "string";
    const jsonString = isString
      ? JSON.stringify(JSON.parse(botData), null, 2) // pretty-print parsed string
      : JSON.stringify(botData, null, 2); // pretty-print object

    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "CartFlowData.json";
    a.click();

    URL.revokeObjectURL(url);
  };

  //   function downloadRawData() {
  //   const file = new Blob([JSON.stringify(botData, null, 2)], {
  //     type: "text/plain"
  //   });
  //   const element = document.createElement("a");
  //   element.href = URL.createObjectURL(file);
  //   element.download = "botData.txt";
  //   document.body.appendChild(element); // Required for Firefox
  //   element.click();
  //   document.body.removeChild(element);
  // }

  return (
    <aside
      className={`border-r max-h-screen overflow-y-auto  p-5 text-sm w-64 h-screen shadow-md flex flex-col justify-between transition-all duration-300 ${
        isDarkMode
          ? "bg-white border-gray-700 text-gray-900"
          : "bg-white border-gray-700 text-gray-900"
      }`}
    >
      {isClient && (
        <div>
          <h3
            className={`text-xl mb-6 font-bold ${
              isDarkMode ? "text-black" : "text-black"
            }`}
          >
            Flow Builder
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
                    event.dataTransfer.setData(
                      "application/reactflow",
                      node.type
                    )
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
                  )}{" "}
                  Template Nodes
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
                  <FileText className="w-4 h-4" /> Template Node
                </div>
              </details>

              {/* Trigger Nodes */}
              <details className="mb-4">
                <summary
                  className="cursor-pointer font-semibold flex items-center gap-2"
                  onClick={() => setIsOpen2(!isOpen2)}
                >
                  {isOpen2 ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5 " />
                  )}{" "}
                  Trigger Nodes
                </summary>
                <div
                  className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                  onDragStart={(event) =>
                    event.dataTransfer.setData(
                      "application/reactflow",
                      "triggernode"
                    )
                  }
                  draggable
                >
                  <Image className="w-4 h-4" alt="icon" /> Trigger Node
                </div>
              </details>

              {/* Time Nodes */}
              <details className="mb-4">
                <summary
                  className="cursor-pointer font-semibold flex items-center gap-2"
                  onClick={() => setIsOpen2(!isOpen2)}
                >
                  {isOpen2 ? (
                    <ChevronDown className="w-5 h-5" />
                  ) : (
                    <ChevronRight className="w-5 h-5 " />
                  )}{" "}
                  Delay Nodes
                </summary>
                <div
                  className="p-2 cursor-grab flex items-center gap-2 transition-all duration-200 hover:bg-[#f0ecec] hover:text-black rounded-lg ms-3"
                  onDragStart={(event) =>
                    event.dataTransfer.setData(
                      "application/reactflow",
                      "timenode"
                    )
                  }
                  draggable
                >
                  <Image className="w-4 h-4" alt="icon" /> Time Node
                </div>
              </details>
            </>
          )}
        </div>
      )}
      <div
        className="p-3 border rounded-lg cursor-pointer flex justify-center items-center hover:bg-red-500 hover:text-white transition-all duration-200 gap-2 shadow-lg"
        onClick={downloadRawData}
      >
        <Database className="w-5 h-5" />
        <p>Raw Data</p>
      </div>
    </aside>
  );
}
