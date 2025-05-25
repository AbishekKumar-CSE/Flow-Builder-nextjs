"use client";

import { useState } from "react";
import {
  FaWpforms,
  FaUserPlus,
  FaCalendarAlt,
  FaEnvelope,
  FaClipboardCheck,
  FaTag,
  FaTags,
  FaPlay,
  FaShoppingCart,
  FaHandHoldingUsd,
  FaBoxOpen,
  FaSyncAlt,
} from "react-icons/fa";
import { X } from "lucide-react";

const triggers = [
  { label: "Form Submission", icon: FaWpforms },
  { label: "List Entry", icon: FaUserPlus },
  { label: "Enter a Segment", icon: FaClipboardCheck },
  { label: "Date-field", icon: FaCalendarAlt },
  { label: "Email Action", icon: FaEnvelope },
  { label: "Field Update", icon: FaClipboardCheck },
  { label: "Tag Assigned", icon: FaTag },
  { label: "Tag Removed", icon: FaTags },
  { label: "Open Trigger", icon: FaPlay },
  { label: "Abandoned cart", icon: FaShoppingCart },
  { label: "Purchase Follow-up", icon: FaHandHoldingUsd },
  { label: "product specific follow-up", icon: FaBoxOpen },
  { label: "Cyclic Trigger", icon: FaSyncAlt },
];

export default function TriggerSidebar({
  setSelectedElements,
  onTriggerSelect,
  setNodeName,
  nodeName,
}) {
  const [selected, setSelected] = useState(null);

  const handleTriggerClick = (label) => {
    setNodeName(label);
    onTriggerSelect(label); // Notify parent
  };

  const handleCancel = () => {
    setSelectedElements([]);
  };

  return (
    <aside className="border-r max-h-screen overflow-y-auto p-5 text-sm w-80 h-auto shadow-md bg-white text-gray-900">
      <div className="relative flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-blue-900">Trigger</h3>
        <button
          className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600"
          onClick={handleCancel}
        >
          <X className="w-3 h-3" />
        </button>
      </div>

        <h3 className="text-lg text-black">Trigger Selected</h3>


      {/* <div className="grid grid-cols-3 gap-3">
        {triggers.map(({ label, icon: Icon }) => (
          <button
            key={label}
            onClick={() => handleTriggerClick(label)}
            className={`flex flex-col items-center justify-center gap-2 p-3 border rounded-lg text-xs font-medium shadow-sm hover:bg-blue-100 transition ${
              nodeName === label ? "bg-blue-200 border-blue-400" : "bg-white"
            }`}
          >
            <Icon size={24} className="text-blue-600" />
            <span className="text-center">{label}</span>
          </button>
        ))}
      </div> */}
    </aside>
  );
}
