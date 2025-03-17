"use client";

import React, { useEffect, useState } from "react";

export default function Chatbot() {
  const [botData, setBotData] = useState([]);

  useEffect(() => {
    const preflowData = JSON.parse(localStorage.getItem("flow-key")) || { nodes: [] };
    setBotData(preflowData.nodes);
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-2xl font-bold mb-4">Bot Data</h1>
      <pre className="bg-gray-100 p-4 rounded-lg shadow-md overflow-x-auto text-black">
        {botData.map((data, index) => (
          <React.Fragment key={index}>
            {JSON.stringify(data.type, null, 2)}
            <br />
            {JSON.stringify(data.data, null, 2)}
            <br />
          </React.Fragment>
        ))}
      </pre>
    </div>
  );
}
