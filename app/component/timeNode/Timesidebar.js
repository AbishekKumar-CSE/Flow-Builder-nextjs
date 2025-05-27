"use client";

import { useEffect } from "react";
import { X, Edit } from "lucide-react";
import Swal from 'sweetalert2';

export default function TimeSidebar({
  waitTime,
  setWaitTime,
  waitUnit,
  setWaitUnit,
  resumeOption,
  setResumeOption,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  days,
  setDays,
  selectedNode,
  setSelectedElements,
  setNodes,
}) {
  useEffect(() => {
    if (selectedNode?.data) {
      const data = selectedNode.data;
      setWaitTime(data.waitTime ?? 2);
      setWaitUnit(data.waitUnit ?? "Hours");
      setResumeOption(data.resumeOption ?? "immediately");
      setStartTime(data.startTime ?? "09:00");
      setEndTime(data.endTime ?? "17:00");

      if (data.selectedDays) {
        const dayState = {
          SUN: false,
          MON: false,
          TUE: false,
          WED: false,
          THU: false,
          FRI: false,
          SAT: false,
        };
        data.selectedDays.forEach((d) => (dayState[d] = true));
        setDays(dayState);
      } else {
        // Reset if no selectedDays found
        setDays({
          SUN: false,
          MON: false,
          TUE: false,
          WED: false,
          THU: false,
          FRI: false,
          SAT: false,
        });
      }
    }
  }, [
    selectedNode,
    setWaitTime,
    setWaitUnit,
    setResumeOption,
    setStartTime,
    setEndTime,
    setDays,
  ]);

  const toggleDay = (day) => {
    setDays((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSave = () => {
    const selectedDays = Object.keys(days).filter((d) => days[d]);
  setTimeout(() => {
  Swal.fire({
    icon: 'success',
    title: 'Saved!',
    text: 'Saved settings successfully!',
    timer: 2000,
    showConfirmButton: false
  });
}, 500);

    const updatePayload = {
      waitTime,
      waitUnit,
      resumeOption,
      startTime,
      endTime,
      selectedDays,
    };

    setSelectedElements((prevSelected) => {
      const updated = prevSelected.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...updatePayload } }
          : node
      );
      return updated;
    });

    setNodes((nds) =>
      nds.map((node) =>
        node.id === selectedNode.id
          ? { ...node, data: { ...node.data, ...updatePayload } }
          : node
      )
    );
  };

  const handleCancel = () => {
    setSelectedElements([]);
  };

  return selectedNode ? (
    <aside className="border-r max-h-screen overflow-y-auto p-5 text-sm w-80 h-auto shadow-md transition-all duration-300 flex flex-col bg-white text-gray-900">
      <div className="relative flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold flex items-center gap-2 pr-8 text-blue-900">
          <Edit className="w-5 h-5" /> Time Node
        </h3>
        <button
          className="absolute right-0 top-1 p-2 rounded-full text-white bg-red-500 hover:bg-red-600"
          onClick={handleCancel}
        >
          <X className="w-3 h-3" />
        </button>
      </div>

      {/* Wait Time */}
      <div className="mb-4">
        <label className="block font-medium text-gray-700">Wait time</label>
        <div className="flex gap-2 mt-1">
          <input
            type="number"
            value={waitTime}
            onChange={(e) => setWaitTime(Number(e.target.value))}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <select
            value={waitUnit}
            onChange={(e) => setWaitUnit(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          >
            <option value="Minutes">Minute(s)</option>
            <option value="Hours">Hour(s)</option>
            <option value="Days">Day(s)</option>
          </select>
        </div>
      </div>

      {/* Resume Workflow Option */}
      <div className="mb-4">
        <label className="block font-bold text-gray-700 mb-1">
          When to resume workflow
        </label>
        <div className="flex flex-col gap-2">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="resume"
              value="immediately"
              checked={resumeOption === "immediately"}
              onChange={() => setResumeOption("immediately")}
            />
            Immediately after the above wait duration
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="resume"
              value="between"
              checked={resumeOption === "between"}
              onChange={() => setResumeOption("between")}
            />
            Between
          </label>
          {resumeOption === "between" && (
            <div className="flex gap-2">
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-1/2 p-2 border border-gray-300 rounded-md"
              />
            </div>
          )}
        </div>
      </div>

      {/* Days Selection */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-1 font-bold py-2">
          When to perform this action
        </label>
        <div className="flex flex-wrap gap-1">
          {Object.keys(days).map((day) => (
            <label
              key={day}
              className={`text-[10px] px-2 py-1 border rounded-md cursor-pointer ${
                days[day]
                  ? "bg-orange-500 text-white"
                  : "bg-white border-gray-300 text-gray-700"
              }`}
              onClick={() => toggleDay(day)}
            >
              {day}
            </label>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex justify-end gap-2">
        {/* <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
          onClick={handleCancel}
        >
          Cancel
        </button> */}
        <button
          className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600"
          onClick={handleSave}
        >
          Save
        </button>
      </div>
    </aside>
  ) : null;
}
