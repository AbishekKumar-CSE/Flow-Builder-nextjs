import { setMessage } from "@/lib/dataStore";

export async function POST(request) {
  try {
    const body = await request.json();
    //console.log("Received message:", body.message);

    setMessage(body.message); // Store only the message string/number

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        // "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Origin": "https://front.salegrowy.com",
        // "Access-Control-Allow-Origin": "https://main.dva7k32nx0bm.amplifyapp.com",
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error in POST /api/receive:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      // "Access-Control-Allow-Origin": "http://localhost:3000",
      "Access-Control-Allow-Origin": "https://front.salegrowy.com",
      // "Access-Control-Allow-Origin": "https://main.dva7k32nx0bm.amplifyapp.com",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}

// // app/api/receive/route.js
// import { setMessage } from "@/lib/dataStore";

// export async function POST(request) {
//   try {
//     const body = await request.json();
//     //console.log("Received message:", body.message);

//     setMessage(body); // Store message

//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: {
//         "Access-Control-Allow-Origin": "https://front.salegrowy.com",
//         "Content-Type": "application/json",
//       },
//     });
//   } catch (error) {
//     console.error("Error parsing request:", error);
//     return new Response(JSON.stringify({ success: false }), {
//       status: 500,
//     });
//   }
// }

// export async function OPTIONS() {
//   return new Response(null, {
//     status: 200,
//     headers: {
//       "Access-Control-Allow-Origin": "http://localhost:3000",
//       // "Access-Control-Allow-Origin": "https://front.salegrowy.com",
//       "Access-Control-Allow-Methods": "POST, OPTIONS",
//       "Access-Control-Allow-Headers": "Content-Type",
//     },
//   });
// }
