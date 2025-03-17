"use client";

import {
  MessageSquareText,
  Image,
  Settings,
  Database,
  User,
  FileText,
  List,
} from "lucide-react";
import { useState, useEffect } from "react";

export default function Sidebar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setIsDarkMode(true);
    }
  }, []);

  return (
    <aside
      className={`border-r p-5 text-sm w-64 h-screen shadow-md flex flex-col justify-between transition-all duration-300 ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-gray-900 border-gray-700 text-white"
      }`}
    >
      <div>
        <h3
          className={`text-xl mb-6 font-bold ${
            isDarkMode ? "text-white" : "text-blue-900"
          }`}
        >
          Node Panel
        </h3>

        {/* Text Nodes */}
        <details className="mb-4">
          <summary className="cursor-pointer font-semibold flex items-center gap-2">
            <MessageSquareText className="w-5 h-5 text-blue-700" /> Text Nodes
          </summary>
          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "questionnode")
            }
            draggable
          >
            <FileText className="w-4 h-4" /> Text Node
          </div>

          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-blue-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "textmedianode")
            }
            draggable
          >
            <Image className="w-4 h-4" /> Text Media Node
          </div>
        </details>

        {/* Question Nodes */}
        <details className="mb-4">
          <summary className="cursor-pointer font-semibold flex items-center gap-2">
            <User className="w-5 h-5 text-green-700" /> Question Nodes
          </summary>
          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-green-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "questionnamenode")
            }
            draggable
          >
            <User className="w-4 h-4" /> Ask for Name
          </div>
        </details>

        {/* Media Nodes */}
        <details className="mb-4">
          <summary className="cursor-pointer font-semibold flex items-center gap-2">
            <Image className="w-5 h-5 text-yellow-700" /> Media Nodes
          </summary>
          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-yellow-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "textnode")
            }
            draggable
          >
            <Image className="w-4 h-4" /> Media Node
          </div>
        </details>

        {/* Advanced Nodes */}
        <details className="mb-4">
          <summary className="cursor-pointer font-semibold flex items-center gap-2">
            <Settings className="w-5 h-5 text-purple-700" /> Advanced Nodes
          </summary>
          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-purple-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "advancenode")
            }
            draggable
          >
            <Settings className="w-4 h-4" /> Advanced Node
          </div>

          <div
            className="p-2 cursor-move flex items-center gap-2 transition-all duration-200 hover:bg-purple-600 hover:text-white rounded-lg border mt-2"
            onDragStart={(event) =>
              event.dataTransfer.setData("application/reactflow", "listbuttonnodde")
            }
            draggable
          >
            <List className="w-4 h-4" /> List Button
          </div>
        </details>
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
