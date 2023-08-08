const BuiltTime = require("built-time.ts");
export async function GET(request: Request) {
  return new Response(
    `This Serverless Function was built at ${new Date(BuiltTime)}.`,
    {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    }
  );
}
