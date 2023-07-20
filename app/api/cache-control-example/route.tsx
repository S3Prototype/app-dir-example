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
