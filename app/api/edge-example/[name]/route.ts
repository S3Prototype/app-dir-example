export function GET(request: Request) {
  return new Response(`Hello, ${request.url.search}`, {
    status: 200,
  });
}

export const runtime = "edge"; // 'nodejs' is the default
