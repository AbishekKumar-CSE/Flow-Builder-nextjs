"use client";

export default function Sidebar() {
  return (
    <aside className="border-r-2 border-blue-200 p-4 text-sm bg-blue-100 w-64 h-screen text-black">
      <h3 className="text-xl mb-4 text-blue-900">Node Panel</h3>

      <details className="border border-gray-300 rounded-md p-2 w-52">
      <summary className="cursor-pointer font-medium text-gray-700 hover:text-gray-900">
        Select Node
      </summary>
      <div className="mt-2 space-y-2">
      <div
        className="bg-white shadow-black p-3 border-2 border-blue-500 rounded cursor-move flex justify-center items-center text-blue-500 hover:bg-blue-500 hover:text-white transition-colors duration-200"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "questionnode")
        }
        draggable
      >
        Text Node
      </div>
      <div
        className="bg-white shadow-black my-3 p-3 border-2 border-green-500 rounded cursor-move flex justify-center items-center text-green-500 hover:bg-green-500 hover:text-white transition-colors duration-200"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "textnode")
        }
        draggable
      >
        Media Node
      </div>
      <div
        className="bg-white shadow-black p-3 border-2 border-black rounded cursor-move flex justify-center items-center text-black hover:bg-black hover:text-white transition-colors duration-200"
        onDragStart={(event) =>
          event.dataTransfer.setData("application/reactflow", "advancenode")
        }
        draggable
      >
        Advance Node
      </div>
      </div>
      </details>

      <div
        className="absolute bottom-10 bg-white shadow-red-500 p-3 border-2 border-black rounded cursor-pointer flex justify-center items-center text-black hover:bg-red-500 hover:text-white hover:border-white transition-colors duration-200"
        onClick={() => window.open("/chatBot", "_blank")}
      >
        <p>Raw Data</p>
      </div>
    </aside>
  );
}
