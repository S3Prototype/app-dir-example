import { NextResponse } from "next/server";

export const runtime = "edge";

// export async function GET(request: Request) {
//   const cacheControlHeaders = new Headers(request.headers);
//   cacheControlHeaders.set("Vercel-CDN-Cache-Control", "public, s-maxage=3600");
//   cacheControlHeaders.set("CDN-Cache-Control", "public, s-maxage=60");
//   cacheControlHeaders.set("Cache-Control", "public, max-age=1");
//   return NextResponse.json(
//     { name: "John Doe" },
//     {
//       status: 200,
//       headers: cacheControlHeaders,
//     }
//   );
// }

export async function GET(request: Request) {
  return new Response("Cache Control example", {
    status: 200,
    headers: {
      "Cache-Control": "public, s-maxage=1",
      "CDN-Cache-Control": "public, s-maxage=60",
      "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
    },
  });
}
