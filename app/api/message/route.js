// app/api/message/route.js
import { getMessage } from "@/lib/dataStore";

export async function GET() {
  const message = getMessage();

  return new Response(JSON.stringify({ message }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  });
}
