export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");
  return new Response(`Hello, ${name}`, {
    status: 200,
  });
}
