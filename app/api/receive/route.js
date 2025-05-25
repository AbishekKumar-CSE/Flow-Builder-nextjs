// app/api/receive/route.js
import { setMessage } from "@/lib/dataStore";

export async function POST(request) {
  try {
    const body = await request.json();
    console.log("Received message from port 3000:", body.message);

    setMessage(body); // Store message

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error parsing request:", error);
    return new Response(JSON.stringify({ success: false }), {
      status: 500,
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
